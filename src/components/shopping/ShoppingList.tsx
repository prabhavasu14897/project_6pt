import { forwardRef, useId, useState, type FormEvent } from 'react';
import { productConfig } from '@/config';
import { addShoppingItem } from '@/data/prototype';
import type { ShoppingItem } from '@/types/shopping';
import { cn, fill } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { toast } from '@/components/ui/Toast';
import { ShoppingCategory } from './ShoppingCategory';

export interface ShoppingListProps {
  items: ShoppingItem[];
  /** All known categories (for grouping order, colors and the add form). */
  categories: string[];
  /** Category the current view is scoped to; new items default into it. */
  activeCategory?: string;
}

/** Quick-add row plus the list grouped by category. */
export const ShoppingList = forwardRef<HTMLInputElement, ShoppingListProps>(function ShoppingList(
  { items, categories, activeCategory },
  inputRef,
) {
  const { shoppingScreen: copy } = productConfig;
  const formId = useId();
  const [error, setError] = useState(false);
  const shown = activeCategory ? [activeCategory] : categories.filter((c) => items.some((i) => i.category === c));

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    if (!name) {
      setError(true);
      return;
    }
    const category = String(data.get('category') ?? activeCategory ?? categories[0] ?? '');
    addShoppingItem({ name, quantity: String(data.get('quantity') ?? '').trim() || copy.quickAdd.quantityPlaceholder, category });
    toast({ message: fill(copy.added, { name, category }), tone: 'success' });
    form.reset();
    setError(false);
    (form.elements.namedItem('name') as HTMLInputElement | null)?.focus();
  };

  return (
    <div className="shopping-list">
      <form className="quick-add card" onSubmit={submit} noValidate aria-label={copy.quickAdd.label}>
        <label className="quick-add__field quick-add__field--name">
          <span className="visually-hidden">{copy.quickAdd.name}</span>
          <input
            ref={inputRef}
            name="name"
            className={cn('input', error && 'is-invalid')}
            placeholder={copy.quickAdd.namePlaceholder}
            autoComplete="off"
            aria-invalid={error || undefined}
            aria-describedby={error ? `${formId}-error` : undefined}
            onInput={() => error && setError(false)}
          />
        </label>
        <label className="quick-add__field quick-add__field--qty">
          <span className="visually-hidden">{copy.quickAdd.quantity}</span>
          <input name="quantity" className="input" placeholder={copy.quickAdd.quantityPlaceholder} autoComplete="off" />
        </label>
        <label className="quick-add__field quick-add__field--category">
          <span className="visually-hidden">{copy.quickAdd.category}</span>
          <select name="category" className="input" key={activeCategory ?? 'all'} defaultValue={activeCategory ?? categories[0]}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <Button type="submit" icon="Plus" className="quick-add__submit">
          {copy.quickAdd.submit}
        </Button>
        {error && (
          <span id={`${formId}-error`} className="field__error quick-add__error" role="alert">
            {copy.quickAdd.nameRequired}
          </span>
        )}
      </form>

      {items.length === 0 && !activeCategory ? (
        <EmptyState icon="ShoppingCart" title={copy.emptyAll} hint={copy.emptyAllHint} className="task-list__empty" />
      ) : (
        <div className="shopping-categories">
          {shown.map((category) => (
            <ShoppingCategory
              key={category}
              name={category}
              position={categories.indexOf(category)}
              items={items.filter((i) => i.category === category)}
            />
          ))}
        </div>
      )}
    </div>
  );
});
