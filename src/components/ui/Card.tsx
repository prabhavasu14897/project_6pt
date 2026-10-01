import type { HTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title?: ReactNode;
  /** Optional header link, e.g. "View all". */
  action?: { label: string; to: string; ariaLabel?: string };
  /** Extra header content on the right (filters, buttons). */
  headerExtra?: ReactNode;
  as?: 'section' | 'div' | 'article';
  padded?: boolean;
  children?: ReactNode;
}

export function Card({ title, action, headerExtra, as: Tag = 'section', padded = true, className, children, ...rest }: CardProps) {
  const hasHeader = title !== undefined || action !== undefined || headerExtra !== undefined;
  return (
    <Tag className={cn('card', padded && 'card--padded', className)} {...rest}>
      {hasHeader && (
        <header className="card__header">
          {title !== undefined && <h2 className="card__title">{title}</h2>}
          {headerExtra}
          {action && (
            <Link className="card__action" to={action.to} aria-label={action.ariaLabel}>
              {action.label}
            </Link>
          )}
        </header>
      )}
      {children}
    </Tag>
  );
}
