import { productConfig } from '@/config';
import { memberById, setTaskCompleted } from '@/data/prototype';
import type { Tone } from '@/types/dashboard';
import type { Task, TaskPriority } from '@/types/tasks';
import { cn, daysFromToday, fill, formatRelativeDay } from '@/lib/utils';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { toast } from '@/components/ui/Toast';
import { NavigationIcon } from '@/components/navigation/NavigationIcon';

export const priorityTone: Record<TaskPriority, Tone> = { high: 'danger', medium: 'warning', low: 'success' };

/** Completes or reopens a task with feedback; completing offers an undo. */
export function setTaskDone(task: Task, done: boolean): void {
  const { ui } = productConfig;
  setTaskCompleted(task.id, done);
  toast(
    done
      ? {
          message: fill(ui.taskCompleted, { title: task.title }),
          tone: 'success',
          action: { label: ui.undo, onAction: () => setTaskCompleted(task.id, false) },
        }
      : { message: fill(ui.taskReopened, { title: task.title }), tone: 'neutral' },
  );
}

export interface TaskItemProps {
  task: Task;
  /** Hide the assignee name when the context already shows it. */
  showAssignee?: boolean;
  /**
   * `row`: compact list row with a trailing "done" control (dashboard, room panel).
   * `card`: standalone card with a leading checkbox and a details affordance (task list).
   */
  variant?: 'row' | 'card';
  onOpen?: (task: Task) => void;
}

export function TaskItem({ task, showAssignee = true, variant = 'row', onOpen }: TaskItemProps) {
  const { ui, tasksScreen } = productConfig;
  const assignee = memberById(task.assigneeId);
  const overdue = !task.completed && daysFromToday(task.due) < 0;
  const toggleLabel = fill(task.completed ? ui.markIncomplete : ui.markComplete, { title: task.title });

  const meta = (
    <span className="task-row__meta">
      {showAssignee && <span>{assignee?.name}</span>}
      <Badge variant="dot" tone={overdue ? 'danger' : 'neutral'}>
        {formatRelativeDay(task.due)}
      </Badge>
      <Badge variant="dot" tone={priorityTone[task.priority]}>
        {ui.priority[task.priority]}
      </Badge>
    </span>
  );

  if (variant === 'card') {
    return (
      <li className={cn('task-card', task.completed && 'is-done')}>
        <button
          type="button"
          role="checkbox"
          aria-checked={task.completed}
          aria-label={toggleLabel}
          className="checkbox"
          onClick={() => setTaskDone(task, !task.completed)}
        >
          <NavigationIcon name="Check" size={14} strokeWidth={2.6} />
        </button>
        <Avatar name={assignee?.name ?? ''} src={assignee?.avatar} size={36} decorative={showAssignee} />
        <span className="task-row__body">
          <span className="task-row__title">{task.title}</span>
          {meta}
        </span>
        {onOpen && (
          <button
            type="button"
            className="task-card__open"
            aria-label={fill(tasksScreen.openTask, { title: task.title })}
            onClick={() => onOpen(task)}
          >
            <NavigationIcon name="ChevronRight" size={18} />
          </button>
        )}
      </li>
    );
  }

  return (
    <li className="task-row">
      <Avatar name={assignee?.name ?? ''} src={assignee?.avatar} size={34} decorative={showAssignee} />
      <span className="task-row__body">
        <span className="task-row__title">{task.title}</span>
        {meta}
      </span>
      <button type="button" className="check-button" aria-label={toggleLabel} title={toggleLabel} onClick={() => setTaskDone(task, true)}>
        <NavigationIcon name="Check" size={16} strokeWidth={2.4} />
      </button>
    </li>
  );
}
