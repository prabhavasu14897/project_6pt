import { useId, useRef, useState, type FormEvent } from 'react';
import { productConfig } from '@/config';
import { currentUserId, addExpense, categoryTotals, monthlyTotals, paidThisMonth, pendingBills, useHousehold } from '@/data/prototype';
import type { Expense } from '@/types/expenses';
import { screenFor } from '@/lib/navigation';
import { cn, fill, formatCurrency, today } from '@/lib/utils';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { toast } from '@/components/ui/Toast';
import { ExpenseSummary } from '@/components/expenses/ExpenseSummary';
import { CategoryBreakdown, MonthlyTrend } from '@/components/expenses/ExpenseChart';
import { ExpenseList } from '@/components/expenses/ExpenseList';
import type { ScreenPageProps } from '@/app/layout';

export default function ExpensesPage({ screenId }: ScreenPageProps) {
  const { expensesScreen: copy } = productConfig;
  const screen = screenFor(screenId);
  const household = useHousehold();
  const [categoryId, setCategoryId] = useState<string>();
  const [adding, setAdding] = useState(false);

  const paid = paidThisMonth(household).filter((e) => !categoryId || e.categoryId === categoryId);

  return (
    <div className="expenses-page">
      <PageHeader
        title={screen?.title ?? ''}
        description={screen?.description}
        actions={
          screen?.primaryAction && (
            <Button icon="Plus" onClick={() => setAdding(true)}>
              {screen.primaryAction}
            </Button>
          )
        }
      />
      <div className="expenses-page__grid">
        <div className="expenses-page__tiles">
          <ExpenseSummary household={household} />
        </div>
        {/* Two independent columns on wide screens so a long list never stretches the charts. */}
        <div className="expenses-page__col expenses-page__col--charts">
          <div className="expenses-page__breakdown">
            <CategoryBreakdown totals={categoryTotals(household)} selectedId={categoryId} onSelect={setCategoryId} />
          </div>
          <div className="expenses-page__trend">
            <MonthlyTrend months={monthlyTotals(household)} />
          </div>
        </div>
        <div className="expenses-page__col expenses-page__col--lists">
          <div className="expenses-page__bills">
            <ExpenseList title={copy.billsTitle} expenses={pendingBills(household)} emptyText={copy.billsEmpty} />
          </div>
          <div className="expenses-page__transactions">
            <ExpenseList
              title={copy.transactionsTitle}
              expenses={paid}
              categoryId={categoryId}
              onClearFilter={() => setCategoryId(undefined)}
              emptyText={copy.emptyTransactions}
            />
          </div>
        </div>
      </div>
      <AddExpenseModal open={adding} onClose={() => setAdding(false)} />
    </div>
  );
}

function AddExpenseModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { expensesScreen: copy, expenses, family } = productConfig;
  const formId = useId();
  const nameRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<{ name?: boolean; amount?: boolean }>({});

  const close = () => {
    setErrors({});
    onClose();
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = String(data.get('title') ?? '').trim();
    const amount = Math.round(Number(String(data.get('amount') ?? '').replace(/[^\d.]/g, '')));
    const next = { name: !title, amount: !(amount > 0) };
    if (next.name || next.amount) {
      setErrors(next);
      (next.name ? nameRef : amountRef).current?.focus();
      return;
    }
    const status = String(data.get('status') ?? 'paid') as Expense['status'];
    addExpense({
      title,
      amount,
      categoryId: String(data.get('category') ?? expenses.categories[0]?.id ?? ''),
      date: String(data.get('date') || today()),
      paidById: String(data.get('paidBy') ?? currentUserId()),
      status,
    });
    toast({ message: fill(copy.added, { title, amount: formatCurrency(amount) }), tone: 'success' });
    event.currentTarget.reset();
    close();
  };

  const errorId = (field: string) => `${formId}-${field}-error`;

  return (
    <Modal
      open={open}
      onClose={close}
      title={copy.form.title}
      description={copy.form.description}
      footer={
        <>
          <Button variant="ghost" onClick={close}>
            {copy.form.cancel}
          </Button>
          <Button type="submit" form={formId} icon="Plus">
            {copy.form.submit}
          </Button>
        </>
      }
    >
      <form id={formId} key={String(open)} className="form" onSubmit={submit} noValidate>
        <div className="form__row">
          <label className="field">
            <span className="field__label">{copy.form.name}</span>
            <input
              ref={nameRef}
              name="title"
              className={cn('input', errors.name && 'is-invalid')}
              placeholder={copy.form.namePlaceholder}
              autoComplete="off"
              aria-invalid={errors.name || undefined}
              aria-describedby={errors.name ? errorId('name') : undefined}
              onInput={() => errors.name && setErrors((e) => ({ ...e, name: false }))}
            />
            {errors.name && (
              <span id={errorId('name')} className="field__error" role="alert">
                {copy.form.nameRequired}
              </span>
            )}
          </label>
          <label className="field">
            <span className="field__label">{copy.form.amount}</span>
            <span className="input-affix">
              <span className="input-affix__prefix" aria-hidden="true">
                {expenses.currency}
              </span>
              <input
                ref={amountRef}
                name="amount"
                inputMode="decimal"
                className={cn('input', 'input--numeric', errors.amount && 'is-invalid')}
                placeholder={copy.form.amountPlaceholder}
                autoComplete="off"
                aria-invalid={errors.amount || undefined}
                aria-describedby={errors.amount ? errorId('amount') : undefined}
                onInput={() => errors.amount && setErrors((e) => ({ ...e, amount: false }))}
              />
            </span>
            {errors.amount && (
              <span id={errorId('amount')} className="field__error" role="alert">
                {copy.form.amountRequired}
              </span>
            )}
          </label>
        </div>
        <div className="form__row">
          <label className="field">
            <span className="field__label">{copy.form.category}</span>
            <select name="category" className="input" defaultValue={expenses.categories[0]?.id}>
              {expenses.categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span className="field__label">{copy.form.date}</span>
            <input name="date" type="date" className="input" defaultValue={today()} />
          </label>
        </div>
        <div className="form__row">
          <label className="field">
            <span className="field__label">{copy.form.paidBy}</span>
            <select name="paidBy" className="input" defaultValue={currentUserId()}>
              {family.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </label>
          <fieldset className="field">
            <legend className="field__label">{copy.form.status}</legend>
            <div className="choice-row">
              <label className="choice tone-success">
                <input type="radio" name="status" value="paid" defaultChecked />
                {copy.form.statusPaid}
              </label>
              <label className="choice tone-warning">
                <input type="radio" name="status" value="pending" />
                {copy.form.statusPending}
              </label>
            </div>
          </fieldset>
        </div>
      </form>
    </Modal>
  );
}
