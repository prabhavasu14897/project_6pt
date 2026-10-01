import { memberById } from '@/data/prototype';
import type { ActivityItem } from '@/types/family';
import { formatRelativeDay, formatTimeAgo } from '@/lib/utils';
import { Avatar } from '@/components/ui/Avatar';

export interface FamilyActivityProps {
  items: ActivityItem[];
  /** Show who did each thing (the whole-family feed); a single member's feed omits it. */
  showMember?: boolean;
}

/** Activity grouped under day headings, newest first. */
export function FamilyActivity({ items, showMember = true }: FamilyActivityProps) {
  const sorted = items
    .map((item, index) => ({ item, index, time: new Date(item.at).getTime() }))
    .sort((a, b) => b.time - a.time || a.index - b.index)
    .map(({ item }) => item);
  const groups: { day: string; items: ActivityItem[] }[] = [];
  for (const item of sorted) {
    const day = item.at.slice(0, 10);
    const group = groups[groups.length - 1];
    if (group && group.day === day) group.items.push(item);
    else groups.push({ day, items: [item] });
  }

  return (
    <div className="activity-feed">
      {groups.map((group) => (
        <section key={group.day} aria-label={formatRelativeDay(group.day)}>
          <h3 className="event-group__title">{formatRelativeDay(group.day)}</h3>
          <ul className="activity-rows">
            {group.items.map((item) => {
              const member = memberById(item.memberId);
              return (
                <li key={item.id} className="activity-row">
                  {showMember && <Avatar name={member?.name ?? ''} src={member?.avatar} size={30} decorative />}
                  <span className="activity-row__body">
                    <span className="activity-row__text">
                      {showMember && <strong>{member?.name}</strong>} {item.action}
                    </span>
                    <time className="activity-row__time" dateTime={item.at}>
                      {formatTimeAgo(item.at)}
                    </time>
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
