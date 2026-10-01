import type { IconName } from '@/components/navigation/NavigationIcon';

export type RoomStatus = 'active' | 'normal' | 'alert';

export interface Room {
  id: string;
  name: string;
  icon: IconName;
  status: RoomStatus;
  /** Marker anchor on the configured scene asset, as % of its width / height. */
  position: { x: number; y: number };
  /** Center of the room itself on the scene asset (%), used for the zoomed room view. */
  focus?: { x: number; y: number };
}

export interface PluralCopy {
  one: string;
  other: string;
}

export interface DigitalHouseConfig {
  /** Room shown when the URL names none (wide layouts only). */
  defaultRoomId: string;
  roomsTitle: string;
  /** How far the room view zooms into the scene asset. */
  roomZoom: number;
  tabs: { tasks: string; shopping: string; maintenance: string };
  counts: { tasks: PluralCopy; shopping: PluralCopy; maintenance: PluralCopy };
  serviceDue: string;
  allClear: string;
  roomViewLabel: string;
  emptyTasks: string;
  emptyShopping: string;
  emptyMaintenance: string;
}

export interface SceneAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  /**
   * Minimum marker footprint as % of the asset's width / height. Lets markers fully cover
   * any hotspot artwork that is baked into the image, at every rendered size.
   */
  markerFootprint?: { width: number; height: number };
}
