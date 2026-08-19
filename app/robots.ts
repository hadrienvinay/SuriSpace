import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/api/', '/link/new', '/posts/new', '/projects/create'],
      },
    ],
    sitemap: 'https://suri-space.vercel.app/sitemap.xml',
  };
}
