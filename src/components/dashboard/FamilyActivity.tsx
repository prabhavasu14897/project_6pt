import { productConfig } from '@/config';
import { memberById, recentActivity, useHousehold } from '@/data/prototype';
import { routeFor } from '@/lib/navigation';
import { formatTimeAgo } from '@/lib/utils';
import { Avatar } from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';

export function FamilyActivity() {
  const { dashboard, ui } = productConfig;
  const section = dashboard.sections.activity;
  const items = recentActivity(useHousehold()).slice(0, dashboard.listLimit);

  return (
    <Card title={section.title} action={{ label: ui.viewAll, to: routeFor(section.target), ariaLabel: `${ui.viewAll}: ${section.title}` }} className="dashboard-list">
      {items.length === 0 ? (
        <EmptyState icon="Users" title={ui.emptyActivity} compact />
      ) : (
        <ul className="activity-rows">
          {items.map((item) => {
            const member = memberById(item.memberId);
            return (
              <li key={item.id} className="activity-row">
                <Avatar name={member?.name ?? ''} src={member?.avatar} size={30} decorative />
                <span className="activity-row__body">
                  <span className="activity-row__text">
                    <strong>{member?.name}</strong> {item.action}
                  </span>
                  <time className="activity-row__time" dateTime={item.at}>
                    {formatTimeAgo(item.at)}
                  </time>
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
