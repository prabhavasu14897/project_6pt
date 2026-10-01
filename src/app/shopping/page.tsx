import { useRef, useState } from 'react';
import { productConfig } from '@/config';
import { clearBoughtShopping, restoreShopping, shoppingCategories, useHousehold } from '@/data/prototype';
import { screenFor } from '@/lib/navigation';
import { plural } from '@/lib/utils';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import { toast } from '@/components/ui/Toast';
import { ShoppingList } from '@/components/shopping/ShoppingList';
import { ShoppingSummary } from '@/components/shopping/ShoppingSummary';
import type { ScreenPageProps } from '@/app/layout';

const ALL = '__all__';

export default function ShoppingPage({ screenId }: ScreenPageProps) {
  const { shoppingScreen: copy, ui } = productConfig;
  const screen = screenFor(screenId);
  const { shopping } = useHousehold();
  const [tab, setTab] = useState(ALL);
  const inputRef = useRef<HTMLInputElement>(null);

  const categories = shoppingCategories(shopping);
  const active = tab === ALL || !categories.includes(tab) ? undefined : tab;
  const visible = active ? shopping.filter((i) => i.category === active) : shopping;
  const boughtCount = shopping.filter((i) => i.completed).length;
  const openCount = (category?: string) => shopping.filter((i) => !i.completed && (!category || i.category === category)).length;

  const tabs = [{ id: ALL, label: copy.all, count: openCount() }, ...categories.map((c) => ({ id: c, label: c, count: openCount(c) }))];

  const clearBought = () => {
    const removed = clearBoughtShopping();
    if (!removed.length) return;
    toast({
      message: plural(removed.length, copy.cleared),
      tone: 'neutral',
      action: { label: ui.undo, onAction: () => restoreShopping(removed) },
    });
  };

  return (
    <div className="shopping-page split-page">
      <PageHeader
        title={screen?.title ?? ''}
        description={screen?.description}
        actions={
          <>
            {boughtCount > 0 && (
              <Button variant="secondary" onClick={clearBought}>
                {copy.clearBought}
              </Button>
            )}
            {screen?.primaryAction && (
              <Button
                icon="Plus"
                onClick={() => {
                  inputRef.current?.focus();
                  inputRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
                }}
              >
                {screen.primaryAction}
              </Button>
            )}
          </>
        }
      />
      <div className="split-grid">
        <div className="split-main">
          <Tabs items={tabs} value={active ?? ALL} onChange={setTab} label={copy.tabsLabel} className="segmented page-tabs" />
          <ShoppingList ref={inputRef} items={visible} categories={categories} activeCategory={active} />
        </div>
        <aside className="split-aside">
          <ShoppingSummary items={shopping} categories={categories} />
        </aside>
      </div>
    </div>
  );
}
