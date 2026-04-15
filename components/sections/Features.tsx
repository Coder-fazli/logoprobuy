'use client';

import { ServiceCard } from '@/components/ui/service-card';
import { SnakeBorder } from '@/components/ui/snake-border';
import { motion } from 'framer-motion';
import type { HomePageData } from '@/lib/queries';

const features = [
  {
    title: 'Lightning Delivery',
    description: 'Your files hit your inbox the moment you checkout. No queues, no waiting on a designer.',

    emoji: '⚡',
    variant: 'default' as const,
  },
  {
    title: 'Yours Alone, Forever',
    description: 'Full ownership transferred on purchase. This logo will never be sold to anyone else.',

    emoji: '🔒',
    variant: 'gray' as const,
  },
  {
    title: 'Tweak It Your Way',
    description: 'Colors, fonts, proportions — request adjustments at no extra charge. We make it fit perfectly.',

    emoji: '🎨',
    variant: 'default' as const,
  },
  {
    title: 'Trademark-Ready',
    description: 'Clean vector files with zero conflicts. File your trademark from day one without legal headaches.',

    emoji: '⚖️',
    variant: 'gray' as const,
  },
  {
    title: 'Agency Quality, Startup Price',
    description: "Skip the $5,000 branding agency bill. Get a world-class logo at a fraction of the cost.",

    emoji: '💸',
    variant: 'default' as const,
  },
  {
    title: 'Crafted by Real Designers',
    description: 'Every logo is made by a vetted professional — not a generator, not a template farm.',

    emoji: '✦',
    variant: 'gray' as const,
  },
];

function emojiToSvgUrl(emoji: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><text y="96" font-size="96" opacity="0.18">${emoji}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Features({ cms }: { cms?: HomePageData | null }) {
  const label    = cms?.featuresLabel    ?? 'Why LogoBuyPro';
  const title    = cms?.featuresTitle    ?? 'Seamlessly discover your unique logo';
  const subtitle = cms?.featuresSubtitle ?? 'A smooth, end-to-end journey — from first browse to owning the perfect identity for your brand.';

  // Split title: last two words get the amber highlight
  const titleWords = title.split(' ');
  const highlighted = titleWords.slice(-2).join(' ');
  const plain = titleWords.slice(0, -2).join(' ');

  return (
    <section className="w-full pt-16 pb-24" style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #f7f7f5 8%, #f7f7f5 92%, #ffffff 100%)' }}>
      <div className="container mx-auto px-6 lg:px-12">

        {/* Heading */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-px w-6 bg-foreground/30 rounded-full" />
            <p className="text-sm font-semibold uppercase tracking-widest bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text text-transparent">
              {label}
            </p>
            <span className="h-px w-6 bg-foreground/30 rounded-full" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
            {plain}{' '}
            <span className="relative inline-block">
              <span className="relative z-10">{highlighted}</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-[#D33C3C]/30 rounded-sm -z-0" />
            </span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={cardVariants}>
              <SnakeBorder
                bgColor={feature.variant === 'gray' ? '#f5f5f5' : '#ffffff'}
                color="#e8d5b7"
                speed={8}
                snakeSize={60}
                borderRadius={12}
                className="w-full"
              >
                <ServiceCard
                  title={feature.title}
                  imgSrc={emojiToSvgUrl(feature.emoji)}
                  imgAlt={feature.title}
                  description={feature.description}
                  variant={feature.variant}
                  className="min-h-[200px] shadow-none border-0"
                />
              </SnakeBorder>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
