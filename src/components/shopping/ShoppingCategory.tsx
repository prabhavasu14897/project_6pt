import type { CSSProperties } from 'react';
import { productConfig } from '@/config';
import type { ShoppingItem as ShoppingItemData } from '@/types/shopping';
import { fill } from '@/lib/utils';
import { chartColor } from '@/lib/theme';
import { ShoppingItem } from './ShoppingItem';

/** Swatch color for a category: configured slot, else its position in the list. */
export function categorySwatch(category: string, position: number): CSSProperties {
  const { shoppingScreen, theme } = productConfig;
  const index = shoppingScreen.categoryColors[category] ?? position;
  return { '--swatch': chartColor(index, theme.colors.chart.length) } as CSSProperties;
}

export interface ShoppingCategoryProps {
  name: string;
  position: number;
  items: ShoppingItemData[];
}

/** One category: items still needed first, bought items sink to the bottom. */
export function ShoppingCategory({ name, position, items }: ShoppingCategoryProps) {
  const { shoppingScreen: copy } = productConfig;
  const open = items.filter((i) => !i.completed);
  const sorted = [...open, ...items.filter((i) => i.completed)];
  return (
    <section className="shopping-category" style={categorySwatch(name, position)} aria-label={name}>
      <h2 className="shopping-category__title">
        <span className="shopping-category__swatch" aria-hidden="true" />
        {name}
        <span className="shopping-category__count">{open.length}</span>
      </h2>
      {items.length === 0 ? (
        <p className="shopping-category__empty">{fill(copy.emptyCategory, { category: name })}</p>
      ) : (
        <>
          <ul className="shopping-rows">
            {sorted.map((item) => (
              <ShoppingItem key={item.id} item={item} detailed />
            ))}
          </ul>
          {open.length === 0 && <p className="shopping-category__empty">{copy.allBought}</p>}
        </>
      )}
    </section>
  );
}
