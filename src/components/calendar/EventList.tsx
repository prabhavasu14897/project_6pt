import type { CalendarEvent } from '@/types/tasks';
import { formatAgendaDay } from '@/lib/utils';
import { EmptyState } from '@/components/ui/EmptyState';
import { EventCard } from './EventCard';

export interface EventGroup {
  day: string;
  events: CalendarEvent[];
}

export interface EventListProps {
  groups: EventGroup[];
  emptyTitle: string;
  emptyHint?: string;
}

/** Events grouped under day headings ("Today, Tue 8 Oct"). */
export function EventList({ groups, emptyTitle, emptyHint }: EventListProps) {
  if (groups.every((g) => g.events.length === 0)) {
    return <EmptyState icon="CalendarDays" title={emptyTitle} hint={emptyHint} compact />;
  }
  return (
    <div className="event-groups">
      {groups.map((group) => (
        <section key={group.day} className="event-group" aria-label={formatAgendaDay(group.day)}>
          <h3 className="event-group__title">{formatAgendaDay(group.day)}</h3>
          <ul className="event-group__list">
            {group.events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
