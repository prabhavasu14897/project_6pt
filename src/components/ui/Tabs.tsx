import { useId, useRef, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

export interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  label: string;
  /** Rendered as the active tab's panel. */
  children?: ReactNode;
  className?: string;
}

/** Segmented tabs with roving focus (arrow keys, Home, End). */
export function Tabs({ items, value, onChange, label, children, className }: TabsProps) {
  const baseId = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = items.length - 1;
    const next =
      event.key === 'ArrowRight' ? (index === last ? 0 : index + 1)
      : event.key === 'ArrowLeft' ? (index === 0 ? last : index - 1)
      : event.key === 'Home' ? 0
      : event.key === 'End' ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    const item = items[next];
    if (!item) return;
    onChange(item.id);
    refs.current[next]?.focus();
  };

  return (
    <div className={cn('tabs', className)}>
      <div role="tablist" aria-label={label} className="tabs__list">
        {items.map((item, index) => {
          const selected = item.id === value;
          return (
            <button
              key={item.id}
              ref={(el) => {
                refs.current[index] = el;
              }}
              role="tab"
              type="button"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={children ? `${baseId}-panel` : undefined}
              tabIndex={selected ? 0 : -1}
              className={cn('tabs__tab', selected && 'is-selected')}
              onClick={() => onChange(item.id)}
              onKeyDown={(e) => onKeyDown(e, index)}
            >
              {item.label}
              {item.count !== undefined && <span className="tabs__count">{item.count}</span>}
            </button>
          );
        })}
      </div>
      {children && (
        <div role="tabpanel" id={`${baseId}-panel`} aria-labelledby={`${baseId}-tab-${value}`} className="tabs__panel">
          {children}
        </div>
      )}
    </div>
  );
}
