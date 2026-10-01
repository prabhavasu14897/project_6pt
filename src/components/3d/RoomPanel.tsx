import { useState, type CSSProperties } from 'react';
import { productConfig } from '@/config';
import type { RoomSummary } from '@/data/prototype';
import type { Room, SceneAsset } from '@/types/rooms';
import { cn, fill, plural } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { Tabs } from '@/components/ui/Tabs';
import { NavigationIcon } from '@/components/navigation/NavigationIcon';
import { TaskItem } from '@/components/tasks/TaskItem';
import { ShoppingItem } from '@/components/shopping/ShoppingItem';
import { MaintenanceItem } from '@/components/maintenance/MaintenanceItem';

type TabId = 'tasks' | 'shopping' | 'maintenance';

/** Width / height of the close-up frame; must match `.room-view` in CSS. */
const VIEW_ASPECT = 16 / 9;

/**
 * Background position (%) that centers `focus` inside a frame showing the asset at `zoom`x the
 * frame's width. CSS percentages align the same fraction of image and frame, so solve for it.
 */
function centerOn(focus: number, zoom: number): number {
  if (zoom <= 1) return focus * 100;
  return Math.min(Math.max((0.5 - focus * zoom) / (1 - zoom), 0), 1) * 100;
}

export interface RoomPanelProps {
  room: Room;
  summary: RoomSummary;
  alert: boolean;
  asset: SceneAsset;
  /** Show the room title row (the bottom sheet supplies its own). */
  showHeader?: boolean;
  className?: string;
}

export function RoomPanel({ room, summary, alert, asset, showHeader = true, className }: RoomPanelProps) {
  const { digitalHouse: copy } = productConfig;
  const [tab, setTab] = useState<TabId>('tasks');

  const focus = room.focus ?? room.position;
  const zoom = copy.roomZoom;
  const imageAspect = asset.width / asset.height;
  // Vertical zoom relative to the frame: the image's rendered height over the frame's height.
  const zoomY = (zoom * VIEW_ASPECT) / imageAspect;
  const viewStyle: CSSProperties = {
    backgroundImage: `url("${asset.src}")`,
    backgroundSize: `${zoom * 100}% auto`,
    backgroundPosition: `${centerOn(focus.x / 100, zoom)}% ${centerOn(focus.y / 100, zoomY)}%`,
  };

  const counts = [
    plural(summary.tasks.length, copy.counts.tasks),
    plural(summary.shopping.length, copy.counts.shopping),
    plural(summary.maintenanceDue.length, copy.counts.maintenance),
  ];

  const tabs = [
    { id: 'tasks', label: copy.tabs.tasks, count: summary.tasks.length },
    { id: 'shopping', label: copy.tabs.shopping, count: summary.shopping.length },
    { id: 'maintenance', label: copy.tabs.maintenance, count: summary.maintenance.length },
  ];

  return (
    <div className={cn('room-panel', className)}>
      {showHeader && (
        <header className="room-panel__header">
          <h2 className="room-panel__title">{room.name}</h2>
          <Badge tone={alert ? 'danger' : 'success'}>{alert ? copy.serviceDue : copy.allClear}</Badge>
        </header>
      )}

      <div className="room-view" style={viewStyle} role="img" aria-label={fill(copy.roomViewLabel, { room: room.name })}>
        <span className={cn('room-view__chip', alert && 'is-alert')}>
          <NavigationIcon name={alert ? 'Alert' : room.icon} size={14} strokeWidth={2} />
          {room.name}
        </span>
      </div>

      <p className="room-panel__counts">{counts.join(' · ')}</p>

      <Tabs items={tabs} value={tab} onChange={(id) => setTab(id as TabId)} label={room.name} className="room-panel__tabs segmented">
        {tab === 'tasks' &&
          (summary.tasks.length ? (
            <ul className="task-rows">
              {summary.tasks.map((t) => (
                <TaskItem key={t.id} task={t} />
              ))}
            </ul>
          ) : (
            <EmptyState icon="CheckSquare" title={fill(copy.emptyTasks, { room: room.name })} compact />
          ))}
        {tab === 'shopping' &&
          (summary.shopping.length ? (
            <ul className="shopping-rows">
              {summary.shopping.map((i) => (
                <ShoppingItem key={i.id} item={i} />
              ))}
            </ul>
          ) : (
            <EmptyState icon="ShoppingCart" title={fill(copy.emptyShopping, { room: room.name })} compact />
          ))}
        {tab === 'maintenance' &&
          (summary.maintenance.length ? (
            <ul className="maintenance-rows">
              {summary.maintenance.map((m) => (
                <MaintenanceItem key={m.id} item={m} showRoom={false} />
              ))}
            </ul>
          ) : (
            <EmptyState icon="Wrench" title={fill(copy.emptyMaintenance, { room: room.name })} compact />
          ))}
      </Tabs>
    </div>
  );
}
