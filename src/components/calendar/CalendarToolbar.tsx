import { productConfig } from '@/config';
import type { CalendarViewMode } from '@/types/tasks';
import { formatDayLabel, formatMonthYear, weekDays } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { Tabs } from '@/components/ui/Tabs';

export interface CalendarToolbarProps {
  mode: CalendarViewMode;
  anchor: string;
  isToday: boolean;
  onModeChange: (mode: CalendarViewMode) => void;
  onStep: (direction: -1 | 1) => void;
  onToday: () => void;
}

function periodLabel(mode: CalendarViewMode, anchor: string): string {
  if (mode === 'month') return formatMonthYear(anchor);
  if (mode === 'day') return formatDayLabel(anchor);
  const days = weekDays(anchor, productConfig.calendar.weekStartsOn);
  return `${formatDayLabel(days[0] ?? anchor)} – ${formatDayLabel(days[6] ?? anchor)}`;
}

export function CalendarToolbar({ mode, anchor, isToday, onModeChange, onStep, onToday }: CalendarToolbarProps) {
  const { calendar: copy } = productConfig;
  const views = (Object.keys(copy.views) as CalendarViewMode[]).map((id) => ({ id, label: copy.views[id] }));
  return (
    <div className="calendar-toolbar">
      <div className="calendar-toolbar__period">
        <h2 className="calendar-toolbar__label" aria-live="polite">
          {periodLabel(mode, anchor)}
        </h2>
        <div className="calendar-toolbar__steps">
          <IconButton icon="ChevronLeft" label={copy.previous} variant="surface" size="sm" onClick={() => onStep(-1)} />
          <IconButton icon="ChevronRight" label={copy.next} variant="surface" size="sm" onClick={() => onStep(1)} />
        </div>
        <Button variant="ghost" size="sm" onClick={onToday} disabled={isToday}>
          {copy.today}
        </Button>
      </div>
      <Tabs items={views} value={mode} onChange={(id) => onModeChange(id as CalendarViewMode)} label={copy.viewLabel} className="segmented" />
    </div>
  );
}
