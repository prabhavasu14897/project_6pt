import type { IconName } from '@/components/navigation/NavigationIcon';
import type { PluralCopy } from './rooms';

export interface ServiceRecord {
  /** ISO date. */
  date: string;
  note: string;
  byId?: string;
}

export interface MaintenanceItem {
  id: string;
  title: string;
  roomId: string;
  icon: IconName;
  /** ISO date the next service is due. */
  due: string;
  /** Repeats this many months after each service; one-off jobs omit it and complete instead. */
  intervalMonths?: number;
  /** Newest first. */
  history: ServiceRecord[];
  completed: boolean;
}

export type MaintenanceTab = 'dueSoon' | 'upcoming' | 'history';

export interface MaintenanceConfig {
  tabs: Record<MaintenanceTab, string>;
  tabsLabel: string;
  summaryTitle: string;
  summary: { overdue: string; dueSoon: string; upcoming: string };
  detailTitle: string;
  detailEmpty: string;
  lastServiced: string;
  neverServiced: string;
  nextService: string;
  repeats: string;
  every: PluralCopy;
  oneOff: string;
  historyTitle: string;
  historyEmpty: string;
  serviceNote: string;
  emptyDueSoon: string;
  emptyDueSoonHint: string;
  emptyUpcoming: string;
  emptyHistory: string;
  openItem: string;
  form: {
    title: string;
    description: string;
    name: string;
    namePlaceholder: string;
    room: string;
    type: string;
    due: string;
    repeat: string;
    repeatNone: string;
    submit: string;
    cancel: string;
    nameRequired: string;
  };
  /** Icon choices offered when adding an item, with their labels. */
  types: { icon: IconName; label: string }[];
  /** Repeat choices in months. */
  repeatOptions: number[];
  added: string;
  addedActivity: string;
  servicedNext: string;
}
