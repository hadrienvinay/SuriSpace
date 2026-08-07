import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';
import { missions, solarSystem } from '@/data/space';
import { scientists } from '@/data/scientists';
import { stars } from '@/data/stars';

const BASE = 'https://suri-space.vercel.app';
const monthly = 'monthly' as const;
const yearly  = 'yearly'  as const;
const weekly  = 'weekly'  as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  /* ── Static routes ─────────────────────────────────────── */
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                                  lastModified: new Date(), changeFrequency: weekly,  priority: 1   },
    { url: `${BASE}/about`,                       changeFrequency: yearly,  priority: 0.7 },
    { url: `${BASE}/contact`,                     changeFrequency: yearly,  priority: 0.4 },
    { url: `${BASE}/posts`,                       changeFrequency: weekly,  priority: 0.9 },
    { url: `${BASE}/projects`,                    changeFrequency: monthly, priority: 0.8 },
    { url: `${BASE}/metals`,                      changeFrequency: monthly, priority: 0.5 },
    { url: `${BASE}/echelles`,                    changeFrequency: yearly,  priority: 0.7 },

    // Sciences
    { url: `${BASE}/sciences`,                    changeFrequency: monthly, priority: 0.8 },
    { url: `${BASE}/sciences/timeline`,           changeFrequency: monthly, priority: 0.6 },
    { url: `${BASE}/sciences/formules`,           changeFrequency: monthly, priority: 0.6 },
    { url: `${BASE}/sciences/constantes`,         changeFrequency: monthly, priority: 0.6 },
    { url: `${BASE}/sciences/scientists`,         changeFrequency: monthly, priority: 0.7 },
    { url: `${BASE}/sciences/histoire`,           changeFrequency: monthly, priority: 0.7 },

    // Atoms
    { url: `${BASE}/atoms`,                       changeFrequency: monthly, priority: 0.8 },
    { url: `${BASE}/atoms/tableau`,               changeFrequency: monthly, priority: 0.7 },
    { url: `${BASE}/atoms/histoire`,              changeFrequency: monthly, priority: 0.6 },
    { url: `${BASE}/atoms/abondance`,             changeFrequency: monthly, priority: 0.6 },
    { url: `${BASE}/atoms/nucleosynthese`,        changeFrequency: monthly, priority: 0.6 },
    { url: `${BASE}/atoms/particules`,            changeFrequency: monthly, priority: 0.6 },

    // Solar system
    { url: `${BASE}/space`,                changeFrequency: monthly, priority: 0.8 },
    { url: `${BASE}/space/carte`,          changeFrequency: monthly, priority: 0.7 },
    { url: `${BASE}/space/bodys`,          changeFrequency: monthly, priority: 0.7 },
    { url: `${BASE}/space/missions`,       changeFrequency: monthly, priority: 0.7 },
    { url: `${BASE}/space/galaxies`,       changeFrequency: monthly, priority: 0.7 },
    { url: `${BASE}/space/stars`,          changeFrequency: monthly, priority: 0.7 },
    { url: `${BASE}/space/stars/constellations`, changeFrequency: monthly, priority: 0.6 },
    { url: `${BASE}/space/stars/star`,     changeFrequency: monthly, priority: 0.6 },
    { url: `${BASE}/space/astronomie`,     changeFrequency: monthly, priority: 0.7 },
    { url: `${BASE}/space/exoplanetes`,   changeFrequency: monthly, priority: 0.7 },
    { url: `${BASE}/space/astronomie/messier`,    changeFrequency: monthly, priority: 0.6 },
    { url: `${BASE}/space/astronomie/instruments`,changeFrequency: monthly, priority: 0.6 },
    { url: `${BASE}/space/astronomie/ciel`,       changeFrequency: monthly, priority: 0.6 },

    // Biologie
    { url: `${BASE}/biologie`,          changeFrequency: monthly, priority: 0.8 },
    { url: `${BASE}/biologie/corps`,    changeFrequency: monthly, priority: 0.7 },
    { url: `${BASE}/biologie/cellules`, changeFrequency: monthly, priority: 0.7 },
    { url: `${BASE}/biologie/vivant`,      changeFrequency: monthly, priority: 0.7 },
    { url: `${BASE}/biologie/evolution`,   changeFrequency: monthly, priority: 0.7 },
    { url: `${BASE}/biologie/metabolisme`, changeFrequency: monthly, priority: 0.7 },
    { url: `${BASE}/biologie/genetique`,   changeFrequency: monthly, priority: 0.7 },
    { url: `${BASE}/biologie/sante`,       changeFrequency: monthly, priority: 0.7 },
    { url: `${BASE}/biologie/ecologie`,    changeFrequency: monthly, priority: 0.7 },

    // Nature
    { url: `${BASE}/nature`,                      changeFrequency: monthly, priority: 0.7 },
    { url: `${BASE}/nature/plantes`,              changeFrequency: monthly, priority: 0.6 },
    { url: `${BASE}/nature/nutrition`,            changeFrequency: monthly, priority: 0.6 },
    { url: `${BASE}/nature/saison`,               changeFrequency: monthly, priority: 0.6 },
    { url: `${BASE}/nature/mon-potager`,          changeFrequency: monthly, priority: 0.5 },
    { url: `${BASE}/nature/mon-potager/ce-mois`,  changeFrequency: monthly, priority: 0.5 },

    // Static articles
    { url: `${BASE}/posts/astro`,                 changeFrequency: monthly, priority: 0.7 },
    { url: `${BASE}/posts/hydrogene`,             changeFrequency: monthly, priority: 0.7 },
    { url: `${BASE}/posts/space`,                 changeFrequency: monthly, priority: 0.7 },
    { url: `${BASE}/posts/algoculture`,           changeFrequency: monthly, priority: 0.7 },
    { url: `${BASE}/posts/negative`,              changeFrequency: monthly, priority: 0.7 },
    { url: `${BASE}/posts/earth`,                 changeFrequency: monthly, priority: 0.7 },
  ];

  /* ── Dynamic routes from static data files ─────────────── */
  const missionRoutes: MetadataRoute.Sitemap = missions.map(m => ({
    url: `${BASE}/space/missions/${m.id}`,
    changeFrequency: monthly,
    priority: 0.5,
  }));

  const bodyRoutes: MetadataRoute.Sitemap = solarSystem
    .filter(b => ['planet','star','dwarf-planet','moon'].includes(b.type))
    .map(b => ({
      url: `${BASE}/space/bodys/${b.id}`,
      changeFrequency: monthly,
      priority: 0.5,
    }));

  const scientistRoutes: MetadataRoute.Sitemap = scientists.map(s => ({
    url: `${BASE}/sciences/scientists/${s.id}`,
    changeFrequency: monthly,
    priority: 0.5,
  }));

  const starRoutes: MetadataRoute.Sitemap = stars.map(s => ({
    url: `${BASE}/space/stars/star/${s.id}`,
    changeFrequency: monthly,
    priority: 0.4,
  }));

  /* ── Dynamic routes from DB ────────────────────────────── */
  const projects = await prisma.project.findMany({ select: { id: true, updatedAt: true } });

  const projectRoutes: MetadataRoute.Sitemap = projects.map(p => ({
    url: `${BASE}/projects/${p.id}`,
    lastModified: p.updatedAt,
    changeFrequency: monthly,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...missionRoutes,
    ...bodyRoutes,
    ...scientistRoutes,
    ...starRoutes,
    ...projectRoutes,
  ];
}
