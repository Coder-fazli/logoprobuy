'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface TestimonialAvatarsProps {
  count: number;
  label?: string;
  rating?: number;
  stars?: number;
  avatars?: string[];
  className?: string;
}

const defaultAvatars = [
  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=80&h=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
];

function useCountUp(target: number, duration = 1800) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);

  return value;
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(0)}k+`;
  return `${n}+`;
}

export function TestimonialAvatars({
  count,
  label = 'users',
  rating = 5.0,
  stars = 5,
  avatars = defaultAvatars,
  className,
}: TestimonialAvatarsProps) {
  const animatedCount = useCountUp(count);

  return (
    <div className={cn('flex items-center gap-4', className)}>
      {/* Stacked avatars */}
      <div className="flex -space-x-3">
        {avatars.map((src, i) => (
          <div key={i} className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-white">
            <Image src={src} alt={`Customer ${i + 1}`} fill className="object-cover grayscale" />
          </div>
        ))}
      </div>

      {/* Vertical divider */}
      <div className="h-10 w-px bg-gray-300" />

      {/* Stars + rating + count */}
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: stars }).map((_, i) => (
              <svg key={i} className="w-4 h-4 fill-black" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm font-bold text-foreground">{rating.toFixed(1)}</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Trusted by{' '}
          <span className="font-semibold text-foreground">{formatCount(animatedCount)}</span>{' '}
          {label}
        </p>
      </div>
    </div>
  );
}
