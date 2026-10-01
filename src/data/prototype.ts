/**
 * In-session prototype state. Seeded from the product config, mutated by user actions, never
 * persisted. Selectors derive every count and total so the UI stays truthful as testers act.
 */
import { useSyncExternalStore } from 'react';
import { productConfig } from '@/config';
import type { StatSource } from '@/types/dashboard';
import type { Expense, ExpenseCategory } from '@/types/expenses';
import type { ActivityItem, FamilyMember } from '@/types/family';
import type { MaintenanceItem } from '@/types/maintenance';
import type { Room } from '@/types/rooms';
import type { ShoppingItem } from '@/types/shopping';
import type { CalendarEvent, Task, TaskGroup, TaskPriority } from '@/types/tasks';
import { addMonths, daysFromToday, fill, formatCurrency, today } from '@/lib/utils';

/** Who is using the prototype and how it displays. Survives a demo-data reset. */
export interface SessionState {
  userId: string;
  textSize: 'default' | 'large';
  reduceMotion: boolean;
}

export interface HouseholdState {
  tasks: Task[];
  events: CalendarEvent[];
  shopping: ShoppingItem[];
  expenses: Expense[];
  maintenance: MaintenanceItem[];
  activity: ActivityItem[];
  session: SessionState;
}

function seedSession(): SessionState {
  return { userId: productConfig.clock.currentUserId, textSize: 'default', reduceMotion: false };
}

function seed(session: SessionState = seedSession()): HouseholdState {
  const c = productConfig;
  return {
    session,
    tasks: c.tasks.map((t) => ({ ...t })),
    events: c.events.map((e) => ({ ...e })),
    shopping: c.shopping.map((s) => ({ ...s })),
    expenses: c.expenses.items.map((e) => ({ ...e })),
    maintenance: c.maintenance.map((m) => ({ ...m, history: [...m.history] })),
    activity: c.activity.map((a) => ({ ...a })),
  };
}

let state: HouseholdState = seed();
const listeners = new Set<() => void>();

function setState(next: HouseholdState): void {
  state = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useHousehold(): HouseholdState {
  return useSyncExternalStore(subscribe, () => state, () => state);
}

/* ---------- session ---------- */

/** The member the prototype is currently being used as. */
export function currentUserId(): string {
  return state.session.userId;
}

export function setSession(patch: Partial<SessionState>): void {
  setState({ ...state, session: { ...state.session, ...patch } });
}

/** Restores every household record to its configured starting point; keeps the session. */
export function resetHousehold(): void {
  setState(seed(state.session));
}

/* ---------- actions ---------- */

let activityCounter = 0;

/** Logs the current member's action on completion and withdraws it again on undo. */
function withActivity(key: string, done: boolean, action: string): ActivityItem[] {
  const prefix = `activity-${key}`;
  if (!done) return state.activity.filter((a) => !a.id.startsWith(prefix));
  return [
    { id: `${prefix}-${++activityCounter}`, memberId: currentUserId(), action, at: productConfig.clock.now },
    ...state.activity,
  ];
}

export function setTaskCompleted(taskId: string, completed: boolean): void {
  const task = state.tasks.find((t) => t.id === taskId);
  if (!task || task.completed === completed) return;
  setState({
    ...state,
    tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, completed } : t)),
    activity: withActivity(`task-${taskId}`, completed, fill(productConfig.ui.completedTaskActivity, { title: task.title })),
  });
}

export function setShoppingCompleted(itemId: string, completed: boolean): void {
  const item = state.shopping.find((i) => i.id === itemId);
  if (!item || item.completed === completed) return;
  setState({
    ...state,
    shopping: state.shopping.map((i) => (i.id === itemId ? { ...i, completed } : i)),
    activity: withActivity(`shopping-${itemId}`, completed, fill(productConfig.ui.boughtItemActivity, { name: item.name })),
  });
}

/**
 * Logs a service done today. Recurring items reschedule from today by their interval;
 * one-off jobs complete. Returns the previous item so the caller can offer an undo.
 */
