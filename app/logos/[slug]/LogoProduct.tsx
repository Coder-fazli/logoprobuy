import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import FaqAccordion from './FaqAccordion';
import type { SanityLogo } from '@/lib/queries';

const DEFAULT_FAQ = [
  {
    question: 'One Buyer, Full Ownership',
    answer:
      'This logo is sold exclusively to one buyer. Once purchased, it is permanently removed from our marketplace. You receive 100% ownership and all associated rights.',
  },
  {
    question: 'Purchase Options',
    answer:
      'We accept all major credit cards, PayPal, and bank transfers. After payment is confirmed, all files are delivered instantly to your email.',
  },
  {
    question: 'Simple Terms & Conditions',
    answer:
      'By purchasing you agree to our standard licensing terms. You may use this logo commercially across all media. Reselling or redistributing the logo as a template is prohibited.',
  },
];

export default function LogoProduct({ logo }: { logo: SanityLogo }) {
  const faqItems = logo.faq?.length ? logo.faq : DEFAULT_FAQ;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Back button */}
      <div className="container mx-auto px-6 lg:px-16 pt-8 lg:pt-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <span className="text-base">←</span> Back to Shop
        </Link>
      </div>

      {/* Two-column layout */}
      <div className="container mx-auto px-6 lg:px-16 pt-4 lg:pt-6 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

          {/* Left — image + price */}
          <div className="lg:border-r border-border flex flex-col items-center py-8 lg:py-24 pr-0 lg:pr-16">

            {/* File format badges above image */}
            {logo.filesIncluded?.length ? (
              <div className="flex flex-wrap gap-1.5 mb-3 w-full">
                {logo.filesIncluded.map((f) => (
                  <span
                    key={f}
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-full border border-border text-muted-foreground"
                  >
                    {f}
                  </span>
                ))}
              </div>
            ) : null}

            {/* Image */}
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
              {logo.image?.asset.url && (
                <Image
                  src={logo.image.asset.url}
                  alt={logo.image.alt ?? logo.title}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>

            {/* Price + buy */}
            <div className="mt-2 flex flex-col items-center gap-2">
              {logo.sold ? (
                <span className="text-xs font-semibold uppercase tracking-widest text-red-500 bg-red-50 px-3 py-1 rounded-full">
                  Sold
                </span>
              ) : (
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Get it for
                </p>
              )}
              <p className={cn('text-4xl font-bold tracking-wide', logo.sold ? 'text-muted-foreground line-through' : 'text-foreground')}>
                ${logo.price.toLocaleString()}
              </p>
              {!logo.sold && (
                logo.buyLink ? (
                  <a href={logo.buyLink} target="_blank" rel="noopener noreferrer" className="mt-1">
                    <Button className="relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-10 group transition-all duration-500 hover:ps-10 hover:pe-6 w-44 overflow-hidden cursor-pointer">
                      <span className="relative z-10 transition-all duration-500">Buy</span>
                      <div className="absolute right-1 w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                        <ArrowUpRight size={13} />
                      </div>
                    </Button>
                  </a>
                ) : (
                  <Button disabled className="relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-10 w-44 overflow-hidden cursor-not-allowed opacity-50 mt-1">
                    <span className="relative z-10">Buy</span>
                    <div className="absolute right-1 w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center">
                      <ArrowUpRight size={13} />
                    </div>
                  </Button>
                )
              )}
            </div>
          </div>

          {/* Right — title, description, FAQ */}
          <div className="pt-6 lg:pt-24 pb-10 lg:pb-16 pl-0 lg:pl-16 flex flex-col gap-10">

            {/* Title */}
            <div>
              {logo.category && (
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  {logo.category.title}
                </p>
              )}
              <h1 className="text-4xl font-bold tracking-tight text-foreground leading-tight">
                {logo.title}
              </h1>
            </div>

            {/* Description */}
            {logo.description && (
              <p className="text-lg text-muted-foreground leading-loose">
                {logo.description}
              </p>
            )}

            {/* FAQ — server-rendered questions for SEO, client toggle for interactivity */}
            <FaqAccordion items={faqItems} />

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
