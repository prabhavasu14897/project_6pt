import type { DashboardConfig } from './dashboard';
import type { ExpensesConfig, ExpensesScreenConfig } from './expenses';
import type { ActivityItem, FamilyMember, FamilyScreenConfig } from './family';
import type { MaintenanceConfig, MaintenanceItem } from './maintenance';
import type { NavigationItem, ScreenConfig } from './navigation';
import type { DigitalHouseConfig, PluralCopy, Room, SceneAsset } from './rooms';
import type { ShoppingConfig, ShoppingItem } from './shopping';
import type { CalendarConfig, CalendarEvent, Task, TaskPriority, TasksConfig } from './tasks';

export interface ProductIdentity {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  logo: string;
}

export interface ThemeColors {
  background: string;
  /** Sidebar / chrome layer, one step off the background. */
  chrome: string;
  surface: string;
  surfaceElevated: string;
  surfaceStrong: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  borderStrong: string;
  success: string;
  warning: string;
  danger: string;
  /** Ambient light pooled behind the hero scene. */
  ambient: string;
  /** Categorical chart palette. */
  chart: string[];
}

export interface ThemeConfig {
  mode: 'dark' | 'light';
  colors: ThemeColors;
  typography: {
    /** CSS font-family stack for all UI text. */
    primary: string;
    /** CSS font-family stack for times, amounts and counts. */
    numeric: string;
  };
  radius: { small: string; medium: string; large: string; extraLarge: string; full: string };
  spacing: { page: string; section: string; card: string };
  shadows: { card: string; elevated: string; overlay: string };
  motion: { fast: string; base: string; slow: string; easing: string };
}

export interface LocaleConfig {
  /** BCP 47 locale for dates and numbers. */
  locale: string;
  currency: string;
}

/** Fixed clock so the prototype's relative dates ("Today", "2h ago") are stable in testing. */
export interface PrototypeClock {
  now: string;
  currentUserId: string;
  /** Id used by events that belong to the whole household. */
  householdId: string;
  householdLabel: string;
  /** Maintenance due within this many days counts as "due soon". */
  dueSoonDays: number;
}

/** Interface copy that is not tied to a single screen. */
export interface UiCopy {
  viewAll: string;
  more: string;
  close: string;
  today: string;
  tomorrow: string;
  yesterday: string;
  justNow: string;
  minutesAgo: string;
  hoursAgo: string;
  undo: string;
  /** "{amount} today" */
  spentToday: string;
  /** "{list} +{n}" */
  listAndMore: string;
  overdue: string;
  /** "in {n} days" */
  dueInDays: PluralCopy;
  markComplete: string;
  markIncomplete: string;
  taskCompleted: string;
  taskReopened: string;
  completedTaskActivity: string;
  markBought: string;
  markNotBought: string;
  itemBought: string;
  boughtItemActivity: string;
  markServiced: string;
  serviced: string;
  servicedActivity: string;
  dueToday: string;
  dueTomorrow: string;
  overdueBy: PluralCopy;
  emptyTasks: string;
  emptyTasksHint: string;
  emptyEvents: string;
  emptyEventsHint: string;
  emptyActivity: string;
  comingSoon: string;
  comingSoonHint: string;
  sceneLabel: string;
  roomOpen: string;
  roomAlert: string;
  priority: Record<TaskPriority, string>;
  skipToContent: string;
  mainNavigation: string;
  account: string;
}

export interface ProductConfig {
  product: ProductIdentity;
  theme: ThemeConfig;
  locale: LocaleConfig;
  clock: PrototypeClock;
  ui: UiCopy;
  navigation: NavigationItem[];
  settings: NavigationItem;
  screens: Record<string, ScreenConfig>;
  dashboard: DashboardConfig;
  digitalHouse: DigitalHouseConfig;
  calendar: CalendarConfig;
  tasksScreen: TasksConfig;
  shoppingScreen: ShoppingConfig;
  expensesScreen: ExpensesScreenConfig;
  maintenanceScreen: MaintenanceConfig;
  familyScreen: FamilyScreenConfig;
  family: FamilyMember[];
  rooms: Room[];
  tasks: Task[];
  events: CalendarEvent[];
  shopping: ShoppingItem[];
  expenses: ExpensesConfig;
  maintenance: MaintenanceItem[];
  activity: ActivityItem[];
  assets: {
    /** The one reusable hero scene, shared by every screen that shows it. */
    scene: SceneAsset;
  };
}
