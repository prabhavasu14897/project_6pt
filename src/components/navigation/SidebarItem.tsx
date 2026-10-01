import { NavLink } from 'react-router-dom';
import type { NavigationItem } from '@/types/navigation';
import { cn } from '@/lib/utils';
import { NavigationIcon } from './NavigationIcon';

export function SidebarItem({ item }: { item: NavigationItem }) {
  return (
    <li>
      <NavLink
        to={item.route}
        end={item.route === '/'}
        className={({ isActive }) => cn('sidebar-item', isActive && 'is-active')}
        title={item.label}
      >
        <NavigationIcon name={item.icon} size={20} />
        <span className="sidebar-item__label">{item.label}</span>
      </NavLink>
    </li>
  );
}
