'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import { AnimatedText } from '@/components/ui/animated-underline-text';
import { GridBackground } from '@/components/ui/background-snippets';
import { TestimonialAvatars } from '@/components/ui/testimonial-avatars';
import styles from './Hero.module.css';
import type { HomePageData, SanityLogo } from '@/lib/queries';

const FALLBACK = [
  '/gallery-1.jpeg',
  '/gallery-2.jpeg',
  '/gallery-3.jpeg',
  '/gallery-4.jpeg',
  '/gallery-5.jpeg',
  '/gallery-6.jpeg',
  '/gallery-7.jpeg',
];

function cycle(arr: string[], count: number): string[] {
  if (!arr.length) return [];
  const out: string[] = [];
  while (out.length < count) out.push(...arr);
  return out.slice(0, count);
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function MarqueeColumn({ images }: { images: string[] }) {
  const repeated = [...images, ...images, ...images];
  return (
    <div className="flex flex-col gap-3 overflow-hidden h-[600px]">
      <div className={`flex flex-col gap-3 ${styles.animateMarqueeVertical}`}>
        {repeated.map((src, idx) => (
          <div key={idx} className="relative w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0">
            <Image src={src} alt={`Logo ${idx + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

function MarqueeRow({ images, reverse = false }: { images: string[]; reverse?: boolean }) {
  return (
    <div
      className="group flex overflow-hidden [--gap:1rem] gap-[var(--gap)]"
      style={{ '--duration': '35s' } as React.CSSProperties}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className={`flex min-w-full shrink-0 items-center gap-[var(--gap)] ${styles.animateMarquee}`}
          style={reverse ? { animationDirection: 'reverse' } : undefined}
        >
          {images.map((src, idx) => (
            <div key={idx} className="relative w-44 h-44 rounded-2xl overflow-hidden flex-shrink-0">
              <Image src={src} alt={`Logo ${idx + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Hero({ cms, logos }: { cms?: HomePageData | null; logos?: SanityLogo[] }) {
  const allImages = logos?.length
    ? logos.map((l) => l.image?.asset.url).filter(Boolean) as string[]
    : FALLBACK;

  const col1 = cycle(allImages, 5);
  const col2 = cycle([...allImages].reverse(), 5);
  const col3 = cycle(allImages.slice(Math.floor(allImages.length / 2)), 5);
  const row1 = cycle(allImages, 6);
  const row2 = cycle([...allImages].reverse(), 6);
  const headline1    = cms?.heroHeadline1    ?? 'Own the Logo,';
  const headline2    = cms?.heroHeadline2    ?? 'Own the Brand';
  const subheadline  = cms?.heroSubheadline  ?? 'Discover thousands of professional logo designs from top designers. Find the perfect brand identity for your business.';
  const ctaText      = cms?.heroCtaText      ?? 'Browse Logos';
  const ctaLink      = cms?.heroCtaLink      ?? '/#logos';
  const userCount    = cms?.heroUserCount    ?? 8900;
  const userLabel    = cms?.heroUserLabel    ?? 'users';
  return (
    <section className="relative w-full overflow-hidden pt-16">
      <GridBackground />
      {/* Mobile 3D gallery — visible only on small screens */}
      <div className="lg:hidden relative overflow-hidden h-[260px] -mb-4"
        style={{ transform: 'perspective(500px) rotateX(-35deg)', transformOrigin: 'top center' }}
      >
        {/* Bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-white to-transparent" />
        <div className="flex gap-3 px-4 justify-center">
          <MarqueeColumn images={col1} />
          <MarqueeColumn images={col2} />
          <MarqueeColumn images={col3} />
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-8 lg:pt-48 pb-10">

        {/* Left — text content */}
        <motion.div
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="lg:text-left text-center">
            <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-7xl leading-tight">
              {headline1}
            </h1>
            <AnimatedText
              text={
                <span>{headline2}</span>
              }
              textClassName="text-5xl sm:text-7xl font-bold tracking-tight text-foreground !text-left"
              underlineClassName="text-primary"
              className="items-start !gap-0"
              underlineDuration={1.2}
              underlineDelay={0.8}
            />
          </motion.div>
          <motion.p className="mt-6 max-w-md text-lg text-muted-foreground" variants={itemVariants}>
            {subheadline}
          </motion.p>
          <motion.div className="mt-8 flex flex-col items-center gap-6 lg:items-start" variants={itemVariants}>
            <TestimonialAvatars count={userCount} label={userLabel} />
            <a href={ctaLink}>
            <Button className="relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden cursor-pointer">
                <span className="relative z-10 transition-all duration-500">{ctaText}</span>
                <div className="absolute right-1 w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </div>
              </Button>
            </a>
          </motion.div>
        </motion.div>

        {/* Right — marquee gallery (desktop only) */}
        <div className="hidden lg:relative lg:flex flex-col gap-8 overflow-hidden">
          {/* Left fade */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-white to-transparent" />
          {/* Right fade */}
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-white to-transparent" />
          <MarqueeRow images={row1} reverse />
          <MarqueeRow images={row2} />
        </div>

      </div>
    </section>
  );
}
