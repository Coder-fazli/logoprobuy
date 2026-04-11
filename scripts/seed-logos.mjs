/**
 * Seed script — creates 10 demo logo documents in Sanity
 * with images uploaded from the /public folder.
 *
 * Usage:
 *   node scripts/seed-logos.mjs
 */

import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, '../public');

const client = createClient({
  projectId: 'b4t4y7ug',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const LOGOS = [
  { slug: 'modern-letter-logo',    title: 'Modern Letter Logo',    price: 1100, category: 'Lettermark', image: 'gallery-1.jpeg', featured: true,  description: 'A sleek, modern lettermark crafted for forward-thinking brands. Clean geometry, bold weight, and timeless proportions make this logo adaptable across all platforms.' },
  { slug: 'pyramid-and-letter',    title: 'Pyramid And Letter',    price: 500,  category: 'Geometric',  image: 'gallery-2.jpeg', featured: true,  description: 'A strong geometric mark combining a pyramid structure with a refined letterform. Ideal for finance, consulting, and professional services.' },
  { slug: 'letter-r-arrow-form',   title: 'Letter R Arrow Form',   price: 600,  category: 'Lettermark', image: 'gallery-3.jpeg', featured: true,  description: 'A dynamic lettermark fusing the letter R with a directional arrow form. Communicates progress, velocity, and forward momentum.' },
  { slug: 'letter-b-and-honey',    title: 'Letter B And Honey',    price: 500,  category: 'Wordmark',   image: 'gallery-4.jpeg', featured: true,  description: 'A warm, distinctive mark blending organic honeycomb texture with a refined B letterform. Great for food, wellness, and artisan brands.' },
  { slug: 'pine-tree-house-mark',  title: 'Pine Tree House Mark',  price: 3000, category: 'Mascot',     image: 'gallery-5.jpeg', featured: true,  description: 'A premium emblem combining a pine tree silhouette with architectural form. Built for real estate, hospitality, and nature-forward companies.' },
  { slug: 'lightning-q-mount',     title: 'Lightning Q Mount',     price: 700,  category: 'Abstract',   image: 'gallery-6.jpeg', featured: true,  description: 'An energetic abstract mark merging a Q letterform with a lightning bolt motif. Ideal for energy, sports, or tech startups.' },
  { slug: 'elegant-letter-e-mark', title: 'Elegant Letter E Mark', price: 700,  category: 'Lettermark', image: 'gallery-7.jpeg', featured: true,  description: 'A refined, minimalist E monogram designed with precision. Versatile and timeless — suits luxury, fashion, or professional service brands.' },
  { slug: 'spring-nature-tree',    title: 'Spring Nature Tree',    price: 850,  category: 'Mascot',     image: 'gallery-1.jpeg', featured: true,  description: 'A graceful nature-inspired mark evoking growth and renewal. Crafted for eco-friendly brands, wellness companies, and organic product lines.' },
  { slug: 'minimalist-home-mark',  title: 'Minimalist Home Mark',  price: 2000, category: 'Geometric',  image: 'gallery-2.jpeg', featured: true,  description: 'A clean, architectural home symbol reduced to its essential form. Premium feel for real estate agencies and interior designers.' },
  { slug: 'tiger-head-predator',   title: 'Tiger Head Predator',   price: 500,  category: 'Mascot',     image: 'gallery-3.jpeg', featured: false, description: 'A bold mascot logo featuring a fierce tiger head rendered in sharp geometric lines. Perfect for sports teams and gaming brands.' },
];

async function uploadImage(filename) {
  const filePath = path.join(PUBLIC_DIR, filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`  ⚠ Image not found: ${filename}`);
    return null;
  }
  const buffer = fs.readFileSync(filePath);
  const asset = await client.assets.upload('image', buffer, {
    filename,
    contentType: 'image/jpeg',
  });
  console.log(`  ✓ Uploaded ${filename} → ${asset._id}`);
  return asset;
}

async function getOrCreateCategory(title) {
  const slug = title.toLowerCase();
  const existing = await client.fetch(
    `*[_type == "category" && slug.current == $slug][0]._id`,
    { slug }
  );
  if (existing) return existing;

  const doc = await client.create({
    _type: 'category',
    title,
    slug: { _type: 'slug', current: slug },
  });
  console.log(`  ✓ Created category: ${title}`);
  return doc._id;
}

async function run() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌  SANITY_API_TOKEN is not set. Add it to .env.local and run again.');
    process.exit(1);
  }

  console.log('🌱  Seeding logos into Sanity...\n');

  const categoryCache = {};

  for (const logo of LOGOS) {
    // Check if already exists
    const exists = await client.fetch(
      `*[_type == "logo" && slug.current == $slug][0]._id`,
      { slug: logo.slug }
    );
    if (exists) {
      console.log(`⏭  Skipping "${logo.title}" (already exists)`);
      continue;
    }

    console.log(`📦  Creating "${logo.title}"...`);

    // Upload image
    const imageAsset = await uploadImage(logo.image);

    // Get/create category
    if (!categoryCache[logo.category]) {
      categoryCache[logo.category] = await getOrCreateCategory(logo.category);
    }
    const categoryId = categoryCache[logo.category];

    // Create logo document
    await client.create({
      _type: 'logo',
      title: logo.title,
      slug: { _type: 'slug', current: logo.slug },
      price: logo.price,
      description: logo.description,
      featured: logo.featured,
      filesIncluded: ['AI', 'EPS', 'SVG', 'PNG', 'PDF'],
      category: { _type: 'reference', _ref: categoryId },
      ...(imageAsset && {
        image: {
          _type: 'image',
          asset: { _type: 'reference', _ref: imageAsset._id },
          alt: logo.title,
        },
      }),
    });

    console.log(`  ✅  "${logo.title}" created\n`);
  }

  console.log('🎉  Done! All logos are now in your Sanity admin.');
}

run().catch((err) => {
  console.error('❌  Error:', err.message);
  process.exit(1);
});
