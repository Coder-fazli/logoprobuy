'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FaqItem {
  question: string;
  answer: string;
}

function FaqItem({ question, answer }: FaqItem) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-border">
      <button
        className="w-full flex items-center justify-between py-4 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="text-base font-medium text-foreground">{question}</span>
        <span className="shrink-0 text-foreground/40 ml-4">
          {open ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300 text-base text-muted-foreground leading-relaxed',
          open ? 'max-h-40 pb-4' : 'max-h-0'
        )}
      >
        {answer}
      </div>
    </div>
  );
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div>
      {items.map((item) => (
        <FaqItem key={item.question} question={item.question} answer={item.answer} />
      ))}
      <div className="border-t border-border" />
    </div>
  );
}
