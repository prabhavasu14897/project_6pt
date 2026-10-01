import type { ReactNode } from 'react';
import type { Tone } from '@/types/dashboard';
import { cn } from '@/lib/utils';

export interface BadgeProps {
  tone?: Tone;
  /** `dot` is a compact inline marker for meta rows; `pill` is a filled label. */
  variant?: 'dot' | 'pill';
  children: ReactNode;
  className?: string;
}

/** Status label. The text always carries the meaning; color only reinforces it. */
export function Badge({ tone = 'neutral', variant = 'pill', children, className }: BadgeProps) {
  return (
    <span className={cn('badge', `badge--${variant}`, `tone-${tone}`, className)}>
      <span className="badge__dot" aria-hidden="true" />
      {children}
    </span>
  );
}
