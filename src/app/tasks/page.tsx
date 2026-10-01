import { useId, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { productConfig } from '@/config';
import {
  currentUserId, addTask,
  memberById,
  pendingTasks,
  roomById,
  taskCategories,
  taskStats,
  useHousehold,
} from '@/data/prototype';
import type { Task, TaskPriority, TaskTab } from '@/types/tasks';
import { screenFor } from '@/lib/navigation';
import { cn, fill, formatAgendaDay, today, useMediaQuery } from '@/lib/utils';
import { PageHeader } from '@/components/layout/PageHeader';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Drawer } from '@/components/ui/Drawer';
import { Modal } from '@/components/ui/Modal';
import { Tabs } from '@/components/ui/Tabs';
import { toast } from '@/components/ui/Toast';
import { TaskFilters, type TaskFilterState } from '@/components/tasks/TaskFilters';
import { priorityTone, setTaskDone } from '@/components/tasks/TaskItem';
import { TaskList } from '@/components/tasks/TaskList';
import { TaskProgress } from '@/components/tasks/TaskProgress';
import type { ScreenPageProps } from '@/app/layout';

const PHONE = '(max-width: 767px)';
const NO_FILTERS: TaskFilterState = { priorities: new Set(), categories: new Set() };

export default function TasksPage({ screenId }: ScreenPageProps) {
  const { tasksScreen: copy } = productConfig;
  const screen = screenFor(screenId);
  const household = useHousehold();
  const phone = useMediaQuery(PHONE);
  const [tab, setTab] = useState<TaskTab>('mine');
  const [filters, setFilters] = useState<TaskFilterState>(NO_FILTERS);
  const [openId, setOpenId] = useState<string>();
  const [adding, setAdding] = useState(false);

  const all = household.tasks;
  const pending = pendingTasks(household);
  const completed = all.filter((t) => t.completed).sort((a, b) => b.due.localeCompare(a.due));
  const byTab: Record<TaskTab, Task[]> = {
    mine: pending.filter((t) => t.assigneeId === currentUserId()),
    family: pending,
    completed,
  };
  const matches = (t: Task) =>
    (filters.priorities.size === 0 || filters.priorities.has(t.priority)) &&
    (filters.categories.size === 0 || filters.categories.has(t.category));
  const visible = byTab[tab].filter(matches);
  const filtered = filters.priorities.size + filters.categories.size > 0;

  const emptyTitle = filtered ? copy.emptyFiltered : tab === 'mine' ? copy.emptyMine : tab === 'family' ? copy.emptyFamily : copy.emptyCompleted;
  const tabs = (Object.keys(copy.tabs) as TaskTab[]).map((id) => ({ id, label: copy.tabs[id], count: byTab[id].length }));
  const categories = taskCategories(all);
  const openTask = all.find((t) => t.id === openId);

  return (
    <div className="tasks-page split-page">
      <PageHeader
        title={screen?.title ?? ''}
        description={screen?.description}
        actions={
          screen?.primaryAction && (
            <Button icon="Plus" onClick={() => setAdding(true)}>
              {screen.primaryAction}
            </Button>
          )
        }
      />
      <div className="split-grid">
        <div className="split-main">
          <Tabs items={tabs} value={tab} onChange={(id) => setTab(id as TaskTab)} label={copy.tabsLabel} className="segmented page-tabs" />
          {phone && <TaskFilters layout="strip" value={filters} categories={categories} onChange={setFilters} />}
          <TaskList
            tasks={visible}
            grouped={tab !== 'completed'}
            emptyTitle={emptyTitle}
            emptyHint={filtered ? copy.emptyFilteredHint : undefined}
            onOpen={(t) => setOpenId(t.id)}
          />
        </div>
        <aside className="split-aside">
          <TaskProgress stats={taskStats(all)} />
          {!phone && <TaskFilters value={filters} categories={categories} onChange={setFilters} />}
        </aside>
      </div>

      <Drawer open={Boolean(openTask)} onClose={() => setOpenId(undefined)} title={openTask?.title ?? ''} side={phone ? 'bottom' : 'right'}>
        {openTask && <TaskDetail task={openTask} onDone={() => setOpenId(undefined)} />}
      </Drawer>

      <AddTaskModal open={adding} onClose={() => setAdding(false)} categories={categories} />
    </div>
  );
}

