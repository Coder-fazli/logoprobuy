'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import type { SanityLogo, SanityCategory } from '@/lib/queries';
import styles from './FeaturedLogos.module.css';

const styleColors: Record<string, string> = {
  Lettermark: '#e8f0ff',
  Geometric:  '#fff4e0',
  Wordmark:   '#ffeef5',
  Mascot:     '#edfff4',
  Abstract:   '#f3ecff',
  Emblem:     '#fff0e0',
  Cartoon:    '#e0f7ff',
  Minimalist: '#f5f5f5',
  Monogram:   '#fde8ff',
  Pictorial:  '#e8fff0',
  Vintage:    '#fff8e0',
};

function LogoCard({ logo }: { logo: SanityLogo }) {
  const [liked, setLiked] = useState(false);
  const slug     = logo.slug.current;
  const category = logo.category?.title ?? 'Logo';
  const image    = logo.image?.asset.url ?? '/gallery-1.jpeg';

  return (
    <div className={styles.card}>
      <div className={styles.imageWrap} style={{ backgroundColor: '#f3f3f0' }}>
        <Link href={`/logos/${slug}`} className="block w-full h-full">
          {!logo.sold && <span className={styles.newBadge}>New</span>}
          <img
            src={image}
            alt={logo.title}
            className={`${styles.image} ${logo.sold ? 'grayscale opacity-40' : ''}`}
          />
          {logo.sold && (
            <>
              <div className="absolute inset-0 bg-white/30 z-10" />
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
          style={{ backgroundColor: styleColors[category] ?? '#f3f3f0' }}
        >
          {category}
        </span>
        <Link href={`/logos/${slug}`}>
          <p className={`text-sm font-semibold truncate mt-1.5 hover:underline ${logo.sold ? 'text-gray-400' : 'text-gray-900'}`}>
            {logo.title}
          </p>
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
  logos:      SanityLogo[];
  industries: SanityCategory[];
  styles:     SanityCategory[];
}

export default function ShopGrid({ logos, industries, styles: styleCategories }: Props) {
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);
  const [activeStyle,    setActiveStyle]    = useState<string | null>(null);

  const filtered = logos.filter((l) => {
    const industryMatch = !activeIndustry || l.industry?.slug.current === activeIndustry;
    const styleMatch    = !activeStyle    || l.category?.slug.current === activeStyle;
    return industryMatch && styleMatch;
  });

  return (
    <div className="w-full">

      {/* ── Filter row 1: Industry ── */}
      <FilterRow
        label="Filter by Industry"
        items={industries}
        active={activeIndustry}
        onChange={setActiveIndustry}
      />

      {/* ── Filter row 2: Category / Style ── */}
      <FilterRow
        label="Filter by Category"
        items={styleCategories}
        active={activeStyle}
        onChange={setActiveStyle}
        className="mt-5"
      />

      {/* ── Result count ── */}
      <p className="text-sm text-muted-foreground mt-6 mb-6">
        {filtered.length} logo{filtered.length !== 1 ? 's' : ''} found
        {activeIndustry || activeStyle ? (
          <button
            onClick={() => { setActiveIndustry(null); setActiveStyle(null); }}
            className="ml-3 text-xs font-semibold text-gray-400 hover:text-gray-700 underline underline-offset-2 transition-colors"
          >
            Clear filters
          </button>
        ) : null}
      </p>

      {/* ── Grid ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeIndustry}-${activeStyle}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-8"
        >
          {filtered.length > 0 ? (
            filtered.map((logo, i) => (
              <motion.div
                key={logo._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.035, 0.28), ease: 'easeOut' }}
              >
                <LogoCard logo={logo} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-24 text-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-xl">
                🔍
              </div>
              <p className="font-semibold text-gray-700">No logos match these filters</p>
              <p className="text-sm text-muted-foreground">Try a different combination or clear the filters.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Reusable scrollable filter row ────────────────────────────────────────────

function FilterRow({
  label,
  items,
  active,
  onChange,
  className = '',
}: {
  label:     string;
  items:     SanityCategory[];
  active:    string | null;
  onChange:  (slug: string | null) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2.5">
        {label}
      </p>
      <div className="relative">
        {/* fade hints */}
        <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-2 overflow-x-auto pb-0.5 px-1 -mx-1"
          style={{ scrollbarWidth: 'none' }}
        >
          {/* All */}
          <Chip label="All" active={active === null} onClick={() => onChange(null)} />
          {items.map((item) => (
            <Chip
              key={item._id}
              label={item.title}
              active={active === item.slug.current}
              onClick={() => onChange(item.slug.current)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Chip({
  label,
  active,
  onClick,
}: {
  label:   string;
  active:  boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap
        border transition-all duration-150
        ${active
          ? 'bg-gray-900 text-white border-gray-900'
          : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-800'
        }
      `}
    >
      {label}
    </button>
  );
}
