import { productConfig } from '@/config';
import { memberName, todaysEvents, useHousehold } from '@/data/prototype';
import { routeFor } from '@/lib/navigation';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { NavigationIcon } from '@/components/navigation/NavigationIcon';

export function TodayEvents() {
  const { dashboard, ui } = productConfig;
  const section = dashboard.sections.events;
  const events = todaysEvents(useHousehold()).slice(0, dashboard.listLimit);

  return (
    <Card title={section.title} action={{ label: ui.viewAll, to: routeFor(section.target), ariaLabel: `${ui.viewAll}: ${section.title}` }} className="dashboard-list">
      {events.length === 0 ? (
        <EmptyState icon="CalendarDays" title={ui.emptyEvents} hint={ui.emptyEventsHint} compact />
      ) : (
        <ol className="timeline">
          {events.map((event) => (
            <li key={event.id} className="timeline__item">
              <time className="timeline__time" dateTime={event.time ? `${event.date}T${event.time}` : event.date}>
                {event.time ?? '—'}
              </time>
              <span className="timeline__node" aria-hidden="true">
                <NavigationIcon name="MapPin" size={14} strokeWidth={2} />
              </span>
              <span className="timeline__body">
                <span className="timeline__title">{event.title}</span>
                <span className="timeline__meta">{[memberName(event.memberId), event.location].filter(Boolean).join(' · ')}</span>
              </span>
            </li>
          ))}
        </ol>
      )}
    </Card>
  );
}
