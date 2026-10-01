import type { IconName } from '@/components/navigation/NavigationIcon';

/** Live values the dashboard can compute from household data. */
export type StatSource =
  | 'events.today'
  | 'tasks.pending'
  | 'shopping.open'
  | 'expenses.month'
  | 'maintenance.dueSoon';

export type Tone = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral';

export interface StatCardConfig {
  id: string;
  label: string;
  source: StatSource;
  /** Text after the value, e.g. "events", "pending", "this month". */
  unit: string;
  icon: IconName;
  tone: Tone;
  /** Navigation id the card links to. */
  target: string;
}

export interface DashboardSection {
  title: string;
  /** Navigation id the section's "view all" link opens. */
  target: string;
}

export interface DashboardConfig {
  greetings: { morning: string; afternoon: string; evening: string };
  subtitle: string;
  stats: StatCardConfig[];
  /** Max rows in each dashboard list. */
  listLimit: number;
  sections: {
    events: DashboardSection;
    tasks: DashboardSection;
    activity: DashboardSection;
  };
  /** Navigation id that scene markers open, with `?room=<id>`. */
  sceneTarget: string;
}
