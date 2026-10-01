import { useState } from 'react';
import { Link } from 'react-router-dom';
import { productConfig } from '@/config';
import {
  currentUserId, eventsOn,
  paidThisMonth,
  pendingTasks,
  totalOf,
  type HouseholdState,
} from '@/data/prototype';
import type { FamilyMember, ProfileTab } from '@/types/family';
import type { CalendarEvent } from '@/types/tasks';
import { routeFor } from '@/lib/navigation';
import { addDays, cn, fill, formatCurrency, plural, today } from '@/lib/utils';
import { Avatar } from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Tabs } from '@/components/ui/Tabs';
import { eventColorStyle } from '@/components/calendar/EventCard';
import { EventList, type EventGroup } from '@/components/calendar/EventList';
import { ExpenseItem } from '@/components/expenses/ExpenseItem';
import { TaskItem } from '@/components/tasks/TaskItem';
import { FamilyActivity } from './FamilyActivity';

/** Everything the family screen shows about one member, derived from live household state. */
export function memberSummary(member: FamilyMember, household: HouseholdState) {
  const { familyScreen: copy } = productConfig;
  const tasks = pendingTasks(household).filter((t) => t.assigneeId === member.id);
  const mine = household.events.filter((e) => e.memberId === member.id);
  const upcoming: EventGroup[] = [];
  for (let i = 0; i < copy.upcomingDays; i++) {
    const day = addDays(today(), i);
    const events: CalendarEvent[] = eventsOn(day, mine);
    if (events.length) upcoming.push({ day, events });
  }
  const paid = paidThisMonth(household).filter((e) => e.paidById === member.id);
  const activity = household.activity.filter((a) => a.memberId === member.id);
  return { tasks, upcoming, eventCount: upcoming.reduce((n, g) => n + g.events.length, 0), paid, spent: totalOf(paid), activity };
}

export interface FamilyMemberCardProps {
  member: FamilyMember;
  household: HouseholdState;
  selected: boolean;
  onSelect: (memberId: string) => void;
}

export function FamilyMemberCard({ member, household, selected, onSelect }: FamilyMemberCardProps) {
  const { familyScreen: copy } = productConfig;
  const summary = memberSummary(member, household);
  return (
    <button
      type="button"
      className={cn('member-card', selected && 'is-selected')}
      style={eventColorStyle(member.id)}
      aria-pressed={selected}
      aria-label={fill(copy.showProfile, { name: member.name })}
      onClick={() => onSelect(member.id)}
    >
      <Avatar name={member.name} src={member.avatar} size={64} decorative />
      <span className="member-card__name">
        {member.name}
        {member.id === currentUserId() && <span className="member-card__you">{copy.you}</span>}
      </span>
      <span className="member-card__role">{member.relationship}</span>
      <span className="member-card__stats">
        <span>{plural(summary.tasks.length, copy.counts.tasks)}</span>
        <span>{plural(summary.eventCount, copy.counts.events)}</span>
      </span>
    </button>
  );
}

/** The selected member's tasks, week, spending and activity. */
export function MemberProfile({ member, household }: { member: FamilyMember; household: HouseholdState }) {
  const { familyScreen: copy } = productConfig;
  const [tab, setTab] = useState<ProfileTab>('tasks');
  const summary = memberSummary(member, household);
  const name = member.name;
  const tabs = [
    { id: 'tasks', label: copy.profileTabs.tasks, count: summary.tasks.length },
    { id: 'calendar', label: copy.profileTabs.calendar, count: summary.eventCount },
    { id: 'expenses', label: copy.profileTabs.expenses, count: summary.paid.length },
    { id: 'activity', label: copy.profileTabs.activity, count: summary.activity.length },
  ];
  const openLink = (target: 'tasks' | 'calendar' | 'expenses') => (
    <Link className="profile__open" to={routeFor(target)}>
      {copy.openScreen[target]}
    </Link>
  );

  return (
    <Card className="profile" style={eventColorStyle(member.id)} aria-label={member.name}>
      <header className="profile__header">
        <Avatar name={member.name} src={member.avatar} size={56} decorative />
        <span className="profile__identity">
          <span className="profile__name">{member.name}</span>
          <span className="profile__role">{member.relationship}</span>
        </span>
        {summary.spent > 0 && <span className="profile__spent">{fill(copy.spent, { amount: formatCurrency(summary.spent) })}</span>}
      </header>

      <Tabs items={tabs} value={tab} onChange={(id) => setTab(id as ProfileTab)} label={member.name} className="segmented profile__tabs">
        {tab === 'tasks' &&
          (summary.tasks.length ? (
            <>
              <ul className="task-rows">
                {summary.tasks.map((t) => (
                  <TaskItem key={t.id} task={t} showAssignee={false} />
                ))}
              </ul>
              {openLink('tasks')}
            </>
          ) : (
            <EmptyState icon="CheckSquare" title={fill(copy.empty.tasks, { name })} compact />
          ))}
        {tab === 'calendar' &&
          (summary.upcoming.length ? (
            <>
              <EventList groups={summary.upcoming} emptyTitle={fill(copy.empty.calendar, { name })} />
              {openLink('calendar')}
            </>
          ) : (
            <EmptyState icon="CalendarDays" title={fill(copy.empty.calendar, { name })} compact />
          ))}
        {tab === 'expenses' &&
          (summary.paid.length ? (
            <>
              <ul className="expense-rows">
                {summary.paid.map((e) => (
                  <ExpenseItem key={e.id} expense={e} />
                ))}
              </ul>
              {openLink('expenses')}
            </>
          ) : (
            <EmptyState icon="Wallet" title={fill(copy.empty.expenses, { name })} compact />
          ))}
        {tab === 'activity' &&
          (summary.activity.length ? (
            <FamilyActivity items={summary.activity} showMember={false} />
          ) : (
            <EmptyState icon="Users" title={fill(copy.empty.activity, { name })} compact />
          ))}
      </Tabs>
    </Card>
  );
}
