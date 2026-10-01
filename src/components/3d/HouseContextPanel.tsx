import { productConfig } from '@/config';
import type { RoomSummary } from '@/data/prototype';
import type { Room } from '@/types/rooms';
import { cn, plural } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { NavigationIcon } from '@/components/navigation/NavigationIcon';

export interface HouseContextPanelProps {
  rooms: Room[];
  summaries: Readonly<Record<string, RoomSummary>>;
  alertRoomIds: ReadonlySet<string>;
  selectedRoomId?: string;
  onSelectRoom: (roomId: string) => void;
}

/** Every room at a glance; the same selection the scene markers drive. */
export function HouseContextPanel({ rooms, summaries, alertRoomIds, selectedRoomId, onSelectRoom }: HouseContextPanelProps) {
  const { digitalHouse: copy } = productConfig;
  return (
    <Card title={copy.roomsTitle} className="house-context">
      <ul className="room-tiles">
        {rooms.map((room) => {
          const alert = alertRoomIds.has(room.id);
          const tasks = summaries[room.id]?.tasks.length ?? 0;
          const selected = room.id === selectedRoomId;
          return (
            <li key={room.id}>
              <button
                type="button"
                className={cn('room-tile', selected && 'is-selected', alert && 'is-alert')}
                aria-pressed={selected}
                onClick={() => onSelectRoom(room.id)}
              >
                <span className="room-tile__icon">
                  <NavigationIcon name={room.icon} size={20} />
                </span>
                <span className="room-tile__name">{room.name}</span>
                <span className="room-tile__meta">
                  {alert && <NavigationIcon name="Alert" size={13} strokeWidth={2.2} />}
                  {alert ? copy.serviceDue : plural(tasks, copy.counts.tasks)}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
