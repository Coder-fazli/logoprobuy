'use client';

import { cn } from '@/lib/utils';

interface TestimonialCard {
  image: string;
  quote: string;
  name: string;
  role: string;
}

interface TestimonialProps {
  cards?: TestimonialCard[];
  className?: string;
}

const defaultCards: TestimonialCard[] = [
  {
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=600',
    quote: 'Found the perfect logo for my startup in minutes. Incredible quality.',
    name: 'John Doe',
    role: 'Product Design',
  },
  {
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=600',
    quote: 'Our brand identity was transformed overnight. Best purchase we made.',
    name: 'Alex Smith',
    role: 'Brand Strategy',
  },
  {
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&h=600&auto=format&fit=crop',
    quote: 'The variety and quality of logos available here is unmatched.',
    name: 'Sarah Lee',
    role: 'Content Marketing',
  },
];

export function Testimonial({ cards = defaultCards, className }: TestimonialProps) {
  return (
    <div className={cn('flex flex-wrap items-center justify-center gap-6', className)}>
      {cards.map((card, i) => (
        <div key={i} className="max-w-80 bg-black text-white rounded-2xl">
          <div className="relative -mt-px overflow-hidden rounded-2xl">
            <img
              src={card.image}
              alt={card.name}
              className="h-[270px] w-full rounded-2xl hover:scale-105 transition-all duration-300 object-cover object-top"
            />
            <div className="absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t pointer-events-none from-black to-transparent" />
          </div>
          <div className="px-4 pb-4">
            <p className="font-medium border-b border-gray-600 pb-5">"{card.quote}"</p>
            <p className="mt-4">— {card.name}</p>
            <p className="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#E0724A] to-[#9938CA] text-transparent bg-clip-text">
              {card.role}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
