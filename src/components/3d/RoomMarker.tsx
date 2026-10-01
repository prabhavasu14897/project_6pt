import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { productConfig } from '@/config';
import type { Room } from '@/types/rooms';
import { cn, fill } from '@/lib/utils';
import { NavigationIcon } from '@/components/navigation/NavigationIcon';

export interface RoomMarkerProps {
  room: Room;
  /** Secondary line, e.g. "2 tasks". */
  meta?: string;
  alert?: boolean;
  selected?: boolean;
  href?: string;
  onSelect?: (roomId: string) => void;
}

export function RoomMarker({ room, meta, alert = false, selected = false, href, onSelect }: RoomMarkerProps) {
  const { ui } = productConfig;
  const style = { '--x': `${room.position.x}%`, '--y': `${room.position.y}%` } as CSSProperties;
  const className = cn('room-marker', alert && 'is-alert', selected && 'is-selected', !href && !onSelect && 'is-static');
  const content = (
    <>
      <span className="room-marker__icon">
        <NavigationIcon name={alert ? 'Alert' : room.icon} size={14} strokeWidth={2} />
      </span>
      <span className="room-marker__text">
        <span className="room-marker__name">{room.name}</span>
        {meta && <span className="room-marker__meta">{meta}</span>}
        {alert && !meta && <span className="visually-hidden">, {ui.roomAlert}</span>}
      </span>
    </>
  );
  const label = fill(ui.roomOpen, { room: room.name });

  if (href) {
    return (
      <Link to={href} className={className} style={style} title={label} aria-current={selected || undefined}>
        {content}
      </Link>
    );
  }
  if (onSelect) {
    return (
      <button type="button" className={className} style={style} aria-pressed={selected} onClick={() => onSelect(room.id)}>
        {content}
      </button>
    );
  }
  return (
    <span className={className} style={style}>
      {content}
    </span>
  );
}
