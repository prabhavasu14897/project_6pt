import type { CSSProperties } from 'react';
import { productConfig } from '@/config';
import { memberById, memberColorIndex, memberName } from '@/data/prototype';
import type { CalendarEvent } from '@/types/tasks';
import { cn } from '@/lib/utils';
import { chartColor } from '@/lib/theme';
import { Avatar } from '@/components/ui/Avatar';
import { NavigationIcon } from '@/components/navigation/NavigationIcon';

/** Color custom property for an event's owner, consumed by event styles. */
export function eventColorStyle(memberId: string): CSSProperties {
  return { '--event-color': chartColor(memberColorIndex(memberId), productConfig.theme.colors.chart.length) } as CSSProperties;
}

export interface EventCardProps {
  event: CalendarEvent;
  /** Tighter layout for week columns. */
  compact?: boolean;
}

export function EventCard({ event, compact = false }: EventCardProps) {
  const member = memberById(event.memberId);
  const who = memberName(event.memberId);
  return (
    <li className={cn('event-card', compact && 'event-card--compact')} style={eventColorStyle(event.memberId)}>
      <time className={cn('event-card__time', !event.time && 'is-all-day')} dateTime={event.time ? `${event.date}T${event.time}` : event.date}>
        {event.time ?? productConfig.calendar.allDay}
      </time>
      <span className="event-card__marker" aria-hidden="true">
        {member ? <Avatar name={member.name} src={member.avatar} size={compact ? 22 : 30} decorative /> : <NavigationIcon name="Users" size={compact ? 12 : 15} />}
      </span>
      <span className="event-card__body">
        <span className="event-card__title">{event.title}</span>
        <span className="event-card__meta">{[who, event.location].filter(Boolean).join(' · ')}</span>
      </span>
    </li>
  );
}
