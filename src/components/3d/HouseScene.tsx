import type { CSSProperties } from 'react';
import type { Room, SceneAsset } from '@/types/rooms';
import { cn } from '@/lib/utils';
import { RoomMarker } from './RoomMarker';

export interface HouseSceneProps {
  /** The configured scene asset; the component makes no assumption about its subject. */
  asset: SceneAsset;
  rooms: Room[];
  label: string;
  selectedRoomId?: string;
  alertRoomIds?: ReadonlySet<string>;
  /** Per-room secondary line, keyed by room id. */
  roomMeta?: Readonly<Record<string, string>>;
  /** Markers navigate when this is given… */
  roomHref?: (roomId: string) => string;
  /** …or select in place when this is given. */
  onSelectRoom?: (roomId: string) => void;
  className?: string;
}

export function HouseScene({
  asset,
  rooms,
  label,
  selectedRoomId,
  alertRoomIds,
  roomMeta,
  roomHref,
  onSelectRoom,
  className,
}: HouseSceneProps) {
  const style = {
    aspectRatio: `${asset.width} / ${asset.height}`,
    '--marker-min-w': `${asset.markerFootprint?.width ?? 0}%`,
    '--marker-min-h': `${asset.markerFootprint?.height ?? 0}%`,
  } as CSSProperties;

  return (
    <figure className={cn('house-scene', selectedRoomId && 'has-selection', className)} aria-label={label}>
      <div className="house-scene__stage" style={style}>
        <img className="house-scene__image" src={asset.src} alt={asset.alt} width={asset.width} height={asset.height} draggable={false} />
        <ul className="house-scene__markers">
          {rooms.map((room) => (
            <li key={room.id}>
              <RoomMarker
                room={room}
                meta={roomMeta?.[room.id]}
                alert={alertRoomIds?.has(room.id) ?? room.status === 'alert'}
                selected={room.id === selectedRoomId}
                href={roomHref?.(room.id)}
                onSelect={onSelectRoom}
              />
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}
