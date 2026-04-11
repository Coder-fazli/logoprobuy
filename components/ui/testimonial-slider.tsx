'use client';

import { cn } from '@/lib/utils';

interface TestimonialCard {
  image: string;
  name: string;
  handle: string;
  quote: string;
}

interface TestimonialSliderProps {
  cards?: TestimonialCard[];
  className?: string;
  trackClassName?: string;
}

const defaultCards: TestimonialCard[] = [
  {
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=80&h=80&fit=crop&crop=face',
    name: 'John Doe',
    handle: '@johndoe',
    quote: 'Found the perfect logo for my startup in minutes. Incredible quality.',
  },
  {
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face',
    name: 'Alex Smith',
    handle: '@alexsmith',
    quote: 'Our brand identity was transformed overnight. Best purchase we made.',
  },
  {
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    name: 'Sarah Lee',
    handle: '@sarahlee',
    quote: 'The variety and quality of logos available here is absolutely unmatched.',
  },
  {
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
    name: 'Emma Johnson',
    handle: '@emmaj',
    quote: 'Bought three logos already. Every single one was better than expected.',
  },
  {
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    name: 'Mark Davis',
    handle: '@markdavis',
    quote: 'Professional logos at a fraction of the cost. A game changer for us.',
  },
  {
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    name: 'Tom Wilson',
    handle: '@tomwilson',
    quote: 'Clients always ask about our logo. We always say LogoBuyPro.',
  },
  {
    image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop&crop=face',
    name: 'Chris Park',
    handle: '@chrispark',
    quote: 'Stunning designs, fast delivery, and a seamless buying experience.',
  },
  {
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
    name: 'Jake Turner',
    handle: '@jaketurner',
    quote: 'I was skeptical at first but wow — this logo made our brand look premium.',
  },
];

function Card({ card }: { card: TestimonialCard }) {
  return (
    <div className="w-60 flex-shrink-0 bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <img
          src={card.image}
          alt={card.name}
          className="w-8 h-8 rounded-full object-cover grayscale"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="text-xs font-semibold text-gray-900 truncate">{card.name}</span>
            <svg className="w-3 h-3 text-blue-500 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-xs text-gray-400">{card.handle}</p>
        </div>
      </div>
      <p className="text-xs text-gray-700 leading-relaxed">{card.quote}</p>
    </div>
  );
}

export function TestimonialSlider({ cards = defaultCards, className, trackClassName }: TestimonialSliderProps) {
  return (
    <div className={cn('relative w-full overflow-hidden', className)}>
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#f7f7f5] to-transparent" />
      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#f7f7f5] to-transparent" />

      <div className={cn('flex gap-4 w-max', trackClassName)}>
        {[...cards, ...cards].map((card, i) => (
          <Card key={i} card={card} />
        ))}
      </div>
    </div>
  );
}
