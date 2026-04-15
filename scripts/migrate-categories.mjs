import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'b4t4y7ug',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skHrdQVBaSymOlzAC81SUePGV8OOAdfFs8DVKxT1stAh8I1tgiVMdlr6FkUxFiski9zr0Dn9RRnpHFBeWpf3hkC3iIFTokUcpdzQ1abza983WzYOfM28iZAk9zCW8NMRB5ja6R5Tkwy9TSUuTulaK6VlTHUUJGR5qSJxJSx0BS97E8TO8qhv',
  useCdn: false,
});

// ── 1. Mark all existing industry categories ─────────────────────────────────
const industrySlugs = [
  'agriculture','architecture','automotive','beauty','business','cannabis',
  'charity','children','construction','education','entertainment','fashion',
  'finance','fitness','food','gaming','healthcare','hospitality','law',
  'luxury','manufacturing','media','music','nature','pets','photography',
  'real-estate','religion','restaurant','shopping','sports','tech',
  'transport','travel','wellness',
];

// ── 2. Style categories to create ────────────────────────────────────────────
const styles = [
  { title: 'Abstract',    slug: 'abstract' },
  { title: 'Cartoon',     slug: 'cartoon' },
  { title: 'Emblem',      slug: 'emblem' },
  { title: 'Geometric',   slug: 'geometric' },
  { title: 'Lettermark',  slug: 'lettermark' },
  { title: 'Mascot',      slug: 'mascot' },
  { title: 'Minimalist',  slug: 'minimalist' },
  { title: 'Monogram',    slug: 'monogram' },
  { title: 'Pictorial',   slug: 'pictorial' },
  { title: 'Vintage',     slug: 'vintage' },
  { title: 'Wordmark',    slug: 'wordmark' },
];

async function run() {
  // Patch existing industries → kind: 'industry'
  console.log('Setting kind=industry on existing categories…');
  const existing = await client.fetch(
    `*[_type == "category" && slug.current in $slugs]{ _id, slug }`,
    { slugs: industrySlugs }
  );
  const tx1 = client.transaction();
  for (const doc of existing) {
    tx1.patch(doc._id, { set: { kind: 'industry' } });
  }
  await tx1.commit();
  console.log(`  Patched ${existing.length} industry docs`);

  // Create style categories
  console.log('Creating style categories…');
  const tx2 = client.transaction();
  for (const s of styles) {
    tx2.createIfNotExists({
      _id: `category-style-${s.slug}`,
      _type: 'category',
      kind: 'style',
      title: s.title,
      slug: { _type: 'slug', current: s.slug },
    });
  }
  const r2 = await tx2.commit();
  console.log(`  ${r2.results.length} style docs processed`);

  console.log('Done!');
}

run().catch((e) => { console.error(e); process.exit(1); });
