import { useSyncExternalStore } from 'react';
import { productConfig } from '@/config';
import type { PluralCopy } from '@/types/rooms';

type ClassValue = string | false | null | undefined;

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ');
}

/** Fills `{key}` placeholders in configured copy. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}

const { locale, currency } = productConfig.locale;
const DAY_MS = 86_400_000;

/** The prototype's fixed "now", so relative dates stay stable during testing. */
export function now(): Date {
  return new Date(productConfig.clock.now);
}

/** Parses an ISO date (yyyy-mm-dd) as a local calendar day. */
export function parseDay(iso: string): Date {
  const [y = 0, m = 1, d = 1] = iso.slice(0, 10).split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function toIsoDay(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function today(): string {
  return toIsoDay(now());
}

/** Whole calendar days from today to `iso` (negative when in the past). */
export function daysFromToday(iso: string): number {
  return Math.round((parseDay(iso).getTime() - parseDay(today()).getTime()) / DAY_MS);
}

export function formatLongDate(date: Date): string {
  return new Intl.DateTimeFormat(locale, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }).format(date);
}

export function formatShortDate(iso: string): string {
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short' }).format(parseDay(iso));
}

/** "Today", "Tomorrow", "Yesterday" or a short date. */
export function formatRelativeDay(iso: string): string {
  const { ui } = productConfig;
  const delta = daysFromToday(iso);
  if (delta === 0) return ui.today;
  if (delta === 1) return ui.tomorrow;
  if (delta === -1) return ui.yesterday;
  return formatShortDate(iso);
}

/** "Just now", "12m ago", "4h ago", "Yesterday" or a short date. */
export function formatTimeAgo(isoDateTime: string): string {
  const { ui } = productConfig;
  const minutes = Math.floor((now().getTime() - new Date(isoDateTime).getTime()) / 60_000);
  if (minutes < 1) return ui.justNow;
  if (minutes < 60) return fill(ui.minutesAgo, { n: minutes });
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return fill(ui.hoursAgo, { n: hours });
  return formatRelativeDay(isoDateTime);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
}

/** "15K", "1.2L"-style compact numbers per locale (axis ticks). */
export function formatCompact(value: number): string {
  return new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 }).format(value);
}

/** Short month name for an ISO month ("2024-04" → "Apr"). */
export function formatMonthShort(isoMonth: string): string {
  return new Intl.DateTimeFormat(locale, { month: 'short' }).format(parseDay(`${isoMonth}-01`));
}

export function formatMonthLong(isoMonth: string): string {
  return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(parseDay(`${isoMonth}-01`));
}

/** Round a maximum up to a clean axis ceiling (1, 2, 2.5, 5 × 10ⁿ). */
export function niceCeiling(value: number): number {
  if (value <= 0) return 1;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  const step = [1, 2, 2.5, 5, 10].find((s) => s * magnitude >= value) ?? 10;
  return step * magnitude;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat(locale).format(value);
}

/** Adds whole days to an ISO day. */
export function addDays(iso: string, days: number): string {
  const d = parseDay(iso);
  d.setDate(d.getDate() + days);
  return toIsoDay(d);
}

/** Moves to the same day `months` away, clamped to the target month's length. */
export function addMonths(iso: string, months: number): string {
  const d = parseDay(iso);
  const target = new Date(d.getFullYear(), d.getMonth() + months, 1);
  const last = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  target.setDate(Math.min(d.getDate(), last));
  return toIsoDay(target);
}

/** First day of the week containing `iso`. */
export function startOfWeek(iso: string, weekStartsOn: number): string {
  const d = parseDay(iso);
  return addDays(iso, -((d.getDay() - weekStartsOn + 7) % 7));
}

/** The six-week grid (42 ISO days) a month view shows for `iso`'s month. */
export function monthGrid(iso: string, weekStartsOn: number): string[] {
  const first = `${iso.slice(0, 7)}-01`;
  const start = startOfWeek(first, weekStartsOn);
  return Array.from({ length: 42 }, (_, i) => addDays(start, i));
}

export function weekDays(iso: string, weekStartsOn: number): string[] {
  const start = startOfWeek(iso, weekStartsOn);
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

/** Locale weekday names in display order, e.g. ["Sun", "Mon", …]. */
export function weekdayNames(weekStartsOn: number, style: 'short' | 'narrow' = 'short'): string[] {
  // 2024-01-07 is a Sunday.
  return Array.from({ length: 7 }, (_, i) =>
    new Intl.DateTimeFormat(locale, { weekday: style }).format(new Date(2024, 0, 7 + weekStartsOn + i)),
  );
}

export function formatMonthYear(iso: string): string {
  return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(parseDay(iso));
}

/** "Tue, 8 Oct". */
export function formatDayLabel(iso: string): string {
  return new Intl.DateTimeFormat(locale, { weekday: 'short', day: 'numeric', month: 'short' }).format(parseDay(iso));
}

/** "Today, Tue 8 Oct" / "Tomorrow, Wed 9 Oct" / "Thu, 10 Oct". */
export function formatAgendaDay(iso: string): string {
  const { ui } = productConfig;
  const delta = daysFromToday(iso);
  const label = formatDayLabel(iso);
  if (delta === 0) return `${ui.today}, ${label.replace(',', '')}`;
  if (delta === 1) return `${ui.tomorrow}, ${label.replace(',', '')}`;
  return label;
}

const pluralRules = new Intl.PluralRules(locale);

/** Picks the configured singular/plural copy for `n` and fills it. */
export function plural(n: number, copy: PluralCopy): string {
  return fill(pluralRules.select(n) === 'one' ? copy.one : copy.other, { n });
}

export type DueTone = 'danger' | 'warning' | 'neutral';

/** "Overdue by 2 days", "Due today", "Due tomorrow", "in 5 days" — with a tone for the badge. */
export function formatDueStatus(iso: string): { label: string; tone: DueTone } {
  const { ui } = productConfig;
  const delta = daysFromToday(iso);
  if (delta < 0) return { label: plural(-delta, ui.overdueBy), tone: 'danger' };
  if (delta === 0) return { label: ui.dueToday, tone: 'warning' };
  if (delta === 1) return { label: ui.dueTomorrow, tone: 'warning' };
  if (delta <= productConfig.clock.dueSoonDays) return { label: plural(delta, ui.dueInDays), tone: 'warning' };
  return { label: formatShortDate(iso), tone: 'neutral' };
}

/** Subscribes to a CSS media query. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', onChange);
      return () => list.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Picks the configured greeting for the clock's time of day. */
export function greetingFor(date: Date): string {
  const { greetings } = productConfig.dashboard;
  const hour = date.getHours();
  if (hour < 12) return greetings.morning;
  if (hour < 17) return greetings.afternoon;
  return greetings.evening;
}
