import type { IconName } from '@/components/navigation/NavigationIcon';
import type { PluralCopy } from './rooms';

export interface ExpenseCategory {
  id: string;
  name: string;
  /** Index into the theme's chart palette. Order in the list is the donut order. */
  colorIndex: number;
  icon: IconName;
}

export interface Expense {
  id: string;
  title: string;
  categoryId: string;
  /** Whole currency units. */
  amount: number;
  /** ISO date: when it was paid, or when a pending bill is due. */
  date: string;
  paidById: string;
  /** Pending bills are due but not yet paid; they are excluded from spent totals. */
  status: 'paid' | 'pending';
}

export interface ExpenseHistoryPoint {
  /** ISO month (yyyy-mm). */
  month: string;
  amount: number;
}

export interface ExpensesConfig {
  currency: string;
  categories: ExpenseCategory[];
  items: Expense[];
  /** Totals for months before the current one; the current month is derived from `items`. */
  history: ExpenseHistoryPoint[];
}

export interface ExpensesScreenConfig {
  tiles: { month: string; today: string; pending: string };
  /** "{pct}% less than last month" / "more" — chosen by sign. */
  deltaDown: string;
  deltaUp: string;
  deltaFlat: string;
  todayDetail: PluralCopy;
  pendingDetail: PluralCopy;
  breakdownTitle: string;
  breakdownCaption: string;
  breakdownHint: string;
  transactionsTitle: string;
  showAll: string;
  filteredBy: string;
  emptyTransactions: string;
  billsTitle: string;
  billsEmpty: string;
  markPaid: string;
  paid: string;
  paidActivity: string;
  trendTitle: string;
  trendCaption: string;
  trendTableCaption: string;
  form: {
    title: string;
    description: string;
    name: string;
    namePlaceholder: string;
    amount: string;
    amountPlaceholder: string;
    category: string;
    date: string;
    paidBy: string;
    status: string;
    statusPaid: string;
    statusPending: string;
    submit: string;
    cancel: string;
    nameRequired: string;
    amountRequired: string;
  };
  added: string;
  addedActivity: string;
}
