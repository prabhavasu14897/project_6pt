import type { ReactNode } from 'react';
import { productConfig } from '@/config';
import { roomById } from '@/data/prototype';
import type { Tone } from '@/types/dashboard';
import type { MaintenanceItem } from '@/types/maintenance';
import { daysFromToday, formatAgendaDay, formatShortDate, plural } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { NavigationIcon } from '@/components/navigation/NavigationIcon';
import { ServiceHistoryList } from './MaintenanceList';
import { markServiced } from './MaintenanceItem';
import { Button } from '@/components/ui/Button';

/** Open items bucketed by urgency. */
export function MaintenanceSummary({ items }: { items: MaintenanceItem[] }) {
  const { maintenanceScreen: copy, clock } = productConfig;
  const open = items.filter((m) => !m.completed);
  const rows: { key: keyof typeof copy.summary; count: number; tone: Tone }[] = [
    { key: 'overdue', count: open.filter((m) => daysFromToday(m.due) < 0).length, tone: 'danger' },
    {
      key: 'dueSoon',
      count: open.filter((m) => daysFromToday(m.due) >= 0 && daysFromToday(m.due) <= clock.dueSoonDays).length,
      tone: 'warning',
    },
    { key: 'upcoming', count: open.filter((m) => daysFromToday(m.due) > clock.dueSoonDays).length, tone: 'success' },
  ];
  return (
    <Card title={copy.summaryTitle} className="health">
      <ul className="health__rows">
        {rows.map((row) => (
          <li key={row.key} className={`health__row tone-${row.tone}`}>
            <span className="health__count">{row.count}</span>
            <span className="health__label">{copy.summary[row.key]}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/**
 * The selected item's record: where it is, when it was last done, what is next.
 * `bare` drops the card frame when the detail already sits inside a drawer.
 */
export function MaintenanceDetail({ item, bare = false }: { item?: MaintenanceItem; bare?: boolean }) {
  const { maintenanceScreen: copy, ui } = productConfig;
  if (!item) {
    return (
      <Card title={copy.detailTitle} className="asset-detail">
        <p className="asset-detail__empty">{copy.detailEmpty}</p>
      </Card>
    );
  }
  const room = roomById(item.roomId);
  const last = item.history[0];
  const overdue = daysFromToday(item.due) < 0;
  const facts = [
    { label: copy.lastServiced, value: last ? formatShortDate(last.date) + (last.date.slice(0, 4) !== item.due.slice(0, 4) ? ` ${last.date.slice(0, 4)}` : '') : copy.neverServiced },
    { label: copy.nextService, value: item.completed ? '—' : formatAgendaDay(item.due) },
    { label: copy.repeats, value: item.intervalMonths ? plural(item.intervalMonths, copy.every) : copy.oneOff },
  ];
  return (
    <Frame bare={bare} title={copy.detailTitle}>
      <div className="asset-detail__hero">
        <span className={`asset-detail__icon tone-${overdue ? 'danger' : 'primary'}`}>
          <NavigationIcon name={item.icon} size={28} strokeWidth={1.6} />
        </span>
        <span className="asset-detail__name">
          <span className="asset-detail__title">{item.title}</span>
          {room && <span className="asset-detail__room">{room.name}</span>}
        </span>
        {overdue && <Badge tone="danger">{copy.summary.overdue}</Badge>}
      </div>
      <dl className="asset-detail__facts">
        {facts.map((f) => (
          <div key={f.label} className="asset-detail__fact">
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>
      {!item.completed && (
        <Button icon="Check" className="asset-detail__action" onClick={() => markServiced(item)}>
          {ui.markServiced}
        </Button>
      )}
      <h3 className="asset-detail__subtitle">{copy.historyTitle}</h3>
      <ServiceHistoryList items={[item]} showItem={false} emptyTitle={copy.historyEmpty} />
    </Frame>
  );
}

function Frame({ bare, title, children }: { bare: boolean; title: string; children: ReactNode }) {
  if (bare) return <div className="asset-detail">{children}</div>;
  return (
    <Card title={title} className="asset-detail">
      {children}
    </Card>
  );
}
