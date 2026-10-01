import { productConfig } from '@/config';
import { maintenanceDueSoon, useHousehold } from '@/data/prototype';
import type { StatCardConfig } from '@/types/dashboard';
import { routeFor } from '@/lib/navigation';
import { daysFromToday, formatRelativeDay, plural } from '@/lib/utils';
import { StatCard } from '@/components/ui/StatCard';

/** Maintenance tile: items due soon, plus the most urgent one. */
export function MaintenanceOverview({ stat }: { stat: StatCardConfig }) {
  const { ui } = productConfig;
  const due = maintenanceDueSoon(useHousehold());
  const next = due[0];
  let detail: string | undefined;
  if (next) {
    const days = daysFromToday(next.due);
    const when = days < 0 ? ui.overdue : days <= 1 ? formatRelativeDay(next.due).toLowerCase() : plural(days, ui.dueInDays);
    detail = `${next.title} · ${when}`;
  }
  return (
    <StatCard
      label={stat.label}
      value={String(due.length)}
      unit={stat.unit}
      icon={stat.icon}
      tone={next && daysFromToday(next.due) < 0 ? 'danger' : stat.tone}
      detail={detail}
      to={routeFor(stat.target)}
    />
  );
}
