// app/feed.xml/route.ts — RSS 2.0 feed for all articles
import { NextResponse } from 'next/server';

const BASE    = 'https://suri-space.vercel.app';
const SITE    = 'Suri Space — Hadrien Vinay';
const TAGLINE = "Articles sur l'espace, les sciences, la physique et la culture.";

// Static posts (hardcoded metadata since they have no DB record)
const STATIC = [
  { id: 'astro',       title: 'Le ciel en 2026',          desc: "Éclipses, comètes, étoiles filantes et rendez-vous planétaires : le calendrier astronomique complet de 2026.", date: '2026-03-09', tag: 'Astronomie' },
  { id: 'space',       title: "L'actualité spatiale 2026", desc: "Un panorama des dernières nouvelles et missions prévues pour le spatial en 2026.", date: '2026-01-15', tag: 'Espace' },
  { id: 'negative',    title: 'La masse négative',         desc: "L'hypothèse de la masse négative, candidate sérieuse pour expliquer la structure de l'univers.", date: '2026-02-01', tag: 'Physique' },
  { id: 'hydrogene',   title: "L'hydrogène vert marin",   desc: "Produire de l'hydrogène grâce aux courants marins et à la houle : le potentiel des océans pour la transition énergétique.", date: '2026-01-20', tag: 'Énergie' },
  { id: 'algoculture', title: "L'algoculture",             desc: "La culture des algues : vieille de plusieurs siècles, elle connaît aujourd'hui une croissance rapide à l'échelle mondiale.", date: '2025-11-10', tag: 'Environnement' },
];

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function item(title: string, link: string, desc: string, date: string, category?: string): string {
  return `
    <item>
      <title>${esc(title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${esc(desc)}</description>
      <pubDate>${new Date(date).toUTCString()}</pubDate>
      ${category ? `<category>${esc(category)}</category>` : ''}
    </item>`;
}

export async function GET() {
  const staticItems = STATIC.map(s =>
    item(s.title, `${BASE}/posts/${s.id}`, s.desc, s.date, s.tag)
  );

  const allItems = staticItems.join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE)}</title>
    <link>${BASE}</link>
    <description>${esc(TAGLINE)}</description>
    <language>fr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${BASE}/blog.png</url>
      <title>${esc(SITE)}</title>
      <link>${BASE}</link>
    </image>${allItems}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
