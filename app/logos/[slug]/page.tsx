import { Metadata } from 'next';
import { getLogoBySlug } from '@/lib/queries';
import { notFound } from 'next/navigation';
import LogoProduct from './LogoProduct';
import type { SanityLogo } from '@/lib/queries';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

// Static fallback data while Sanity is being populated
const STATIC_LOGOS: Record<string, Partial<SanityLogo>> = {
  'modern-letter-logo':    { title: 'Modern Letter Logo',    price: 1100, description: 'A sleek, modern lettermark crafted for forward-thinking brands. Clean geometry, bold weight, and timeless proportions make this logo adaptable across all platforms.' },
  'pyramid-and-letter':    { title: 'Pyramid And Letter',    price: 500,  description: 'A strong geometric mark combining a pyramid structure with a refined letterform. Ideal for finance, consulting, and professional services.' },
  'letter-r-arrow-form':   { title: 'Letter R Arrow Form',   price: 600,  description: 'A dynamic lettermark fusing the letter R with a directional arrow form. Communicates progress, velocity, and forward momentum — perfect for tech or logistics brands.' },
  'letter-b-and-honey':    { title: 'Letter B And Honey',    price: 500,  description: 'A warm, distinctive mark blending organic honeycomb texture with a refined B letterform. Great for food, wellness, and artisan brands.' },
  'pine-tree-house-mark':  { title: 'Pine Tree House Mark',  price: 3000, description: 'A premium emblem combining a pine tree silhouette with architectural form. Built for real estate, hospitality, and nature-forward companies.' },
  'lightning-q-mount':     { title: 'Lightning Q Mount',     price: 700,  description: 'An energetic abstract mark merging a Q letterform with a lightning bolt motif. Ideal for energy, sports, or tech startups seeking bold visual identity.' },
  'elegant-letter-e-mark': { title: 'Elegant Letter E Mark', price: 700,  description: 'A refined, minimalist E monogram designed with precision. Versatile and timeless — suits luxury, fashion, or professional service brands.' },
  'spring-nature-tree':    { title: 'Spring Nature Tree',    price: 850,  description: 'A graceful nature-inspired mark evoking growth and renewal. Crafted for eco-friendly brands, wellness companies, and organic product lines.' },
  'minimalist-home-mark':  { title: 'Minimalist Home Mark',  price: 2000, description: 'A clean, architectural home symbol reduced to its essential form. Premium feel for real estate agencies, interior designers, and property developers.' },
  'tiger-head-predator':   { title: 'Tiger Head Predator',   price: 500,  description: 'A bold mascot logo featuring a fierce tiger head rendered in sharp geometric lines. Perfect for sports teams, gaming brands, and performance apparel.' },
};

function buildLogoFromStatic(slug: string): SanityLogo | null {
  const data = STATIC_LOGOS[slug];
  if (!data) return null;
  return {
    _id: slug,
    title: data.title!,
    slug: { current: slug },
    image: { asset: { url: `/gallery-${(Object.keys(STATIC_LOGOS).indexOf(slug) % 7) + 1}.jpeg` } },
    price: data.price!,
    description: data.description,
    filesIncluded: ['AI', 'EPS', 'SVG', 'PNG', 'PDF'],
    ...data,
  } as SanityLogo;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const logo = (await getLogoBySlug(slug)) ?? buildLogoFromStatic(slug);
  if (!logo) return {};

  const title = logo.seo?.metaTitle ?? `${logo.title} — LogoBuyPro`;
  const description =
    logo.seo?.metaDescription ??
    logo.description ??
    `Buy the exclusive ${logo.title} logo. Instant download, full ownership, trademark-ready.`;
  const imageUrl = logo.seo?.ogImage?.asset.url ?? logo.image?.asset.url;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: imageUrl ? [{ url: imageUrl }] : [],
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
    robots: logo.seo?.noIndex ? 'noindex,nofollow' : 'index,follow',
    ...(logo.seo?.canonicalUrl && { alternates: { canonical: logo.seo.canonicalUrl } }),
  };
}

export default async function LogoPage({ params }: Props) {
  const { slug } = await params;
  const logo = (await getLogoBySlug(slug)) ?? buildLogoFromStatic(slug);
  if (!logo) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: logo.title,
    description: logo.description ?? '',
    image: logo.image?.asset.url,
    offers: {
      '@type': 'Offer',
      price: logo.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'LogoBuyPro' },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '1',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LogoProduct logo={logo} />
    </>
  );
}
