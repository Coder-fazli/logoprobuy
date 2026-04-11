'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import Image from 'next/image';
import styles from '@/components/sections/Hero.module.css';

const BASE = [
  '/gallery-1.jpeg',
  '/gallery-2.jpeg',
  '/gallery-3.jpeg',
  '/gallery-4.jpeg',
  '/gallery-5.jpeg',
  '/gallery-6.jpeg',
  '/gallery-7.jpeg',
];

// Repeat 4× so the row is always packed wall-to-wall
const ROW1 = [...BASE, ...BASE, ...BASE, ...BASE];
const ROW2 = [...[...BASE].reverse(), ...[...BASE].reverse(), ...[...BASE].reverse(), ...[...BASE].reverse()];

function MarqueeRow({ images, reverse = false }: { images: string[]; reverse?: boolean }) {
  return (
    <div
      className="flex overflow-hidden [--gap:0.5rem] gap-[var(--gap)]"
      style={{ '--duration': '40s' } as React.CSSProperties}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className={`flex min-w-full shrink-0 items-center gap-[var(--gap)] ${styles.animateMarquee}`}
          style={reverse ? { animationDirection: 'reverse' } : undefined}
        >
          {images.map((src, idx) => (
            <div key={idx} className="relative w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 opacity-20 grayscale">
              <Image src={src} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

interface Props {
  headline: string;
  email: string;
  replyTime: string;
}

export default function ContactClient({ headline, email, replyTime }: Props) {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const words = headline.trimEnd().split(' ');
  const lastWord = words.pop();
  const rest = words.join(' ');

  return (
    <main className="flex-1 flex flex-col">

      {/* Center content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-16 gap-10">
        <h1 className="text-4xl sm:text-5xl font-normal tracking-tight text-foreground text-center">
          {rest} <span className="font-bold">{lastWord}</span>
        </h1>

        <div className="flex flex-col items-center gap-3">
          <div className="bg-white rounded-full px-10 py-5 text-lg sm:text-xl font-medium text-foreground shadow-sm border border-border select-all">
            {email}
          </div>
          <button
            onClick={copyEmail}
            className="flex items-center gap-1.5 text-xs text-muted-foreground border border-border bg-white hover:bg-neutral-50 transition-colors px-4 py-1.5 rounded-full"
          >
            {copied ? <Check size={11} /> : <Copy size={11} />}
            {copied ? 'Copied!' : 'Copy Email'}
          </button>
        </div>

        <p className="text-sm text-muted-foreground">{replyTime}</p>
      </div>

      {/* Logo marquee rows — same style as hero */}
      <div className="w-full flex flex-col gap-3 pb-8 overflow-hidden">
        <MarqueeRow images={ROW1} />
        <MarqueeRow images={ROW2} reverse />
      </div>

    </main>
  );
}
