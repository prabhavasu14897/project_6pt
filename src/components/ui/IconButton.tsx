import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { NavigationIcon, type IconName } from '@/components/navigation/NavigationIcon';

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icon: IconName;
  /** Accessible name; icon-only controls always need one. */
  label: string;
  variant?: 'ghost' | 'surface';
  size?: 'sm' | 'md';
}

export function IconButton({ icon, label, variant = 'ghost', size = 'md', className, type = 'button', ...rest }: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn('icon-button', `icon-button--${variant}`, `icon-button--${size}`, className)}
      {...rest}
    >
      <NavigationIcon name={icon} size={size === 'sm' ? 16 : 20} />
    </button>
  );
}
