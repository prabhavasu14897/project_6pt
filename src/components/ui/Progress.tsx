import type { ReactNode } from 'react';
import type { Tone } from '@/types/dashboard';
import { cn } from '@/lib/utils';

export interface ProgressProps {
  value: number;
  max: number;
  label: string;
  variant?: 'bar' | 'ring';
  tone?: Tone;
  /** Ring only: content in the center (defaults to "value/max"). */
  children?: ReactNode;
  size?: number;
  className?: string;
}

export function Progress({ value, max, label, variant = 'bar', tone = 'primary', children, size = 112, className }: ProgressProps) {
  const ratio = max > 0 ? Math.min(Math.max(value / max, 0), 1) : 0;
  const a11y = { role: 'progressbar', 'aria-label': label, 'aria-valuemin': 0, 'aria-valuemax': max, 'aria-valuenow': value } as const;

  if (variant === 'bar') {
    return (
      <div className={cn('progress-bar', `tone-${tone}`, className)} {...a11y}>
        <span className="progress-bar__fill" style={{ transform: `scaleX(${ratio})` }} />
      </div>
    );
  }

  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className={cn('progress-ring', `tone-${tone}`, className)} style={{ width: size, height: size }} {...a11y}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle className="progress-ring__track" cx={size / 2} cy={size / 2} r={radius} strokeWidth={stroke} fill="none" />
        <circle
          className="progress-ring__fill"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - ratio)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className="progress-ring__center">{children ?? `${value}/${max}`}</span>
    </div>
  );
}
