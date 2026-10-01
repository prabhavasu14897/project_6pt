import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { productConfig } from '@/config';
import { allNavigation, isRouteActive } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { Drawer } from '@/components/ui/Drawer';
import { NavigationIcon } from './NavigationIcon';

/** Bottom bar: configured primary items plus a "more" sheet for everything else. */
export function MobileNavigation() {
  const { ui } = productConfig;
  const { pathname } = useLocation();
  const [moreOpen, setMoreOpen] = useState(false);
  const items = allNavigation();
  const primary = items.filter((item) => item.mobilePrimary);
  const overflow = items.filter((item) => !item.mobilePrimary);
  const overflowActive = overflow.some((item) => isRouteActive(item.route, pathname));

  useEffect(() => setMoreOpen(false), [pathname]);

  return (
    <>
      <nav className="mobile-nav" aria-label={ui.mainNavigation}>
        <ul className="mobile-nav__list">
          {primary.map((item) => (
            <li key={item.id}>
              <NavLink to={item.route} end={item.route === '/'} className={({ isActive }) => cn('mobile-nav__item', isActive && 'is-active')}>
                <span className="mobile-nav__icon">
                  <NavigationIcon name={item.icon} size={22} />
                </span>
                <span className="mobile-nav__label">{item.label}</span>
              </NavLink>
            </li>
          ))}
          {overflow.length > 0 && (
            <li>
              <button
                type="button"
                className={cn('mobile-nav__item', overflowActive && 'is-active')}
                aria-haspopup="dialog"
                aria-expanded={moreOpen}
                onClick={() => setMoreOpen(true)}
              >
                <span className="mobile-nav__icon">
                  <NavigationIcon name="More" size={22} />
                </span>
                <span className="mobile-nav__label">{ui.more}</span>
              </button>
            </li>
          )}
        </ul>
      </nav>
      <Drawer open={moreOpen} onClose={() => setMoreOpen(false)} title={ui.more}>
        <ul className="more-grid">
          {overflow.map((item) => (
            <li key={item.id}>
              <NavLink to={item.route} className={({ isActive }) => cn('more-grid__item', isActive && 'is-active')}>
                <span className="more-grid__icon">
                  <NavigationIcon name={item.icon} size={22} />
                </span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </Drawer>
    </>
  );
}
