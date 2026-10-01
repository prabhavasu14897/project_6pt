import { productConfig } from '@/config';
import { openShoppingItems, useHousehold } from '@/data/prototype';
import type { StatCardConfig } from '@/types/dashboard';
import { routeFor } from '@/lib/navigation';
import { fill } from '@/lib/utils';
import { StatCard } from '@/components/ui/StatCard';

/** Shopping tile: open item count, plus a peek at what is on the list. */
export function ShoppingOverview({ stat }: { stat: StatCardConfig }) {
  const open = openShoppingItems(useHousehold());
  const peek = open.slice(0, 2).map((i) => i.name).join(', ');
  const rest = open.length - 2;
  const detail = open.length === 0 ? undefined : rest > 0 ? fill(productConfig.ui.listAndMore, { list: peek, n: rest }) : peek;
  return (
    <StatCard
      label={stat.label}
      value={String(open.length)}
      unit={stat.unit}
      icon={stat.icon}
      tone={stat.tone}
      detail={detail}
      to={routeFor(stat.target)}
    />
  );
}
