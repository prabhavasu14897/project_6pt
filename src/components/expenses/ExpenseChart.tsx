import { useState } from 'react';
import { productConfig } from '@/config';
import type { ExpenseCategory } from '@/types/expenses';
import { cn, formatCompact, formatCurrency, formatMonthLong, formatMonthShort, niceCeiling } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { expenseSwatch } from './ExpenseItem';

/* ---------- category breakdown (donut + legend) ---------- */

export interface CategoryBreakdownProps {
  totals: { category: ExpenseCategory; amount: number }[];
  /** Category the transactions are filtered to. */
  selectedId?: string;
  onSelect: (categoryId: string | undefined) => void;
}

const SIZE = 196;
const STROKE = 26;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
/** Surface-colored gap between segments, in px along the ring. */
const GAP = 2;

export function CategoryBreakdown({ totals, selectedId, onSelect }: CategoryBreakdownProps) {
  const { expensesScreen: copy } = productConfig;
  const [hoverId, setHoverId] = useState<string>();
  const total = totals.reduce((sum, t) => sum + t.amount, 0);
  const focusId = hoverId ?? selectedId;
  const focused = totals.find((t) => t.category.id === focusId);

  let offset = 0;
  const segments = totals
    .filter((t) => t.amount > 0)
    .map((t) => {
      const length = (t.amount / total) * CIRCUMFERENCE;
      const segment = { ...t, length, offset };
      offset += length;
      return segment;
    });

  return (
    <Card title={copy.breakdownTitle} className="breakdown">
      <div className="breakdown__body">
        <div className="donut" style={{ width: SIZE, height: SIZE }} onMouseLeave={() => setHoverId(undefined)}>
          <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true">
            <g transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}>
              {segments.map((s) => (
                <circle
                  key={s.category.id}
                  className={cn('donut__segment', focusId && focusId !== s.category.id && 'is-dimmed')}
                  style={expenseSwatch(s.category.id)}
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={RADIUS}
                  fill="none"
                  strokeWidth={STROKE}
                  strokeDasharray={`${Math.max(s.length - GAP, 0.5)} ${CIRCUMFERENCE}`}
                  strokeDashoffset={-s.offset}
                  onMouseEnter={() => setHoverId(s.category.id)}
                  onClick={() => onSelect(selectedId === s.category.id ? undefined : s.category.id)}
                />
              ))}
            </g>
          </svg>
          <span className="donut__center">
            <span className="donut__value">{formatCurrency(focused ? focused.amount : total)}</span>
            <span className="donut__caption">{focused ? focused.category.name : copy.breakdownCaption}</span>
          </span>
        </div>

        <div className="breakdown__legend-wrap">
          <p className="breakdown__hint">{copy.breakdownHint}</p>
          <ul className="breakdown__legend">
            {totals.map((t) => {
              const pct = total ? Math.round((t.amount / total) * 100) : 0;
              const selected = selectedId === t.category.id;
              return (
                <li key={t.category.id}>
                  <button
                    type="button"
                    className={cn('legend-row', selected && 'is-selected', focusId && focusId !== t.category.id && 'is-dimmed')}
                    style={expenseSwatch(t.category.id)}
                    aria-pressed={selected}
                    onMouseEnter={() => setHoverId(t.category.id)}
                    onMouseLeave={() => setHoverId(undefined)}
                    onFocus={() => setHoverId(t.category.id)}
                    onBlur={() => setHoverId(undefined)}
                    onClick={() => onSelect(selected ? undefined : t.category.id)}
                  >
                    <span className="legend-row__swatch" aria-hidden="true" />
                    <span className="legend-row__name">{t.category.name}</span>
                    <span className="legend-row__pct">{pct}%</span>
                    <span className="legend-row__amount">{formatCurrency(t.amount)}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Card>
  );
}

/* ---------- monthly trend (single series, current month emphasized) ---------- */

export interface MonthlyTrendProps {
  months: { month: string; amount: number; current: boolean }[];
}

export function MonthlyTrend({ months }: MonthlyTrendProps) {
  const { expensesScreen: copy } = productConfig;
  const max = Math.max(...months.map((m) => m.amount), 0);
  // Three clean intervals: step from the nice ceiling of max/3.
  const step = niceCeiling(max / 3);
  const top = Math.max(step * Math.ceil(max / step), step);
  const ticks = Array.from({ length: Math.round(top / step) + 1 }, (_, i) => i * step).reverse();

  return (
    <Card title={copy.trendTitle} className="trend">
      <p className="trend__caption">{copy.trendCaption}</p>
      <div className="trend__plot">
        <div className="trend__axis" aria-hidden="true">
          {ticks.map((t) => (
            <span key={t} className="trend__tick">
              {formatCompact(t)}
            </span>
          ))}
        </div>
        <div className="trend__area">
          <div className="trend__grid" aria-hidden="true">
            {ticks.map((t) => (
              <span key={t} />
            ))}
          </div>
          <ol className="trend__bars">
            {months.map((m) => (
              <li key={m.month} className={cn('trend__col', m.current && 'is-current')}>
                <span
                  className="trend__bar"
                  style={{ height: `${(m.amount / top) * 100}%` }}
                  tabIndex={0}
                  aria-label={`${formatMonthLong(m.month)}: ${formatCurrency(m.amount)}`}
                >
                  {m.current && <span className="trend__label">{formatCurrency(m.amount)}</span>}
                  <span className="trend__tip" role="tooltip">
                    <span className="trend__tip-month">{formatMonthLong(m.month)}</span>
                    {formatCurrency(m.amount)}
                  </span>
                </span>
                <span className="trend__month" aria-hidden="true">
                  {formatMonthShort(m.month)}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <table className="visually-hidden">
        <caption>{copy.trendTableCaption}</caption>
        <tbody>
          {months.map((m) => (
            <tr key={m.month}>
              <th scope="row">{formatMonthLong(m.month)}</th>
              <td>{formatCurrency(m.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
