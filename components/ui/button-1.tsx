'use client';

import type { HTMLAttributes } from 'react';
import { ArrowUpRight } from 'lucide-react';
import styles from './button-1.module.css';
import { cn } from '@/lib/utils';

interface GradientButtonProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export default function GradientButton({
  children,
  className = '',
  onClick,
  disabled = false,
  ...props
}: GradientButtonProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      className={cn(
        styles.gradientButton,
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={disabled ? undefined : onClick}
      onKeyDown={handleKeyDown}
      aria-disabled={disabled}
      {...props}
    >
      <span className={styles.label}>{children}</span>
      <span className={styles.iconBox}>
        <ArrowUpRight className="w-4 h-4" />
      </span>
    </div>
  );
}
