import { useId, useRef, useState, type FormEvent } from 'react';
import { productConfig } from '@/config';
import { addMaintenance, useHousehold } from '@/data/prototype';
import type { MaintenanceItem, MaintenanceTab } from '@/types/maintenance';
import { screenFor } from '@/lib/navigation';
import { addDays, cn, daysFromToday, fill, formatDayLabel, plural, today, useMediaQuery } from '@/lib/utils';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { Drawer } from '@/components/ui/Drawer';
import { Modal } from '@/components/ui/Modal';
import { Tabs } from '@/components/ui/Tabs';
import { toast } from '@/components/ui/Toast';
import { MaintenanceList, ServiceHistoryList } from '@/components/maintenance/MaintenanceList';
import { MaintenanceDetail, MaintenanceSummary } from '@/components/maintenance/MaintenanceSummary';
import type { ScreenPageProps } from '@/app/layout';

/** Wide enough for the asset panel to sit in the side column; narrower widths use a drawer. */
const WIDE = '(min-width: 1200px)';

export default function MaintenancePage({ screenId }: ScreenPageProps) {
  const { maintenanceScreen: copy, clock } = productConfig;
  const screen = screenFor(screenId);
  const { maintenance } = useHousehold();
  const wide = useMediaQuery(WIDE);
  const phone = useMediaQuery('(max-width: 767px)');
  const [tab, setTab] = useState<MaintenanceTab>('dueSoon');
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [adding, setAdding] = useState(false);

  const open = maintenance.filter((m) => !m.completed).sort((a, b) => a.due.localeCompare(b.due));
  const lists: Record<Exclude<MaintenanceTab, 'history'>, MaintenanceItem[]> = {
    dueSoon: open.filter((m) => daysFromToday(m.due) <= clock.dueSoonDays),
    upcoming: open.filter((m) => daysFromToday(m.due) > clock.dueSoonDays),
  };
  const historyCount = maintenance.reduce((n, m) => n + m.history.length, 0);
  const tabs = [
    { id: 'dueSoon', label: copy.tabs.dueSoon, count: lists.dueSoon.length },
    { id: 'upcoming', label: copy.tabs.upcoming, count: lists.upcoming.length },
    { id: 'history', label: copy.tabs.history, count: historyCount },
  ];

  // Wide layouts always show an item: the selection, else the most urgent one.
  const selected = maintenance.find((m) => m.id === selectedId) ?? (wide ? open[0] : undefined);
  const openItem = (item: MaintenanceItem) => {
    setSelectedId(item.id);
    if (!wide) setSheetOpen(true);
  };

  return (
    <div className="maintenance-page split-page">
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
          <Tabs items={tabs} value={tab} onChange={(id) => setTab(id as MaintenanceTab)} label={copy.tabsLabel} className="segmented page-tabs" />
          {tab === 'history' ? (
            <div className="card card--padded">
              <ServiceHistoryList items={maintenance} emptyTitle={copy.emptyHistory} />
            </div>
          ) : (
            <MaintenanceList
              items={lists[tab]}
              selectedId={wide ? selected?.id : undefined}
              onOpen={openItem}
              emptyTitle={tab === 'dueSoon' ? copy.emptyDueSoon : copy.emptyUpcoming}
              emptyHint={tab === 'dueSoon' ? copy.emptyDueSoonHint : undefined}
            />
          )}
        </div>
        <aside className="split-aside">
          <MaintenanceSummary items={maintenance} />
          {wide && <MaintenanceDetail item={selected} />}
        </aside>
      </div>

      {!wide && (
        <Drawer open={sheetOpen && Boolean(selected)} onClose={() => setSheetOpen(false)} title={copy.detailTitle} side={phone ? 'bottom' : 'right'}>
          <MaintenanceDetail item={selected} bare />
        </Drawer>
      )}

      <AddMaintenanceModal open={adding} onClose={() => setAdding(false)} />
    </div>
  );
}

function AddMaintenanceModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { maintenanceScreen: copy, rooms } = productConfig;
  const formId = useId();
  const nameRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);

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
    const interval = Number(data.get('repeat') ?? 0);
    const due = String(data.get('due') || addDays(today(), 30));
    const icon = copy.types.find((t) => t.icon === data.get('type'))?.icon ?? 'Wrench';
    addMaintenance({
      title,
      roomId: String(data.get('room') ?? rooms[0]?.id ?? ''),
      icon,
      due,
      ...(interval > 0 ? { intervalMonths: interval } : {}),
    });
    toast({ message: fill(copy.added, { title, date: formatDayLabel(due) }), tone: 'success' });
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
            <span className="field__label">{copy.form.room}</span>
            <select name="room" className="input" defaultValue={rooms[0]?.id}>
              {rooms.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span className="field__label">{copy.form.type}</span>
            <select name="type" className="input" defaultValue={copy.types[0]?.icon}>
              {copy.types.map((t) => (
                <option key={t.icon} value={t.icon}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="form__row">
          <label className="field">
            <span className="field__label">{copy.form.due}</span>
            <input name="due" type="date" className="input" defaultValue={addDays(today(), 30)} />
          </label>
          <label className="field">
            <span className="field__label">{copy.form.repeat}</span>
            <select name="repeat" className="input" defaultValue={String(copy.repeatOptions[2] ?? 0)}>
              <option value="0">{copy.form.repeatNone}</option>
              {copy.repeatOptions.map((n) => (
                <option key={n} value={n}>
                  {plural(n, copy.every)}
                </option>
              ))}
            </select>
          </label>
        </div>
      </form>
    </Modal>
  );
}
