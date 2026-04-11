'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SnakeBorderProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  color?: string;
  speed?: number; // seconds per full loop
  snakeSize?: number; // degrees of the arc (0–360)
  bgColor?: string; // must match the card's background color
  borderRadius?: number;
}

export function SnakeBorder({
  children,
  className,
  innerClassName,
  color = '#c9a96e',
  speed = 4,
  snakeSize = 60,
  bgColor = '#ffffff',
  borderRadius = 12,
}: SnakeBorderProps) {
  const transparent = 360 - snakeSize;

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{ borderRadius, background: bgColor, padding: 2 }}
    >
      {/* Spinning snake arc */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          inset: '-200%',
          background: `conic-gradient(
            from 0deg,
            transparent 0deg,
            transparent ${transparent * 0.6}deg,
            ${color}00 ${transparent * 0.7}deg,
            ${color}88 ${transparent * 0.85}deg,
            ${color} ${transparent}deg,
            ${color} ${transparent + snakeSize * 0.5}deg,
            ${color}88 ${transparent + snakeSize * 0.8}deg,
            ${color}00 ${transparent + snakeSize * 0.95}deg,
            transparent 360deg
          )`,
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
      />

      {/* Inner content — covers center, exposes only the 2px border strip */}
      <div
        className={cn('relative z-10', innerClassName)}
        style={{ borderRadius: borderRadius - 2, overflow: 'hidden', background: bgColor }}
      >
        {children}
      </div>
    </div>
  );
}
