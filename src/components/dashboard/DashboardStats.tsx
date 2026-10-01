import type { ComponentType } from 'react';
import { productConfig } from '@/config';
import { statValue, useHousehold } from '@/data/prototype';
import type { StatCardConfig, StatSource } from '@/types/dashboard';
import { routeFor } from '@/lib/navigation';
import { StatCard } from '@/components/ui/StatCard';
import { ExpenseOverview } from './ExpenseOverview';
import { MaintenanceOverview } from './MaintenanceOverview';
import { ShoppingOverview } from './ShoppingOverview';

/**
 * Domains whose list is not already on the dashboard get a richer tile with a peek line.
 * Every other configured stat renders as a plain stat card.
 */
const overviews: Partial<Record<StatSource, ComponentType<{ stat: StatCardConfig }>>> = {
  'shopping.open': ShoppingOverview,
  'expenses.month': ExpenseOverview,
  'maintenance.dueSoon': MaintenanceOverview,
};

export function DashboardStats() {
  const household = useHousehold();
  return (
    <ul className="dashboard-stats">
      {productConfig.dashboard.stats.map((stat) => {
        const Overview = overviews[stat.source];
        return (
          <li key={stat.id}>
            {Overview ? (
              <Overview stat={stat} />
            ) : (
              <StatCard
                label={stat.label}
                value={statValue(stat.source, household)}
                unit={stat.unit}
                icon={stat.icon}
                tone={stat.tone}
                to={routeFor(stat.target)}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
