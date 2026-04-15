import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'b4t4y7ug',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skHrdQVBaSymOlzAC81SUePGV8OOAdfFs8DVKxT1stAh8I1tgiVMdlr6FkUxFiski9zr0Dn9RRnpHFBeWpf3hkC3iIFTokUcpdzQ1abza983WzYOfM28iZAk9zCW8NMRB5ja6R5Tkwy9TSUuTulaK6VlTHUUJGR5qSJxJSx0BS97E8TO8qhv',
  useCdn: false,
});

const industries = [
  { title: 'Agriculture', slug: 'agriculture' },
  { title: 'Architecture', slug: 'architecture' },
  { title: 'Automotive', slug: 'automotive' },
  { title: 'Beauty', slug: 'beauty' },
  { title: 'Business', slug: 'business' },
  { title: 'Cannabis', slug: 'cannabis' },
  { title: 'Charity', slug: 'charity' },
  { title: 'Children', slug: 'children' },
  { title: 'Construction', slug: 'construction' },
  { title: 'Education', slug: 'education' },
  { title: 'Entertainment', slug: 'entertainment' },
  { title: 'Fashion', slug: 'fashion' },
  { title: 'Finance', slug: 'finance' },
  { title: 'Fitness', slug: 'fitness' },
  { title: 'Food', slug: 'food' },
  { title: 'Gaming', slug: 'gaming' },
  { title: 'Healthcare', slug: 'healthcare' },
  { title: 'Hospitality', slug: 'hospitality' },
  { title: 'Law', slug: 'law' },
  { title: 'Luxury', slug: 'luxury' },
  { title: 'Manufacturing', slug: 'manufacturing' },
  { title: 'Media', slug: 'media' },
  { title: 'Music', slug: 'music' },
  { title: 'Nature', slug: 'nature' },
  { title: 'Pets', slug: 'pets' },
  { title: 'Photography', slug: 'photography' },
  { title: 'Real Estate', slug: 'real-estate' },
  { title: 'Religion', slug: 'religion' },
  { title: 'Restaurant', slug: 'restaurant' },
  { title: 'Shopping', slug: 'shopping' },
  { title: 'Sports', slug: 'sports' },
  { title: 'Tech', slug: 'tech' },
  { title: 'Transport', slug: 'transport' },
  { title: 'Travel', slug: 'travel' },
  { title: 'Wellness', slug: 'wellness' },
];

async function seed() {
  console.log(`Seeding ${industries.length} industry categories...`);

  const transaction = client.transaction();

  for (const industry of industries) {
    transaction.createIfNotExists({
      _id: `category-${industry.slug}`,
      _type: 'category',
      title: industry.title,
      slug: { _type: 'slug', current: industry.slug },
    });
  }

  const result = await transaction.commit();
  console.log('Done!', result);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
