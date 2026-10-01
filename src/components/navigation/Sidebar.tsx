import { Link } from 'react-router-dom';
import { productConfig } from '@/config';
import { primaryNavigation } from '@/lib/navigation';
import { SidebarItem } from './SidebarItem';

export function Sidebar() {
  const { product, settings, ui } = productConfig;
  const items = primaryNavigation();
  return (
    <aside className="sidebar">
      <Link to={items[0]?.route ?? '/'} className="brand">
        <img className="brand__logo" src={product.logo} alt="" width={28} height={28} />
        <span className="brand__name">{product.shortName}</span>
      </Link>
      <nav aria-label={ui.mainNavigation} className="sidebar__nav">
        <ul className="sidebar__list">
          {items.map((item) => (
            <SidebarItem key={item.id} item={item} />
          ))}
        </ul>
      </nav>
      {settings.enabled && (
        <ul className="sidebar__list sidebar__list--footer">
          <SidebarItem item={settings} />
        </ul>
      )}
    </aside>
  );
}
