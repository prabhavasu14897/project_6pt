import { productConfig } from '@/config';
import { memberById, setShoppingCompleted } from '@/data/prototype';
import type { ShoppingItem as ShoppingItemData } from '@/types/shopping';
import { cn, fill, formatRelativeDay } from '@/lib/utils';
import { Avatar } from '@/components/ui/Avatar';
import { toast } from '@/components/ui/Toast';
import { NavigationIcon } from '@/components/navigation/NavigationIcon';

export interface ShoppingItemProps {
  item: ShoppingItemData;
  /** Show who added it and when (full list); compact lists show only the avatar. */
  detailed?: boolean;
}

export function ShoppingItem({ item, detailed = false }: ShoppingItemProps) {
  const { ui, shoppingScreen } = productConfig;
  const addedBy = memberById(item.addedById);

  const toggle = () => {
    const next = !item.completed;
    setShoppingCompleted(item.id, next);
    if (next) {
      toast({
        message: fill(ui.itemBought, { name: item.name }),
        tone: 'success',
        action: { label: ui.undo, onAction: () => setShoppingCompleted(item.id, false) },
      });
    }
  };

  return (
    <li className={cn('shopping-row', detailed && 'shopping-row--detailed', item.completed && 'is-done')}>
      <button
        type="button"
        role="checkbox"
        aria-checked={item.completed}
        aria-label={fill(item.completed ? ui.markNotBought : ui.markBought, { name: item.name })}
        className="checkbox"
        onClick={toggle}
      >
        <NavigationIcon name="Check" size={14} strokeWidth={2.6} />
      </button>
      <span className="shopping-row__main">
        <span className="shopping-row__name">{item.name}</span>
        {detailed && addedBy && (
          <span className="shopping-row__meta">
            {fill(shoppingScreen.addedBy, { name: addedBy.name })} · {formatRelativeDay(item.addedOn)}
          </span>
        )}
      </span>
      <span className="shopping-row__qty">{item.quantity}</span>
      {addedBy && <Avatar name={addedBy.name} src={addedBy.avatar} size={24} decorative={detailed} />}
    </li>
  );
}
