import { productConfig } from '@/config';
import { monthlyTotals, monthSpent, pendingBills, spentToday, totalOf, type HouseholdState } from '@/data/prototype';
import type { Tone } from '@/types/dashboard';
import { cn, fill, formatCurrency, plural } from '@/lib/utils';
import { NavigationIcon, type IconName } from '@/components/navigation/NavigationIcon';

interface Tile {
  id: string;
  label: string;
  value: string;
  detail?: string;
  detailIcon?: IconName;
  detailTone?: Tone;
}

/** The three headline figures: this month (with change vs last month), today, and bills due. */
export function ExpenseSummary({ household }: { household: HouseholdState }) {
  const { expensesScreen: copy } = productConfig;
  const month = monthSpent(household);
  const history = monthlyTotals(household);
  const previous = history[history.length - 2]?.amount;
  const today = spentToday(household);
  const pending = pendingBills(household);

  let delta: Pick<Tile, 'detail' | 'detailIcon' | 'detailTone'> = {};
  if (previous) {
    const pct = Math.round(((month - previous) / previous) * 100);
    // Spending less is the good direction.
    delta =
      pct === 0
        ? { detail: copy.deltaFlat, detailTone: 'neutral' }
        : pct < 0
          ? { detail: fill(copy.deltaDown, { pct: Math.abs(pct) }), detailIcon: 'TrendingDown', detailTone: 'success' }
          : { detail: fill(copy.deltaUp, { pct }), detailIcon: 'TrendingUp', detailTone: 'danger' };
  }

  const tiles: Tile[] = [
    { id: 'month', label: copy.tiles.month, value: formatCurrency(month), ...delta },
    { id: 'today', label: copy.tiles.today, value: formatCurrency(totalOf(today)), detail: plural(today.length, copy.todayDetail) },
    {
      id: 'pending',
      label: copy.tiles.pending,
      value: formatCurrency(totalOf(pending)),
      detail: plural(pending.length, copy.pendingDetail),
      detailTone: pending.length ? 'warning' : 'neutral',
    },
  ];

  return (
    <ul className="expense-tiles">
      {tiles.map((tile) => (
        <li key={tile.id} className="expense-tile">
          <span className="expense-tile__label">{tile.label}</span>
          <span className="expense-tile__value">{tile.value}</span>
          {tile.detail && (
            <span className={cn('expense-tile__detail', tile.detailTone && `tone-${tile.detailTone}`)}>
              {tile.detailIcon && <NavigationIcon name={tile.detailIcon} size={14} strokeWidth={2.2} />}
              {tile.detail}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
