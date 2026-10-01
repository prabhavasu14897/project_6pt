export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  avatar: string;
  /** Index into the theme's chart palette; colors this member's events. */
  colorIndex: number;
}

export type ProfileTab = 'tasks' | 'calendar' | 'expenses' | 'activity';

export interface FamilyScreenConfig {
  membersLabel: string;
  activityTitle: string;
  /** Days ahead counted as "upcoming" for events. */
  upcomingDays: number;
  counts: {
    tasks: { one: string; other: string };
    events: { one: string; other: string };
  };
  spent: string;
  profileTabs: Record<ProfileTab, string>;
  showProfile: string;
  you: string;
  empty: Record<ProfileTab, string>;
  openScreen: Record<Exclude<ProfileTab, 'activity'>, string>;
}

export interface ActivityItem {
  id: string;
  memberId: string;
  /** Sentence fragment after the member's name, e.g. "added Milk to Shopping". */
  action: string;
  /** ISO date-time. */
  at: string;
}
