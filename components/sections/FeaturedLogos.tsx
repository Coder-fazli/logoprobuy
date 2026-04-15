'use client';

import { useState } from 'react';
import { Heart, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './FeaturedLogos.module.css';
import type { HomePageData, SanityLogo } from '@/lib/queries';

// Static fallback logos (used when Sanity has no featured logos yet)
const STATIC_LOGOS = [
  { id: 1,  image: '/gallery-1.jpeg', title: 'Modern Letter Logo',    price: 1100, category: 'Lettermark', bg: '#f3f3f0', isNew: true, slug: 'modern-letter-logo' },
  { id: 2,  image: '/gallery-2.jpeg', title: 'Pyramid And Letter',    price: 500,  category: 'Geometric',  bg: '#f0ede8',             slug: 'pyramid-and-letter' },
  { id: 3,  image: '/gallery-3.jpeg', title: 'Letter R Arrow Form',   price: 600,  category: 'Lettermark', bg: '#0d1b3e', isNew: true, slug: 'letter-r-arrow-form' },
  { id: 4,  image: '/gallery-4.jpeg', title: 'Letter B And Honey',    price: 500,  category: 'Wordmark',   bg: '#d4a017',             slug: 'letter-b-and-honey' },
  { id: 5,  image: '/gallery-5.jpeg', title: 'Pine Tree House Mark',  price: 3000, category: 'Mascot',     bg: '#1a3c3c',             slug: 'pine-tree-house-mark' },
  { id: 6,  image: '/gallery-6.jpeg', title: 'Lightning Q Mount',     price: 700,  category: 'Abstract',   bg: '#f3f3f0',             slug: 'lightning-q-mount' },
  { id: 7,  image: '/gallery-7.jpeg', title: 'Elegant Letter E Mark', price: 700,  category: 'Lettermark', bg: '#ede8e0',             slug: 'elegant-letter-e-mark' },
  { id: 8,  image: '/gallery-1.jpeg', title: 'Spring Nature Tree',    price: 850,  category: 'Mascot',     bg: '#eef2e6', isNew: true, slug: 'spring-nature-tree' },
  { id: 9,  image: '/gallery-2.jpeg', title: 'Minimalist Home Mark',  price: 2000, category: 'Geometric',  bg: '#0f0f0f',             slug: 'minimalist-home-mark' },
  { id: 10, image: '/gallery-3.jpeg', title: 'Tiger Head Predator',   price: 500,  category: 'Mascot',     bg: '#f3f3f0',             slug: 'tiger-head-predator' },
];

const categoryColors: Record<string, string> = {
  Lettermark: '#e8f0ff',
  Geometric:  '#fff4e0',
  Wordmark:   '#ffeef5',
  Mascot:     '#edfff4',
  Abstract:   '#f3ecff',
};

interface CardItem {
  id: string | number;
  image: string;
  title: string;
  price: number;
  category: string;
  bg?: string;
  isNew?: boolean;
  sold?: boolean;
  slug: string;
}

function LogoCard({ logo }: { logo: CardItem }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.imageWrap} style={{ backgroundColor: logo.bg ?? '#f3f3f0' }}>
        <Link href={`/logos/${logo.slug}`} className="block w-full h-full">
          {logo.isNew && !logo.sold && <span className={styles.newBadge}>New</span>}
          <img
            src={logo.image}
            alt={logo.title}
            className={`${styles.image} ${logo.sold ? 'grayscale opacity-40' : ''}`}
          />
          {logo.sold && (
            <>
              {/* Subtle dark overlay */}
              <div className="absolute inset-0 bg-white/30 z-10" />
              {/* Red stamp */}
              <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                <span
                  style={{ transform: 'rotate(-15deg)', border: '2px solid #e53e3e' }}
                  className="text-red-500 text-xs font-black uppercase tracking-[0.3em] px-2.5 py-1 opacity-90"
                >
                  Sold
                </span>
              </div>
            </>
          )}
        </Link>
        {!logo.sold && (
          <button
            className={`${styles.heart} ${liked ? styles.heartActive : ''}`}
            onClick={() => setLiked(!liked)}
            aria-label="Like"
          >
            <Heart className="w-4 h-4" fill={liked ? 'currentColor' : 'none'} />
          </button>
        )}
      </div>
      <div className="mt-3 px-0.5">
        <span
          className={styles.categoryTag}
          style={{ backgroundColor: categoryColors[logo.category] ?? '#f3f3f0' }}
        >
          {logo.category}
        </span>
        <Link href={`/logos/${logo.slug}`}>
          <p className={`text-sm font-semibold truncate mt-1.5 hover:underline ${logo.sold ? 'text-gray-400' : 'text-gray-900'}`}>{logo.title}</p>
        </Link>
        {logo.sold ? (
          <span className="flex items-center gap-1.5 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
            <span className="text-[11px] font-semibold text-red-400 uppercase tracking-widest">sold</span>
          </span>
        ) : (
          <span className={styles.priceBadge}>${logo.price.toLocaleString()}</span>
        )}
      </div>
    </div>
  );
}

interface Props {
  cms?: HomePageData | null;
  logos?: SanityLogo[];
}

export default function FeaturedLogos({ cms, logos: sanityLogos }: Props) {
  const label       = cms?.logosLabel       ?? 'Curated Collection';
  const title       = cms?.logosTitle       ?? 'Featured Logos';
  const description = cms?.logosDescription ?? 'Handpicked by our team for exceptional design and craftsmanship.';
  const browseText  = cms?.logosBrowseText  ?? 'Browse all logos';
  const browseLink  = cms?.logosBrowseLink  ?? '/logos';

  // Normalise Sanity logos into CardItem shape; fall back to static data
  const displayLogos: CardItem[] = sanityLogos?.length
    ? sanityLogos.map((l) => ({
        id: l._id,
        image: l.image?.asset.url ?? '/gallery-1.jpeg',
        title: l.title,
        price: l.price,
        category: l.category?.title ?? 'Logo',
        slug: l.slug.current,
        sold: l.sold ?? false,
      }))
    : STATIC_LOGOS;

  // Split title into first word(s) + last word for the amber highlight
  const words = title.split(' ');
  const lastWord = words.pop();
  const firstWords = words.join(' ');

  return (
    <section className="w-full bg-white py-16 px-6 lg:px-12" id="logos">
      <div className="container mx-auto">
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-px w-6 bg-foreground/30 rounded-full" />
              <p className="text-sm font-semibold uppercase tracking-widest bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text text-transparent">
                {label}
              </p>
              <span className="h-px w-6 bg-foreground/30 rounded-full" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
              {firstWords}{' '}
              <span className="relative inline-block">
                <span className="relative z-10">{lastWord}</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-[#D33C3C]/30 rounded-sm -z-0" />
              </span>
            </h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-lg leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-8">
          {displayLogos.map((logo, i) => (
            <motion.div
              key={logo.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: 'easeOut' }}
            >
              <LogoCard logo={logo} />
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link href={browseLink}>
            <Button className="relative text-base font-medium rounded-full h-14 p-1 ps-8 pe-16 group transition-all duration-500 hover:ps-16 hover:pe-8 w-fit overflow-hidden cursor-pointer">
              <span className="relative z-10 transition-all duration-500">{browseText}</span>
              <div className="absolute right-1 w-12 h-12 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-52px)] group-hover:rotate-45">
                <ArrowUpRight size={18} />
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
