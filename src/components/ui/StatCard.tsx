import { Link } from 'react-router-dom';
import type { Tone } from '@/types/dashboard';
import { cn } from '@/lib/utils';
import { NavigationIcon, type IconName } from '@/components/navigation/NavigationIcon';

export interface StatCardProps {
  label: string;
  value: string;
  unit: string;
  icon: IconName;
  tone?: Tone;
  /** One short supporting line, e.g. what is next. */
  detail?: string;
  to?: string;
  className?: string;
}

export function StatCard({ label, value, unit, icon, tone = 'primary', detail, to, className }: StatCardProps) {
  const body = (
    <>
      <span className="stat-card__text">
        <span className="stat-card__label">{label}</span>
        <span className="stat-card__value">
          <span className="stat-card__number">{value}</span> <span className="stat-card__unit">{unit}</span>
        </span>
        {detail && <span className="stat-card__detail">{detail}</span>}
      </span>
      <span className={cn('stat-card__icon', `tone-${tone}`)}>
        <NavigationIcon name={icon} size={24} strokeWidth={1.6} />
      </span>
    </>
  );
  return to ? (
    <Link to={to} className={cn('stat-card', 'is-interactive', className)}>
      {body}
    </Link>
  ) : (
    <div className={cn('stat-card', className)}>{body}</div>
  );
}
