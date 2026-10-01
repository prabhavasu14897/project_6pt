import { productConfig } from '@/config';
import { alertRoomIds, useHousehold } from '@/data/prototype';
import { routeFor } from '@/lib/navigation';
import { HouseScene } from '@/components/3d/HouseScene';

/** The dashboard's centerpiece: the shared scene, with each room linking into its detail view. */
export function DashboardHero() {
  const { assets, rooms, dashboard, ui } = productConfig;
  const alerts = alertRoomIds(useHousehold());
  const target = routeFor(dashboard.sceneTarget);

  return (
    <section className="dashboard-hero" aria-label={ui.sceneLabel}>
      <HouseScene
        asset={assets.scene}
        rooms={rooms}
        label={ui.sceneLabel}
        alertRoomIds={alerts}
        roomHref={(roomId) => `${target}?room=${encodeURIComponent(roomId)}`}
      />
    </section>
  );
}
