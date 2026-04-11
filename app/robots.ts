import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio', '/studio/', '/api/'],
      },
    ],
    sitemap: 'https://logobuypro.com/sitemap.xml',
  };
}
