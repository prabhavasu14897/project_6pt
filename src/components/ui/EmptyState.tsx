import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { NavigationIcon, type IconName } from '@/components/navigation/NavigationIcon';

export interface EmptyStateProps {
  icon: IconName;
  title: string;
  hint?: string;
  action?: ReactNode;
  compact?: boolean;
  className?: string;
}

export function EmptyState({ icon, title, hint, action, compact = false, className }: EmptyStateProps) {
  return (
    <div className={cn('empty-state', compact && 'empty-state--compact', className)}>
      <span className="empty-state__icon">
        <NavigationIcon name={icon} size={compact ? 20 : 24} />
      </span>
      <p className="empty-state__title">{title}</p>
      {hint && <p className="empty-state__hint">{hint}</p>}
      {action}
    </div>
  );
}
