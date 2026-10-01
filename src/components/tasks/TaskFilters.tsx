import { productConfig } from '@/config';
import type { TaskPriority } from '@/types/tasks';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { priorityTone } from './TaskItem';

export interface TaskFilterState {
  priorities: ReadonlySet<TaskPriority>;
  categories: ReadonlySet<string>;
}

export interface TaskFiltersProps {
  value: TaskFilterState;
  categories: string[];
  onChange: (next: TaskFilterState) => void;
  /** `card` for the side column; `strip` is a horizontally scrolling chip row for phones. */
  layout?: 'card' | 'strip';
}

const priorities: TaskPriority[] = ['high', 'medium', 'low'];

function toggle<T>(set: ReadonlySet<T>, item: T): Set<T> {
  const next = new Set(set);
  if (next.has(item)) next.delete(item);
  else next.add(item);
  return next;
}

export function TaskFilters({ value, categories, onChange, layout = 'card' }: TaskFiltersProps) {
  const { tasksScreen: copy, ui } = productConfig;
  const active = value.priorities.size + value.categories.size > 0;
  const clear = active && (
    <button type="button" className="chip-clear" onClick={() => onChange({ priorities: new Set(), categories: new Set() })}>
      {copy.clearFilters}
    </button>
  );

  const priorityChips = priorities.map((p) => (
    <button
      key={p}
      type="button"
      className={cn('chip', `tone-${priorityTone[p]}`, value.priorities.has(p) && 'is-selected')}
      aria-pressed={value.priorities.has(p)}
      onClick={() => onChange({ ...value, priorities: toggle(value.priorities, p) })}
    >
      <span className="chip__dot" aria-hidden="true" />
      {ui.priority[p]}
    </button>
  ));

  const categoryChips = categories.map((c) => (
    <button
      key={c}
      type="button"
      className={cn('chip', 'tone-neutral', value.categories.has(c) && 'is-selected')}
      aria-pressed={value.categories.has(c)}
      onClick={() => onChange({ ...value, categories: toggle(value.categories, c) })}
    >
      {c}
    </button>
  ));

  if (layout === 'strip') {
    return (
      <div className="filter-strip" role="group" aria-label={copy.filtersTitle}>
        {priorityChips}
        <span className="filter-strip__divider" aria-hidden="true" />
        {categoryChips}
        {clear}
      </div>
    );
  }

  return (
    <Card title={copy.filtersTitle} headerExtra={clear || undefined} className="task-filters">
      <fieldset className="filter-group">
        <legend className="filter-group__label">{copy.filterPriority}</legend>
        <div className="chips">{priorityChips}</div>
      </fieldset>
      <fieldset className="filter-group">
        <legend className="filter-group__label">{copy.filterCategory}</legend>
        <div className="chips">{categoryChips}</div>
      </fieldset>
    </Card>
  );
}
