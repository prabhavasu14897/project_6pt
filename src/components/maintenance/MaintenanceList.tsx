import { productConfig } from '@/config';
import { memberById, roomById } from '@/data/prototype';
import type { MaintenanceItem as MaintenanceItemData } from '@/types/maintenance';
import { formatShortDate } from '@/lib/utils';
import { EmptyState } from '@/components/ui/EmptyState';
import { NavigationIcon } from '@/components/navigation/NavigationIcon';
import { MaintenanceItem } from './MaintenanceItem';

export interface MaintenanceListProps {
  items: MaintenanceItemData[];
  selectedId?: string;
  onOpen: (item: MaintenanceItemData) => void;
  emptyTitle: string;
  emptyHint?: string;
}

export function MaintenanceList({ items, selectedId, onOpen, emptyTitle, emptyHint }: MaintenanceListProps) {
  if (items.length === 0) return <EmptyState icon="Wrench" title={emptyTitle} hint={emptyHint} className="task-list__empty" />;
  return (
    <ul className="maintenance-cards">
      {items.map((item) => (
        <MaintenanceItem key={item.id} item={item} variant="card" selected={item.id === selectedId} onOpen={onOpen} />
      ))}
    </ul>
  );
}

export interface ServiceHistoryListProps {
  items: MaintenanceItemData[];
  /** Show each record's item title and room (all-items feed). */
  showItem?: boolean;
  emptyTitle: string;
}

/** Service records, newest first. */
export function ServiceHistoryList({ items, showItem = true, emptyTitle }: ServiceHistoryListProps) {
  const records = items
    .flatMap((item) => item.history.map((record, index) => ({ item, record, key: `${item.id}-${index}-${record.date}` })))
    .sort((a, b) => b.record.date.localeCompare(a.record.date));
  if (records.length === 0) return <EmptyState icon="Wrench" title={emptyTitle} compact />;
  return (
    <ol className="service-history">
      {records.map(({ item, record, key }) => {
        const by = record.byId ? memberById(record.byId) : undefined;
        const room = roomById(item.roomId);
        return (
          <li key={key} className="service-history__item">
            <span className="service-history__node" aria-hidden="true">
              <NavigationIcon name={showItem ? item.icon : 'Check'} size={14} strokeWidth={2} />
            </span>
            <span className="service-history__body">
              <span className="service-history__title">{showItem ? item.title : record.note}</span>
              <span className="service-history__meta">
                {[showItem ? record.note : undefined, showItem ? room?.name : undefined, by?.name].filter(Boolean).join(' · ')}
              </span>
            </span>
            <time className="service-history__date" dateTime={record.date}>
              {formatShortDate(record.date)}
              {!record.date.startsWith(productConfig.clock.now.slice(0, 4)) && ` ${record.date.slice(0, 4)}`}
            </time>
          </li>
        );
      })}
    </ol>
  );
}
