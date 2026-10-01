import { useState } from 'react';
import { productConfig } from '@/config';
import { currentUserId, useHousehold } from '@/data/prototype';
import { screenFor } from '@/lib/navigation';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { FamilyActivity } from '@/components/family/FamilyActivity';
import { FamilyGrid } from '@/components/family/FamilyGrid';
import { MemberProfile } from '@/components/family/FamilyMemberCard';
import type { ScreenPageProps } from '@/app/layout';

export default function FamilyPage({ screenId }: ScreenPageProps) {
  const { family, familyScreen: copy } = productConfig;
  const screen = screenFor(screenId);
  const household = useHousehold();
  const [selectedId, setSelectedId] = useState(currentUserId());
  const selected = family.find((m) => m.id === selectedId) ?? family[0];

  return (
    <div className="family-page split-page">
      <PageHeader title={screen?.title ?? ''} description={screen?.description} />
      <FamilyGrid household={household} selectedId={selected?.id ?? ''} onSelect={setSelectedId} />
      <div className="split-grid family-page__body">
        <div className="split-main">{selected && <MemberProfile key={selected.id} member={selected} household={household} />}</div>
        <aside className="split-aside">
          <Card title={copy.activityTitle}>
            <FamilyActivity items={household.activity} />
          </Card>
        </aside>
      </div>
    </div>
  );
}
