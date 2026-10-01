import { productConfig } from '@/config';
import { monthSpent, useHousehold } from '@/data/prototype';
import type { StatCardConfig } from '@/types/dashboard';
import { routeFor } from '@/lib/navigation';
import { fill, formatCurrency, today } from '@/lib/utils';
import { StatCard } from '@/components/ui/StatCard';

/** Expenses tile: paid spending this month, plus today's spend. */
export function ExpenseOverview({ stat }: { stat: StatCardConfig }) {
  const household = useHousehold();
  const day = today();
  const spentToday = household.expenses.filter((e) => e.status === 'paid' && e.date === day).reduce((sum, e) => sum + e.amount, 0);
  return (
    <StatCard
      label={stat.label}
      value={formatCurrency(monthSpent(household))}
      unit={stat.unit}
      icon={stat.icon}
      tone={stat.tone}
      detail={spentToday > 0 ? fill(productConfig.ui.spentToday, { amount: formatCurrency(spentToday) }) : undefined}
      to={routeFor(stat.target)}
    />
  );
}