export function serviceMaintenance(itemId: string): MaintenanceItem | undefined {
  const item = state.maintenance.find((m) => m.id === itemId);
  if (!item || item.completed) return undefined;
  const day = today();
  const record = { date: day, note: productConfig.maintenanceScreen.serviceNote, byId: currentUserId() };
  const next: MaintenanceItem = item.intervalMonths
    ? { ...item, due: addMonths(day, item.intervalMonths), history: [record, ...item.history] }
    : { ...item, completed: true, history: [record, ...item.history] };
  setState({
    ...state,
    maintenance: state.maintenance.map((m) => (m.id === itemId ? next : m)),
    activity: withActivity(`maintenance-${itemId}`, true, fill(productConfig.ui.servicedActivity, { title: item.title })),
  });
  return item;
}

/** Puts an item back exactly as it was (undo for `serviceMaintenance`). */
export function restoreMaintenance(previous: MaintenanceItem): void {
  setState({
    ...state,
    maintenance: state.maintenance.map((m) => (m.id === previous.id ? previous : m)),
    activity: withActivity(`maintenance-${previous.id}`, false, ''),
  });
}

let maintenanceCounter = 0;

export function addMaintenance(item: Omit<MaintenanceItem, 'id' | 'history' | 'completed'>): MaintenanceItem {
  const created: MaintenanceItem = { ...item, id: `maintenance-new-${++maintenanceCounter}`, history: [], completed: false };
  setState({
    ...state,
    maintenance: [...state.maintenance, created],
    activity: withActivity(`newmaint-${created.id}`, true, fill(productConfig.maintenanceScreen.addedActivity, { title: created.title })),
  });
  return created;
}

let expenseCounter = 0;

/** Logs an expense (paid now or a bill due later) and records it in the activity feed. */
export function addExpense(expense: Omit<Expense, 'id'>): Expense {
  const created: Expense = { ...expense, id: `exp-new-${++expenseCounter}` };
  setState({
    ...state,
    expenses: [...state.expenses, created],
    activity: withActivity(`newexp-${created.id}`, true, fill(productConfig.expensesScreen.addedActivity, { title: created.title })),
  });
  return created;
}

/** Pays a pending bill today, or reverts a payment back to its original due date. */
export function setExpensePaid(expenseId: string, paid: boolean, dueDate?: string): void {
  const expense = state.expenses.find((e) => e.id === expenseId);
  if (!expense || (expense.status === 'paid') === paid) return;
  setState({
    ...state,
    expenses: state.expenses.map((e) =>
      e.id === expenseId ? { ...e, status: paid ? 'paid' : 'pending', date: paid ? today() : dueDate ?? e.date } : e,
    ),
    activity: withActivity(`payexp-${expenseId}`, paid, fill(productConfig.expensesScreen.paidActivity, { title: expense.title })),
  });
}

let shoppingCounter = 0;

/** Adds a shopping item from the current member and logs it to the activity feed. */
export function addShoppingItem(item: Pick<ShoppingItem, 'name' | 'quantity' | 'category'>): ShoppingItem {
  const created: ShoppingItem = {
    ...item,
    id: `item-new-${++shoppingCounter}`,
    addedById: currentUserId(),
    addedOn: today(),
    completed: false,
  };
  setState({
    ...state,
    shopping: [...state.shopping, created],
    activity: withActivity(`newitem-${created.id}`, true, fill(productConfig.shoppingScreen.addedActivity, { name: created.name })),
  });
  return created;
}

/** Removes every bought item and returns them so the caller can offer an undo. */
export function clearBoughtShopping(): ShoppingItem[] {
  const removed = state.shopping.filter((i) => i.completed);
  if (removed.length) setState({ ...state, shopping: state.shopping.filter((i) => !i.completed) });
  return removed;
}

export function restoreShopping(items: ShoppingItem[]): void {
  const present = new Set(state.shopping.map((i) => i.id));
  setState({ ...state, shopping: [...state.shopping, ...items.filter((i) => !present.has(i.id))] });
}

