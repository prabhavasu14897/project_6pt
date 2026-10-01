import { useState } from 'react';
import { cn } from '@/lib/utils';

export interface AvatarProps {
  name: string;
  src?: string;
  size?: number;
  /** Decorative when the name is already visible next to it. */
  decorative?: boolean;
  className?: string;
}

export function Avatar({ name, src, size = 32, decorative = false, className }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return (
    <span
      className={cn('avatar', className)}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.38) }}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : name}
      aria-hidden={decorative || undefined}
    >
      {src && !failed ? <img src={src} alt="" width={size} height={size} onError={() => setFailed(true)} /> : initials}
    </span>
  );
}
