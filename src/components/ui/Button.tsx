import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { NavigationIcon, type IconName } from '@/components/navigation/NavigationIcon';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  loading?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  disabled,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn('button', `button--${variant}`, `button--${size}`, loading && 'is-loading', className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <span className="spinner" aria-hidden="true" /> : icon && <NavigationIcon name={icon} size={size === 'sm' ? 16 : 18} />}
      <span>{children}</span>
    </button>
  );
}
