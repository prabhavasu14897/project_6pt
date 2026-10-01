import { productConfig } from '@/config';
import { eventsOn } from '@/data/prototype';
import type { CalendarEvent, CalendarViewMode } from '@/types/tasks';
import { cn, fill, formatAgendaDay, formatDayLabel, monthGrid, parseDay, today, weekdayNames, weekDays } from '@/lib/utils';
import { EmptyState } from '@/components/ui/EmptyState';
import { EventCard, eventColorStyle } from './EventCard';
import { EventList } from './EventList';

export interface CalendarViewProps {
  mode: CalendarViewMode;
  /** The selected day; the visible period is derived from it. */
  anchor: string;
  events: CalendarEvent[];
  onSelectDay: (day: string) => void;
}

export function CalendarView({ mode, anchor, events, onSelectDay }: CalendarViewProps) {
  if (mode === 'month') return <MonthView anchor={anchor} events={events} onSelectDay={onSelectDay} />;
  if (mode === 'week') return <WeekView anchor={anchor} events={events} onSelectDay={onSelectDay} />;
  const { calendar: copy } = productConfig;
  return (
    <div className="calendar-day">
      <EventList groups={[{ day: anchor, events: eventsOn(anchor, events) }]} emptyTitle={copy.noEvents} emptyHint={copy.noEventsHint} />
    </div>
  );
}

type PeriodProps = Omit<CalendarViewProps, 'mode'>;

function MonthView({ anchor, events, onSelectDay }: PeriodProps) {
  const { calendar: copy } = productConfig;
  const days = monthGrid(anchor, copy.weekStartsOn);
  const month = anchor.slice(0, 7);
  const todayIso = today();

  return (
    <div className="calendar-month">
      <div className="calendar-month__weekdays" aria-hidden="true">
        {weekdayNames(copy.weekStartsOn).map((name) => (
          <span key={name} className="calendar-month__weekday">
            {name}
          </span>
        ))}
      </div>
      <div className="calendar-month__cells">
        {days.map((day) => {
          const dayEvents = eventsOn(day, events);
          const shown = dayEvents.slice(0, copy.monthCellLimit);
          const extra = dayEvents.length - shown.length;
          const label = `${formatAgendaDay(day)}${dayEvents.length ? `, ${dayEvents.map((e) => e.title).join(', ')}` : ''}`;
          return (
            <button
              key={day}
              type="button"
              aria-pressed={day === anchor}
              aria-label={label}
              className={cn(
                'month-cell',
                !day.startsWith(month) && 'is-outside',
                day === todayIso && 'is-today',
                day === anchor && 'is-selected',
              )}
              onClick={() => onSelectDay(day)}
            >
              <span className="month-cell__date">{parseDay(day).getDate()}</span>
              <span className="month-cell__events" aria-hidden="true">
                {shown.map((event) => (
                  <span
                    key={event.id}
                    className={cn(
                      'event-pill',
                      event.endDate && event.date < day && 'continues-before',
                      event.endDate && event.endDate > day && 'continues-after',
                    )}
                    style={eventColorStyle(event.memberId)}
                  >
                    <span className="event-pill__dot" />
                    <span className="event-pill__title">{event.title}</span>
                  </span>
                ))}
                {extra > 0 && <span className="month-cell__more">{fill(copy.moreEvents, { n: extra })}</span>}
              </span>
              {/* Compact cells (phones) show one dot per event instead of pills. */}
              <span className="month-cell__dots" aria-hidden="true">
                {dayEvents.slice(0, 3).map((event) => (
                  <span key={event.id} className="month-cell__dot" style={eventColorStyle(event.memberId)} />
                ))}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function WeekView({ anchor, events, onSelectDay }: PeriodProps) {
  const { calendar: copy } = productConfig;
  const todayIso = today();
  return (
    <div className="calendar-week">
      {weekDays(anchor, copy.weekStartsOn).map((day) => {
        const dayEvents = eventsOn(day, events);
        return (
          <section key={day} className={cn('week-day', day === todayIso && 'is-today', day === anchor && 'is-selected')}>
            <button type="button" className="week-day__header" aria-pressed={day === anchor} onClick={() => onSelectDay(day)}>
              {formatDayLabel(day)}
            </button>
            {dayEvents.length ? (
              <ul className="week-day__events">
                {dayEvents.map((event) => (
                  <EventCard key={event.id} event={event} compact />
                ))}
              </ul>
            ) : (
              <EmptyState icon="CalendarDays" title={copy.noEvents} compact className="week-day__empty" />
            )}
          </section>
        );
      })}
    </div>
  );
}
