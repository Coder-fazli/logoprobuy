import { MetadataRoute } from 'next';
import { getAllLogoSlugs } from '@/lib/queries';

const BASE_URL = 'https://logobuypro.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Dynamic logo pages
  let logoPages: MetadataRoute.Sitemap = [];
  try {
    const slugs = await getAllLogoSlugs();
    logoPages = slugs.map(({ slug }) => ({
      url: `${BASE_URL}/logos/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));
  } catch {
    // Sanity unavailable — skip logo pages
  }

  return [...staticPages, ...logoPages];
}
