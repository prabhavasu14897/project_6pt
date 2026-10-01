import { productConfig } from '@/config';
import { pendingTasks, useHousehold } from '@/data/prototype';
import { routeFor } from '@/lib/navigation';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { TaskItem } from '@/components/tasks/TaskItem';

export function TaskOverview() {
  const { dashboard, ui } = productConfig;
  const section = dashboard.sections.tasks;
  const tasks = pendingTasks(useHousehold()).slice(0, dashboard.listLimit);

  return (
    <Card title={section.title} action={{ label: ui.viewAll, to: routeFor(section.target), ariaLabel: `${ui.viewAll}: ${section.title}` }} className="dashboard-list">
      {tasks.length === 0 ? (
        <EmptyState icon="CheckSquare" title={ui.emptyTasks} hint={ui.emptyTasksHint} compact />
      ) : (
        <ul className="task-rows">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      )}
    </Card>
  );
}
