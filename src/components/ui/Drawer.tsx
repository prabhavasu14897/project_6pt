import { useEffect, useRef, type ReactNode } from 'react';
import { productConfig } from '@/config';
import { cn } from '@/lib/utils';
import { IconButton } from './IconButton';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** `bottom` is a mobile sheet; `right` is a side panel. */
  side?: 'bottom' | 'right';
  children: ReactNode;
  className?: string;
}

/** Native <dialog> drawer: focus trap, Escape and inert background come from the platform. */
export function Drawer({ open, onClose, title, side = 'bottom', children, className }: DrawerProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={cn('drawer', `drawer--${side}`, className)}
      aria-label={title}
      onClose={onClose}
      onClick={(event) => {
        // A click on the dialog element itself (not its content) is a click on the backdrop.
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="drawer__content">
        {side === 'bottom' && <span className="drawer__grabber" aria-hidden="true" />}
        <header className="drawer__header">
          <h2 className="drawer__title">{title}</h2>
          <IconButton icon="Close" label={productConfig.ui.close} onClick={onClose} />
        </header>
        {children}
      </div>
    </dialog>
  );
}
