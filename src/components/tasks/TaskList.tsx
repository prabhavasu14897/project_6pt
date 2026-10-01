import { productConfig } from '@/config';
import { taskGroup } from '@/data/prototype';
import type { Task, TaskGroup } from '@/types/tasks';
import { EmptyState } from '@/components/ui/EmptyState';
import { TaskItem } from './TaskItem';

const order: TaskGroup[] = ['overdue', 'today', 'tomorrow', 'upcoming'];

export interface TaskListProps {
  tasks: Task[];
  /** Group open tasks under due-date headings; completed lists stay flat. */
  grouped?: boolean;
  emptyTitle: string;
  emptyHint?: string;
  onOpen?: (task: Task) => void;
}

export function TaskList({ tasks, grouped = true, emptyTitle, emptyHint, onOpen }: TaskListProps) {
  const { tasksScreen: copy } = productConfig;
  if (tasks.length === 0) {
    return <EmptyState icon="CheckSquare" title={emptyTitle} hint={emptyHint} className="task-list__empty" />;
  }

  if (!grouped) {
    return (
      <ul className="task-cards">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} variant="card" onOpen={onOpen} />
        ))}
      </ul>
    );
  }

  return (
    <div className="task-groups">
      {order.map((group) => {
        const inGroup = tasks.filter((t) => taskGroup(t) === group);
        if (!inGroup.length) return null;
        return (
          <section key={group} className={`task-group task-group--${group}`} aria-label={copy.groups[group]}>
            <h2 className="task-group__title">
              {copy.groups[group]}
              <span className="task-group__count">{inGroup.length}</span>
            </h2>
            <ul className="task-cards">
              {inGroup.map((task) => (
                <TaskItem key={task.id} task={task} variant="card" onOpen={onOpen} />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
