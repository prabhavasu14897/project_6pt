import { productConfig } from '@/config';
import type { TaskStats } from '@/data/prototype';
import type { Tone } from '@/types/dashboard';
import { fill } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';

export function TaskProgress({ stats }: { stats: TaskStats }) {
  const { tasksScreen: copy } = productConfig;
  const value = fill(copy.progressValue, { done: stats.completed, total: stats.total });
  const legend: { key: keyof typeof copy.legend; count: number; tone: Tone }[] = [
    { key: 'completed', count: stats.completed, tone: 'success' },
    { key: 'pending', count: stats.pending, tone: 'warning' },
    { key: 'overdue', count: stats.overdue, tone: 'danger' },
  ];
  return (
    <Card title={copy.progressTitle} className="task-progress">
      <div className="task-progress__body">
        <Progress variant="ring" tone="success" value={stats.completed} max={stats.total} label={`${copy.progressTitle}: ${value} ${copy.progressCaption}`} size={132}>
          <span className="task-progress__value">{value}</span>
          <span className="task-progress__caption">{copy.progressCaption}</span>
        </Progress>
        <dl className="task-progress__legend">
          {legend.map((row) => (
            <div key={row.key} className={`task-progress__row tone-${row.tone}`}>
              <dt>
                <span className="task-progress__dot" aria-hidden="true" />
                {copy.legend[row.key]}
              </dt>
              <dd>{row.count}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Card>
  );
}
