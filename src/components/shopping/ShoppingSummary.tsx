import { productConfig } from '@/config';
import type { ShoppingItem } from '@/types/shopping';
import { fill } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { categorySwatch } from './ShoppingCategory';

export interface ShoppingSummaryProps {
  items: ShoppingItem[];
  categories: string[];
}

export function ShoppingSummary({ items, categories }: ShoppingSummaryProps) {
  const { shoppingScreen: copy } = productConfig;
  const done = items.filter((i) => i.completed).length;
  const value = fill(copy.summaryValue, { done, total: items.length });
  return (
    <Card title={copy.summaryTitle} className="shopping-summary">
      <div className="shopping-summary__ring">
        <Progress variant="ring" tone="secondary" value={done} max={items.length} label={`${copy.summaryTitle}: ${value} ${copy.summaryCaption}`} size={132}>
          <span className="task-progress__value">{value}</span>
          <span className="task-progress__caption">{copy.summaryCaption}</span>
        </Progress>
      </div>
      <ul className="shopping-summary__rows">
        {categories.map((category, position) => {
          const inCategory = items.filter((i) => i.category === category);
          const bought = inCategory.filter((i) => i.completed).length;
          return (
            <li key={category} className="shopping-summary__row" style={categorySwatch(category, position)}>
              <span className="shopping-summary__label">
                <span className="shopping-category__swatch" aria-hidden="true" />
                {category}
              </span>
              <span className="shopping-summary__count">
                {inCategory.length - bought}
              </span>
              <span className="shopping-summary__bar" aria-hidden="true">
                <span style={{ transform: `scaleX(${inCategory.length ? bought / inCategory.length : 0})` }} />
              </span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
