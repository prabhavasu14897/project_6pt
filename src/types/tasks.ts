export type TaskPriority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  assigneeId: string;
  /** ISO date (yyyy-mm-dd). */
  due: string;
  priority: TaskPriority;
  category: string;
  roomId?: string;
  completed: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  /** ISO date (yyyy-mm-dd). */
  date: string;
  /** 24h "HH:mm"; omitted for all-day events. */
  time?: string;
  /** Multi-day events end on this ISO date. */
  endDate?: string;
  /** A member id, or the household id for whole-family events. */
  memberId: string;
  location?: string;
}

export type TaskTab = 'mine' | 'family' | 'completed';
export type TaskGroup = 'overdue' | 'today' | 'tomorrow' | 'upcoming';

export interface TasksConfig {
  tabs: Record<TaskTab, string>;
  tabsLabel: string;
  groups: Record<TaskGroup, string>;
  progressTitle: string;
  /** "{done}/{total}" */
  progressValue: string;
  progressCaption: string;
  legend: { completed: string; pending: string; overdue: string };
  filtersTitle: string;
  filterPriority: string;
  filterCategory: string;
  clearFilters: string;
  emptyMine: string;
  emptyFamily: string;
  emptyCompleted: string;
  emptyFiltered: string;
  emptyFilteredHint: string;
  openTask: string;
  detail: {
    assignee: string;
    due: string;
    priority: string;
    category: string;
    room: string;
    complete: string;
    reopen: string;
    completedState: string;
  };
  form: {
    title: string;
    description: string;
    name: string;
    namePlaceholder: string;
    assignee: string;
    due: string;
    priority: string;
    category: string;
    room: string;
    noRoom: string;
    submit: string;
    cancel: string;
    nameRequired: string;
  };
  added: string;
  addedActivity: string;
}

export type CalendarViewMode = 'month' | 'week' | 'day';

export interface CalendarConfig {
  views: Record<CalendarViewMode, string>;
  viewLabel: string;
  today: string;
  previous: string;
  next: string;
  upcomingTitle: string;
  /** How many days with events the upcoming list shows. */
  upcomingDays: number;
  membersTitle: string;
  membersHint: string;
  showMember: string;
  hideMember: string;
  /** 0 = Sunday. */
  weekStartsOn: 0 | 1;
  /** Event pills per month cell before collapsing into "+n more". */
  monthCellLimit: number;
  moreEvents: string;
  allDay: string;
  noEvents: string;
  noEventsHint: string;
  noUpcoming: string;
  /** Color index for whole-household events. */
  householdColorIndex: number;
  form: {
    title: string;
    description: string;
    name: string;
    namePlaceholder: string;
    date: string;
    time: string;
    member: string;
    location: string;
    locationPlaceholder: string;
    optional: string;
    submit: string;
    cancel: string;
    nameRequired: string;
  };
  added: string;
  addedActivity: string;
}
