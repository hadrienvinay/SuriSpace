import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

const BASE_URL = 'https://suri-space.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/projects`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/contact`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE_URL}/posts`, changeFrequency: 'weekly', priority: 0.9 },
    // Sciences
    { url: `${BASE_URL}/sciences`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/sciences/timeline`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/sciences/formules`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/sciences/constantes`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/sciences/scientists`, changeFrequency: 'monthly', priority: 0.6 },
    // Atoms
    { url: `${BASE_URL}/atoms`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/atoms/tableau`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/atoms/histoire`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/atoms/abondance`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/atoms/nucleosynthese`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/atoms/particules`, changeFrequency: 'monthly', priority: 0.6 },
    // Solar system
    { url: `${BASE_URL}/solar-system`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/solar-system/carte`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/solar-system/bodys`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/solar-system/missions`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/solar-system/stars`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/solar-system/stars/constellations`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/solar-system/stars/star`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/solar-system/galaxies`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/solar-system/astronomie`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/solar-system/astronomie/messier`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/solar-system/astronomie/instruments`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/solar-system/astronomie/ciel`, changeFrequency: 'monthly', priority: 0.6 },
    // Nature
    { url: `${BASE_URL}/nature`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/nature/saison`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/nature/mon-potager`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/nature/mon-potager/ce-mois`, changeFrequency: 'monthly', priority: 0.6 },
    // Static posts
    { url: `${BASE_URL}/posts/astro`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/posts/hydrogene`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/posts/space`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/posts/algoculture`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/posts/negative`, changeFrequency: 'monthly', priority: 0.7 },
    // Metals
    { url: `${BASE_URL}/metals`, changeFrequency: 'monthly', priority: 0.6 },
  ];

  // Dynamic posts from DB
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { id: true, updatedAt: true },
  });

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/posts/${post.id}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Dynamic projects from DB
  const projects = await prisma.project.findMany({
    select: { id: true, updatedAt: true },
  });

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${BASE_URL}/projects/${project.id}`,
    lastModified: project.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes, ...projectRoutes];
}
