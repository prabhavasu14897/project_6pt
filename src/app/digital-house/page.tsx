import { useSearchParams } from 'react-router-dom';
import { productConfig } from '@/config';
import { alertRoomIds, roomSummary, useHousehold, type RoomSummary } from '@/data/prototype';
import { screenFor } from '@/lib/navigation';
import { plural, useMediaQuery } from '@/lib/utils';
import { PageHeader } from '@/components/layout/PageHeader';
import { Drawer } from '@/components/ui/Drawer';
import { HouseScene } from '@/components/3d/HouseScene';
import { HouseContextPanel } from '@/components/3d/HouseContextPanel';
import { RoomPanel } from '@/components/3d/RoomPanel';
import type { ScreenPageProps } from '@/app/layout';

/** Wide enough for the room panel to sit beside the scene; narrower widths use a sheet. */
const WIDE = '(min-width: 1200px)';
const PHONE = '(max-width: 767px)';

export default function DigitalHousePage({ screenId }: ScreenPageProps) {
  const { rooms, assets, digitalHouse: copy, ui } = productConfig;
  const screen = screenFor(screenId);
  const household = useHousehold();
  const wide = useMediaQuery(WIDE);
  const phone = useMediaQuery(PHONE);
  const [params, setParams] = useSearchParams();

  const requested = params.get('room');
  const requestedRoom = rooms.find((r) => r.id === requested);
  // Wide layouts always show a room; sheets open only when one is asked for.
  const selected = requestedRoom ?? (wide ? rooms.find((r) => r.id === copy.defaultRoomId) ?? rooms[0] : undefined);

  const alerts = alertRoomIds(household);
  const summaries: Record<string, RoomSummary> = Object.fromEntries(rooms.map((r) => [r.id, roomSummary(r.id, household)]));
  const markerMeta: Record<string, string> = Object.fromEntries(
    rooms.map((r) => [r.id, alerts.has(r.id) ? copy.serviceDue : plural(summaries[r.id]?.tasks.length ?? 0, copy.counts.tasks)]),
  );

  const select = (roomId: string) => setParams({ room: roomId }, { replace: true });
  const closeSheet = () => setParams({}, { replace: true });

  const panel = selected && (
    <RoomPanel
      key={selected.id}
      room={selected}
      summary={summaries[selected.id] ?? roomSummary(selected.id, household)}
      alert={alerts.has(selected.id)}
      asset={assets.scene}
      showHeader={wide}
    />
  );

  return (
    <div className="digital-house">
      <PageHeader title={screen?.title ?? ''} description={screen?.description} />
      <div className="digital-house__grid">
        <div className="digital-house__main">
          <div className="scene-frame">
            <HouseScene
              asset={assets.scene}
              rooms={rooms}
              label={ui.sceneLabel}
              selectedRoomId={selected?.id}
              alertRoomIds={alerts}
              roomMeta={markerMeta}
              onSelectRoom={select}
            />
          </div>
          <HouseContextPanel
            rooms={rooms}
            summaries={summaries}
            alertRoomIds={alerts}
            selectedRoomId={selected?.id}
            onSelectRoom={select}
          />
        </div>
        {wide && panel && <aside className="digital-house__panel card card--padded">{panel}</aside>}
      </div>
      {!wide && (
        <Drawer open={Boolean(selected)} onClose={closeSheet} title={selected?.name ?? ''} side={phone ? 'bottom' : 'right'}>
          {panel}
        </Drawer>
      )}
    </div>
  );
}