/** Distinct shopping categories, in first-seen order. */
export function shoppingCategories(items: ShoppingItem[]): string[] {
  return [...new Set(items.map((i) => i.category))];
}

let taskCounter = 0;

/** Adds a task created in this session and logs it to the activity feed. */
export function addTask(task: Omit<Task, 'id' | 'completed'>): Task {
  const created: Task = { ...task, id: `task-new-${++taskCounter}`, completed: false };
  setState({
    ...state,
    tasks: [...state.tasks, created],
    activity: withActivity(`newtask-${created.id}`, true, fill(productConfig.tasksScreen.addedActivity, { title: created.title })),
  });
  return created;
}

let eventCounter = 0;

/** Adds an event created in this session and logs it to the activity feed. */
export function addEvent(event: Omit<CalendarEvent, 'id'>): CalendarEvent {
  const created: CalendarEvent = { ...event, id: `event-new-${++eventCounter}` };
  setState({
    ...state,
    events: [...state.events, created],
    activity: withActivity(`event-${created.id}`, true, fill(productConfig.calendar.addedActivity, { title: created.title })),
  });
  return created;
}

/* ---------- lookups ---------- */

const priorityRank: Record<TaskPriority, number> = { high: 0, medium: 1, low: 2 };

export function memberById(id: string): FamilyMember | undefined {
  return productConfig.family.find((m) => m.id === id);
}

/** Display name for a member or the whole household. */
export function memberName(id: string): string {
  if (id === productConfig.clock.householdId) return productConfig.clock.householdLabel;
  return memberById(id)?.name ?? '';
}

export function roomById(id: string | undefined): Room | undefined {
  return id ? productConfig.rooms.find((r) => r.id === id) : undefined;
}

export function currentUser(): FamilyMember | undefined {
  return memberById(currentUserId());
}

/* ---------- selectors ---------- */

/** Open tasks, soonest first, then by priority. */
export function pendingTasks(s: HouseholdState): Task[] {
  return s.tasks
    .filter((t) => !t.completed)
    .sort((a, b) => a.due.localeCompare(b.due) || priorityRank[a.priority] - priorityRank[b.priority]);
}

/** Which due-date bucket an open task falls in. */
export function taskGroup(task: Task): TaskGroup {
  const delta = daysFromToday(task.due);
  if (delta < 0) return 'overdue';
  if (delta === 0) return 'today';
  if (delta === 1) return 'tomorrow';
  return 'upcoming';
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  overdue: number;
}

export function taskStats(tasks: Task[]): TaskStats {
  const completed = tasks.filter((t) => t.completed).length;
  return {
    total: tasks.length,
    completed,
    pending: tasks.length - completed,
    overdue: tasks.filter((t) => !t.completed && daysFromToday(t.due) < 0).length,
  };
}

/** Distinct task categories, in first-seen order. */
export function taskCategories(tasks: Task[]): string[] {
  return [...new Set(tasks.map((t) => t.category))];
}

/** Events on `day` (multi-day events included), all-day first, then by time. */
export function eventsOn(day: string, events: CalendarEvent[]): CalendarEvent[] {
  return events
    .filter((e) => e.date === day || (e.endDate !== undefined && e.date <= day && e.endDate >= day))
    .sort((a, b) => (a.time ?? '').localeCompare(b.time ?? ''));
}

export function todaysEvents(s: HouseholdState): CalendarEvent[] {
  return eventsOn(today(), s.events);
}

/** Chart-palette slot for an event's owner. */
export function memberColorIndex(memberId: string): number {
  if (memberId === productConfig.clock.householdId) return productConfig.calendar.householdColorIndex;
  return memberById(memberId)?.colorIndex ?? 0;
}

export function openShoppingItems(s: HouseholdState): ShoppingItem[] {
  return s.shopping.filter((i) => !i.completed);
}

/** Paid spending in the clock's current month. */
export function monthSpent(s: HouseholdState): number {
  return sum(paidThisMonth(s));
}

function sum(expenses: Expense[]): number {
  return expenses.reduce((total, e) => total + e.amount, 0);
}