function TaskDetail({ task, onDone }: { task: Task; onDone: () => void }) {
  const { tasksScreen: copy, ui } = productConfig;
  const assignee = memberById(task.assigneeId);
  const room = roomById(task.roomId);
  const rows: { label: string; value: ReactNode }[] = [
    {
      label: copy.detail.assignee,
      value: (
        <span className="task-detail__person">
          {assignee && <Avatar name={assignee.name} src={assignee.avatar} size={24} decorative />}
          {assignee?.name}
        </span>
      ),
    },
    { label: copy.detail.due, value: formatAgendaDay(task.due) },
    { label: copy.detail.priority, value: <Badge tone={priorityTone[task.priority]}>{ui.priority[task.priority]}</Badge> },
    { label: copy.detail.category, value: task.category },
    ...(room ? [{ label: copy.detail.room, value: room.name }] : []),
  ];
  return (
    <div className="task-detail">
      {task.completed && <Badge tone="success">{copy.detail.completedState}</Badge>}
      <dl className="task-detail__rows">
        {rows.map((row) => (
          <div key={row.label} className="task-detail__row">
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
      <Button
        variant={task.completed ? 'secondary' : 'primary'}
        icon={task.completed ? undefined : 'Check'}
        onClick={() => {
          setTaskDone(task, !task.completed);
          onDone();
        }}
      >
        {task.completed ? copy.detail.reopen : copy.detail.complete}
      </Button>
    </div>
  );
}

function AddTaskModal({ open, onClose, categories }: { open: boolean; onClose: () => void; categories: string[] }) {
  const { tasksScreen: copy, family, rooms, ui } = productConfig;
  const formId = useId();
  const nameRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);
  const priorities: TaskPriority[] = ['high', 'medium', 'low'];

  const close = () => {
    setError(false);
    onClose();
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = String(data.get('title') ?? '').trim();
    if (!title) {
      setError(true);
      nameRef.current?.focus();
      return;
    }
    const assigneeId = String(data.get('assignee') ?? currentUserId());
    const roomId = String(data.get('room') ?? '');
    addTask({
      title,
      assigneeId,
      due: String(data.get('due') || today()),
      priority: String(data.get('priority') ?? 'medium') as TaskPriority,
      category: String(data.get('category') ?? categories[0] ?? ''),
      ...(roomId ? { roomId } : {}),
    });
    toast({ message: fill(copy.added, { title, name: memberById(assigneeId)?.name ?? '' }), tone: 'success' });
    event.currentTarget.reset();
    close();
  };

  return (
    <Modal
      open={open}
      onClose={close}
      title={copy.form.title}
      description={copy.form.description}
      footer={
        <>
          <Button variant="ghost" onClick={close}>
            {copy.form.cancel}
          </Button>
          <Button type="submit" form={formId} icon="Plus">
            {copy.form.submit}
          </Button>
        </>
      }
    >
      <form id={formId} key={String(open)} className="form" onSubmit={submit} noValidate>
        <label className="field">
          <span className="field__label">{copy.form.name}</span>
          <input
            ref={nameRef}
            name="title"
            className={cn('input', error && 'is-invalid')}
            placeholder={copy.form.namePlaceholder}
            autoComplete="off"
            aria-invalid={error || undefined}
            aria-describedby={error ? `${formId}-title-error` : undefined}
            onInput={() => error && setError(false)}
          />
          {error && (
            <span id={`${formId}-title-error`} className="field__error" role="alert">
              {copy.form.nameRequired}
            </span>
          )}
        </label>
        <div className="form__row">
          <label className="field">
            <span className="field__label">{copy.form.assignee}</span>
            <select name="assignee" className="input" defaultValue={currentUserId()}>
              {family.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span className="field__label">{copy.form.due}</span>
            <input name="due" type="date" className="input" defaultValue={today()} />
          </label>
        </div>
        <fieldset className="field">
          <legend className="field__label">{copy.form.priority}</legend>
          <div className="choice-row">
            {priorities.map((p) => (
              <label key={p} className={cn('choice', `tone-${priorityTone[p]}`)}>
                <input type="radio" name="priority" value={p} defaultChecked={p === 'medium'} />
                <span className="chip__dot" aria-hidden="true" />
                {ui.priority[p]}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="form__row">
          <label className="field">
            <span className="field__label">{copy.form.category}</span>
            <select name="category" className="input" defaultValue={categories[0]}>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span className="field__label">{copy.form.room}</span>
            <select name="room" className="input" defaultValue="">
              <option value="">{copy.form.noRoom}</option>
              {rooms.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </form>
    </Modal>
  );
}
