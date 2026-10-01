import { productConfig } from '@/config';
import { expenseCategory } from '@/data/prototype';
import type { Expense } from '@/types/expenses';
import { fill } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { ExpenseItem } from './ExpenseItem';

export interface ExpenseListProps {
  title: string;
  expenses: Expense[];
  /** Category the list is filtered to, if any. */
  categoryId?: string;
  onClearFilter?: () => void;
  emptyText: string;
  className?: string;
}

export function ExpenseList({ title, expenses, categoryId, onClearFilter, emptyText, className }: ExpenseListProps) {
  const { expensesScreen: copy } = productConfig;
  const category = categoryId ? expenseCategory(categoryId) : undefined;
  return (
    <Card
      title={title}
      className={className}
      headerExtra={
        category && onClearFilter ? (
          <button type="button" className="chip-clear" onClick={onClearFilter}>
            {copy.showAll}
          </button>
        ) : undefined
      }
    >
      {category && <p className="expense-list__filter">{fill(copy.filteredBy, { category: category.name })}</p>}
      {expenses.length === 0 ? (
        <EmptyState icon="Wallet" title={emptyText} compact />
      ) : (
        <ul className="expense-rows">
          {expenses.map((e) => (
            <ExpenseItem key={e.id} expense={e} />
          ))}
        </ul>
      )}
    </Card>
  );
}
