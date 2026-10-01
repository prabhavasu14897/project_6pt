import { useId, useRef, useState, type FormEvent } from 'react';
import { productConfig } from '@/config';
import { currentUserId, addEvent, eventsOn, useHousehold } from '@/data/prototype';
import type { CalendarViewMode } from '@/types/tasks';
import { screenFor } from '@/lib/navigation';
import { addDays, addMonths, cn, fill, formatDayLabel, today } from '@/lib/utils';
import { PageHeader } from '@/components/layout/PageHeader';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { toast } from '@/components/ui/Toast';
import { CalendarToolbar } from '@/components/calendar/CalendarToolbar';
import { CalendarView } from '@/components/calendar/CalendarView';
import { EventList, type EventGroup } from '@/components/calendar/EventList';
import { eventColorStyle } from '@/components/calendar/EventCard';
import type { ScreenPageProps } from '@/app/layout';

/** How far ahead the upcoming list looks for days with events. */
const UPCOMING_HORIZON_DAYS = 60;

export default function CalendarPage({ screenId }: ScreenPageProps) {
  const { calendar: copy, family, clock } = productConfig;
  const screen = screenFor(screenId);
  const household = useHousehold();
  const [mode, setMode] = useState<CalendarViewMode>('month');
  const [anchor, setAnchor] = useState(today());
  const [hidden, setHidden] = useState<ReadonlySet<string>>(new Set());
  const [adding, setAdding] = useState(false);

  // Whole-household events stay visible; individual members can be hidden.
  const visible = household.events.filter((e) => e.memberId === clock.householdId || !hidden.has(e.memberId));

  const upcoming: EventGroup[] = [];
  for (let i = 0; i < UPCOMING_HORIZON_DAYS && upcoming.length < copy.upcomingDays; i++) {
    const day = addDays(anchor, i);
    const events = eventsOn(day, visible);
    if (events.length) upcoming.push({ day, events });
  }

  const step = (direction: -1 | 1) =>
    setAnchor((current) => (mode === 'month' ? addMonths(current, direction) : addDays(current, direction * (mode === 'week' ? 7 : 1))));

  const toggleMember = (id: string) =>
    setHidden((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="calendar-page">
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
      <div className="calendar-page__grid">
        <div className="calendar-page__main">
          <Card className="calendar-card">
            <CalendarToolbar
              mode={mode}
              anchor={anchor}
              isToday={anchor === today()}
              onModeChange={setMode}
              onStep={step}
              onToday={() => setAnchor(today())}
            />
            <CalendarView mode={mode} anchor={anchor} events={visible} onSelectDay={setAnchor} />
          </Card>

          <Card title={copy.membersTitle} className="members-card">
            <p className="members-card__hint">{copy.membersHint}</p>
            <ul className="member-toggles">
              {family.map((member) => {
                const shown = !hidden.has(member.id);
                return (
                  <li key={member.id}>
                    <button
                      type="button"
                      className={cn('member-toggle', !shown && 'is-hidden')}
                      aria-pressed={shown}
                      aria-label={fill(shown ? copy.hideMember : copy.showMember, { name: member.name })}
                      style={eventColorStyle(member.id)}
                      onClick={() => toggleMember(member.id)}
                    >
                      <Avatar name={member.name} src={member.avatar} size={40} decorative />
                      <span className="member-toggle__text">
                        <span className="member-toggle__name">{member.name}</span>
                        <span className="member-toggle__role">{member.relationship}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>

        <Card title={copy.upcomingTitle} className="calendar-page__upcoming">
          <EventList groups={upcoming} emptyTitle={copy.noUpcoming} />
        </Card>
      </div>

      <AddEventModal
        open={adding}
        defaultDate={anchor}
        onClose={() => setAdding(false)}
        onAdded={(date) => {
          setAdding(false);
          setAnchor(date);
        }}
      />
    </div>
  );
}

interface AddEventModalProps {
  open: boolean;
  defaultDate: string;
  onClose: () => void;
  onAdded: (date: string) => void;
}

function AddEventModal({ open, defaultDate, onClose, onAdded }: AddEventModalProps) {
  const { calendar: copy, family, clock } = productConfig;
  const formId = useId();
  const nameRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = String(data.get('title') ?? '').trim();
    if (!title) {
      setError(true);
      nameRef.current?.focus();
      return;
    }
    const date = String(data.get('date') || defaultDate);
    const time = String(data.get('time') ?? '');
    const location = String(data.get('location') ?? '').trim();
    addEvent({
      title,
      date,
      memberId: String(data.get('member') ?? clock.householdId),
      ...(time ? { time } : {}),
      ...(location ? { location } : {}),
    });
    toast({ message: fill(copy.added, { title, date: formatDayLabel(date) }), tone: 'success' });
    event.currentTarget.reset();
    setError(false);
    onAdded(date);
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setError(false);
        onClose();
      }}
      title={copy.form.title}
      description={copy.form.description}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            {copy.form.cancel}
          </Button>
          <Button type="submit" form={formId} icon="Plus">
            {copy.form.submit}
          </Button>
        </>
      }
    >
      {/* Keyed by the default date so reopening on another day starts fresh. */}
      <form id={formId} key={`${defaultDate}-${open}`} className="form" onSubmit={submit} noValidate>
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
            <span className="field__label">{copy.form.date}</span>
            <input name="date" type="date" className="input" defaultValue={defaultDate} required />
          </label>
          <label className="field">
            <span className="field__label">
              {copy.form.time} <span className="field__optional">({copy.form.optional})</span>
            </span>
            <input name="time" type="time" className="input" />
          </label>
        </div>
        <label className="field">
          <span className="field__label">{copy.form.member}</span>
          <select name="member" className="input" defaultValue={currentUserId()}>
            {family.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
            <option value={clock.householdId}>{clock.householdLabel}</option>
          </select>
        </label>
        <label className="field">
          <span className="field__label">
            {copy.form.location} <span className="field__optional">({copy.form.optional})</span>
          </span>
          <input name="location" className="input" placeholder={copy.form.locationPlaceholder} autoComplete="off" />
        </label>
      </form>
    </Modal>
  );
}
