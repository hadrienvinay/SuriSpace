import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import jobSites from '@/lib/jobSites';

type JobPosting = {
  id: string;
  title: string;
  company: string;
  location: string;
  link?: string;
  source: string;
  sourceUrl?: string;
  date?: string;
  description?: string;
  salary?: string;
};

let cache: { data: JobPosting[] | null; timestamp: number } = { data: null, timestamp: 0 };
const CACHE_DURATION = 3600000; // 1 hour

function getRealisticHeaders(referer?: string) {
  return {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
    'Accept-Encoding': 'gzip, deflate, br',
    'DNT': '1',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Cache-Control': 'max-age=0',
    ...(referer && { 'Referer': referer }),
  };
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchHtml(url: string, retryCount = 0): Promise<string> {
  const MAX_RETRIES = 2;
  try {
    if (retryCount > 0) await delay(2000 * retryCount);

    const res = await fetch(url, {
      headers: getRealisticHeaders(url),
      signal: AbortSignal.timeout(15000),
    });

    console.log(`[Fetch] ${url} → ${res.status}`);

    if (res.status === 403 && retryCount < MAX_RETRIES) {
      console.warn(`[Fetch] 403 on ${url}, retrying...`);
      await delay(2000);
      return fetchHtml(url, retryCount + 1);
    }

    if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    return await res.text();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[Fetch] Failed for ${url}:`, message);
    throw err;
  }
}

function extractJsonLdJobPostings(html: string, source: string, sourceUrl: string): JobPosting[] {
  const results: JobPosting[] = [];
  const scriptRegex = /<script[^>]*type=(?:"|')application\/ld\+json(?:"|')[^>]*>([\s\S]*?)<\/script>/gi;
  let match;

  while ((match = scriptRegex.exec(html)) !== null) {
    try {
      const data = JSON.parse(match[1]);
      const entries = Array.isArray(data) ? data : [data];

      for (const entry of entries) {
        if (!entry) continue;

        const graphItems = entry['@graph'] && Array.isArray(entry['@graph']) ? entry['@graph'] : [entry];

        for (const item of graphItems) {
          if (item['@type'] !== 'JobPosting') continue;

          const posting: JobPosting = {
            id: `${source}-${item.url || Math.random()}`,
            title: item.title || item.name || 'Untitled',
            company: item.hiringOrganization?.name || item.hiringOrganization || 'Unknown',
            location: item.jobLocation?.address?.addressLocality || item.jobLocation?.name || 'Remote',
            link: item.url,
            source,
            sourceUrl,
            date: item.datePosted,
            description: item.description,
            salary: item.baseSalary?.currency && item.baseSalary?.value ? `${item.baseSalary.value.minValue}-${item.baseSalary.value.maxValue} ${item.baseSalary.currency}` : undefined,
          };

          if (posting.title && posting.title !== 'Untitled') {
            results.push(posting);
          }
        }
      }
    } catch (err) {
      // silently ignore JSON parse errors
    }
  }

  return results;
}

function parseWithSelectors(html: string, site: any, source: string, sourceUrl: string): JobPosting[] {
  const $ = cheerio.load(html);
  const results: JobPosting[] = [];

  if (!site.listSelector) return results;

  $(site.listSelector).each((idx, el) => {
    try {
      const node = $(el);
      const title = site.titleSelector ? node.find(site.titleSelector).text().trim() : node.text().trim();
      const linkEl = site.linkSelector ? node.find(site.linkSelector).first() : node.find('a').first();
      const link = linkEl?.attr('href');
      const company = site.companySelector ? node.find(site.companySelector).text().trim() : 'Unknown';
      const location = site.locationSelector ? node.find(site.locationSelector).text().trim() : 'Unknown';

      if (!title) return;

      const posting: JobPosting = {
        id: `${source}-${idx}`,
        title,
        company,
        location,
        link: link && link.startsWith('http') ? link : undefined,
        source,
        sourceUrl,
      };

      results.push(posting);
    } catch (err) {
      console.error('Parse error for item:', err);
    }
  });

  return results;
}

async function scrapeAllSites(): Promise<JobPosting[]> {
  const allResults: JobPosting[] = [];

  for (const site of jobSites) {
    try {
      const html = await fetchHtml(site.url);

      // Try JSON-LD first
      let results = extractJsonLdJobPostings(html, site.name, site.url);

      // Fallback to CSS selectors if no JSON-LD found
      if (results.length === 0) {
        results = parseWithSelectors(html, site, site.name, site.url);
      }

      allResults.push(...results);
    } catch (err) {
      console.error(`Error scraping ${site.name}:`, err);
    }
  }

  return allResults;
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const q = (url.searchParams.get('q') || '').toLowerCase();
    const skipCache = url.searchParams.get('skipCache') === 'true';

    // Check cache
    const now = Date.now();
    if (cache.data && !skipCache && now - cache.timestamp < CACHE_DURATION) {
      console.log('[Jobs] Serving from cache');
      const filtered = q
        ? cache.data.filter(
            (job) =>
              job.title.toLowerCase().includes(q) ||
              job.company.toLowerCase().includes(q) ||
              job.location.toLowerCase().includes(q)
          )
        : cache.data;
      return NextResponse.json(filtered, { status: 200 });
    }

    // Scrape fresh data
    console.log('[Jobs] Scraping fresh data...');
    const results = await scrapeAllSites();

    // Cache results
    cache = {
      data: results,
      timestamp: now,
    };

    // Filter by query
    const filtered = q
      ? results.filter(
          (job) =>
            job.title.toLowerCase().includes(q) ||
            job.company.toLowerCase().includes(q) ||
            job.location.toLowerCase().includes(q)
        )
      : results;

    return NextResponse.json(filtered, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[Jobs API] Error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
