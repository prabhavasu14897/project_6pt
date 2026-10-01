import { productConfig } from '@/config';
import { restoreMaintenance, roomById, serviceMaintenance } from '@/data/prototype';
import type { MaintenanceItem as MaintenanceItemData } from '@/types/maintenance';
import { addMonths, cn, fill, formatDayLabel, formatDueStatus, plural, today } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { toast } from '@/components/ui/Toast';
import { NavigationIcon } from '@/components/navigation/NavigationIcon';

/** Logs a service with feedback; recurring items announce their next due date. Offers undo. */
export function markServiced(item: MaintenanceItemData): void {
  const { ui, maintenanceScreen: copy } = productConfig;
  const previous = serviceMaintenance(item.id);
  if (!previous) return;
  toast({
    message: item.intervalMonths
      ? fill(copy.servicedNext, { title: item.title, date: formatDayLabel(addMonths(today(), item.intervalMonths)) })
      : fill(ui.serviced, { title: item.title }),
    tone: 'success',
    action: { label: ui.undo, onAction: () => restoreMaintenance(previous) },
  });
}

export interface MaintenanceItemProps {
  item: MaintenanceItemData;
  /** Hide the room name when the list is already scoped to one room. */
  showRoom?: boolean;
  /** `row` for compact lists (room panel); `card` for the maintenance screen. */
  variant?: 'row' | 'card';
  selected?: boolean;
  onOpen?: (item: MaintenanceItemData) => void;
}

export function MaintenanceItem({ item, showRoom = true, variant = 'row', selected = false, onOpen }: MaintenanceItemProps) {
  const { ui, maintenanceScreen: copy } = productConfig;
  const due = formatDueStatus(item.due);
  const room = roomById(item.roomId);
  const done = (
    <Button variant="secondary" size="sm" onClick={() => markServiced(item)} aria-label={`${ui.markServiced}: ${item.title}`}>
      {ui.markServiced}
    </Button>
  );

  return (
    <li className={cn(variant === 'card' ? 'maintenance-card' : 'maintenance-row', selected && 'is-selected')}>
      <span className={`maintenance-row__icon tone-${due.tone}`}>
        <NavigationIcon name={item.icon} size={18} />
      </span>
      <span className="maintenance-row__body">
        {onOpen ? (
          <button type="button" className="maintenance-card__title-button" onClick={() => onOpen(item)} aria-pressed={selected}>
            <span className="maintenance-row__title">{item.title}</span>
          </button>
        ) : (
          <span className="maintenance-row__title">{item.title}</span>
        )}
        <span className="maintenance-row__meta">
          {showRoom && room && <span>{room.name}</span>}
          <Badge variant="dot" tone={due.tone}>
            {due.label}
          </Badge>
          {variant === 'card' && <span>{item.intervalMonths ? plural(item.intervalMonths, copy.every) : copy.oneOff}</span>}
        </span>
      </span>
      {done}
      {onOpen && (
        <button type="button" className="task-card__open" aria-label={fill(copy.openItem, { title: item.title })} onClick={() => onOpen(item)}>
          <NavigationIcon name="ChevronRight" size={18} />
        </button>
      )}
    </li>
  );
}