/** Paid expenses in the current month, newest first. */
export function paidThisMonth(s: HouseholdState): Expense[] {
  const month = today().slice(0, 7);
  return s.expenses
    .filter((e) => e.status === 'paid' && e.date.startsWith(month))
    .sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
}

export function pendingBills(s: HouseholdState): Expense[] {
  return s.expenses.filter((e) => e.status === 'pending').sort((a, b) => a.date.localeCompare(b.date));
}

export function spentToday(s: HouseholdState): Expense[] {
  return s.expenses.filter((e) => e.status === 'paid' && e.date === today());
}

export function totalOf(expenses: Expense[]): number {
  return sum(expenses);
}

/** This month's paid total per configured category, in configured (donut) order. */
export function categoryTotals(s: HouseholdState): { category: ExpenseCategory; amount: number }[] {
  const paid = paidThisMonth(s);
  return productConfig.expenses.categories.map((category) => ({
    category,
    amount: sum(paid.filter((e) => e.categoryId === category.id)),
  }));
}

/** Configured past months plus the live current month. */
export function monthlyTotals(s: HouseholdState): { month: string; amount: number; current: boolean }[] {
  const current = today().slice(0, 7);
  return [
    ...productConfig.expenses.history.map((h) => ({ ...h, current: false })),
    { month: current, amount: monthSpent(s), current: true },
  ];
}

export function expenseCategory(id: string): ExpenseCategory | undefined {
  return productConfig.expenses.categories.find((c) => c.id === id);
}

/** Open maintenance that is overdue or due within the configured window. */
export function maintenanceDueSoon(s: HouseholdState): MaintenanceItem[] {
  return s.maintenance
    .filter((m) => !m.completed && daysFromToday(m.due) <= productConfig.clock.dueSoonDays)
    .sort((a, b) => a.due.localeCompare(b.due));
}

export function recentActivity(s: HouseholdState): ActivityItem[] {
  // Newest first; activity added this session comes first among equal timestamps.
  return s.activity
    .map((item, index) => ({ item, index, time: new Date(item.at).getTime() }))
    .sort((a, b) => b.time - a.time || a.index - b.index)
    .map(({ item }) => item);
}

/** Rooms with open maintenance that is already overdue. */
export function roomsNeedingAttention(s: HouseholdState): Set<string> {
  return new Set(s.maintenance.filter((m) => !m.completed && daysFromToday(m.due) < 0).map((m) => m.roomId));
}

/** Rooms that need attention right now: configured as alerting, or with overdue maintenance. */
export function alertRoomIds(s: HouseholdState): Set<string> {
  const overdue = roomsNeedingAttention(s);
  return new Set(productConfig.rooms.filter((r) => r.status === 'alert' || overdue.has(r.id)).map((r) => r.id));
}

export interface RoomSummary {
  tasks: Task[];
  shopping: ShoppingItem[];
  /** Open maintenance in the room, soonest first. */
  maintenance: MaintenanceItem[];
  /** Open maintenance that is overdue or due within the configured window. */
  maintenanceDue: MaintenanceItem[];
}

export function roomSummary(roomId: string, s: HouseholdState): RoomSummary {
  const maintenance = s.maintenance.filter((m) => m.roomId === roomId && !m.completed).sort((a, b) => a.due.localeCompare(b.due));
  return {
    tasks: pendingTasks(s).filter((t) => t.roomId === roomId),
    shopping: openShoppingItems(s).filter((i) => i.roomId === roomId),
    maintenance,
    maintenanceDue: maintenance.filter((m) => daysFromToday(m.due) <= productConfig.clock.dueSoonDays),
  };
}

export function statValue(source: StatSource, s: HouseholdState): string {
  switch (source) {
    case 'events.today':
      return String(todaysEvents(s).length);
    case 'tasks.pending':
      return String(pendingTasks(s).length);
    case 'shopping.open':
      return String(openShoppingItems(s).length);
    case 'expenses.month':
      return formatCurrency(monthSpent(s));
    case 'maintenance.dueSoon':
      return String(maintenanceDueSoon(s).length);
  }
}
