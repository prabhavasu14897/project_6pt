import type { CSSProperties } from 'react';
import { productConfig } from '@/config';
import { expenseCategory, memberById, setExpensePaid } from '@/data/prototype';
import type { Expense } from '@/types/expenses';
import { cn, fill, formatCurrency, formatDueStatus, formatRelativeDay } from '@/lib/utils';
import { chartColor } from '@/lib/theme';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { toast } from '@/components/ui/Toast';
import { NavigationIcon } from '@/components/navigation/NavigationIcon';

/** Swatch color for an expense category (`--swatch`). */
export function expenseSwatch(categoryId: string): CSSProperties {
  const index = expenseCategory(categoryId)?.colorIndex ?? 0;
  return { '--swatch': chartColor(index, productConfig.theme.colors.chart.length) } as CSSProperties;
}

export function ExpenseItem({ expense }: { expense: Expense }) {
  const { expensesScreen: copy, ui } = productConfig;
  const category = expenseCategory(expense.categoryId);
  const payer = memberById(expense.paidById);
  const pending = expense.status === 'pending';
  const due = formatDueStatus(expense.date);

  const markPaid = () => {
    const dueDate = expense.date;
    setExpensePaid(expense.id, true);
    toast({
      message: fill(copy.paid, { title: expense.title }),
      tone: 'success',
      action: { label: ui.undo, onAction: () => setExpensePaid(expense.id, false, dueDate) },
    });
  };

  return (
    <li className={cn('expense-row', pending && 'is-pending')} style={expenseSwatch(expense.categoryId)}>
      <span className="expense-row__icon" aria-hidden="true">
        <NavigationIcon name={category?.icon ?? 'Tag'} size={17} />
      </span>
      <span className="expense-row__body">
        <span className="expense-row__title">{expense.title}</span>
        <span className="expense-row__meta">
          {pending ? (
            <Badge variant="dot" tone={due.tone}>
              {due.label}
            </Badge>
          ) : (
            <>
              {formatRelativeDay(expense.date)}
              {payer && ` · ${payer.name}`}
            </>
          )}
          {category && <span className="visually-hidden">, {category.name}</span>}
        </span>
      </span>
      <span className="expense-row__amount">{formatCurrency(expense.amount)}</span>
      {pending && (
        <Button variant="secondary" size="sm" onClick={markPaid} aria-label={`${copy.markPaid}: ${expense.title}`}>
          {copy.markPaid}
        </Button>
      )}
    </li>
  );
}
