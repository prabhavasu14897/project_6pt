import { useSyncExternalStore } from 'react';
import type { Tone } from '@/types/dashboard';
import { cn } from '@/lib/utils';
import { NavigationIcon } from '@/components/navigation/NavigationIcon';

export interface ToastOptions {
  message: string;
  tone?: Extract<Tone, 'success' | 'warning' | 'danger' | 'neutral'>;
  action?: { label: string; onAction: () => void };
  /** Milliseconds before auto-dismiss. */
  duration?: number;
}

interface ToastEntry extends ToastOptions {
  id: number;
}

let toasts: ToastEntry[] = [];
let counter = 0;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export function dismissToast(id: number): void {
  toasts = toasts.filter((t) => t.id !== id);
  emit();
}

/** Shows transient feedback for an action. Returns the toast id. */
export function toast(options: ToastOptions): number {
  const id = ++counter;
  toasts = [...toasts.slice(-2), { ...options, id }];
  emit();
  window.setTimeout(() => dismissToast(id), options.duration ?? 5000);
  return id;
}

/** Mount once in the app shell. */
export function Toaster() {
  const items = useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => toasts,
    () => toasts,
  );
  return (
    <div className="toaster" role="status" aria-live="polite">
      {items.map((t) => (
        <div key={t.id} className={cn('toast', `tone-${t.tone ?? 'neutral'}`)}>
          <span className="toast__icon">
            <NavigationIcon name={t.tone === 'danger' || t.tone === 'warning' ? 'Alert' : 'Check'} size={16} strokeWidth={2.2} />
          </span>
          <span className="toast__message">{t.message}</span>
          {t.action && (
            <button
              type="button"
              className="toast__action"
              onClick={() => {
                t.action?.onAction();
                dismissToast(t.id);
              }}
            >
              {t.action.label}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
