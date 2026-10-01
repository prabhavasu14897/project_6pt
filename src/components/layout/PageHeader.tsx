import type { ReactNode } from 'react';
import { productConfig } from '@/config';
import { currentUser } from '@/data/prototype';
import { formatLongDate, now } from '@/lib/utils';
import { Avatar } from '@/components/ui/Avatar';

export interface PageHeaderProps {
  title: string;
  description?: string;
  /** Page-level actions (primary button, filters). */
  actions?: ReactNode;
  /** Show today's date and the signed-in member on the right. */
  showDate?: boolean;
}

export function PageHeader({ title, description, actions, showDate = false }: PageHeaderProps) {
  const user = currentUser();
  const date = now();
  return (
    <div className="page-header">
      <div className="page-header__text">
        <h1 className="page-header__title">{title}</h1>
        {description && <p className="page-header__description">{description}</p>}
      </div>
      <div className="page-header__aside">
        {actions}
        {showDate && (
          <time className="page-header__date" dateTime={date.toISOString().slice(0, 10)}>
            {formatLongDate(date)}
          </time>
        )}
        {user && (
          <span className="page-header__user" title={productConfig.ui.account}>
            <Avatar name={user.name} src={user.avatar} size={36} />
          </span>
        )}
      </div>
    </div>
  );
}
