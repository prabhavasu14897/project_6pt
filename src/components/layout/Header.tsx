import { Link } from 'react-router-dom';
import { productConfig } from '@/config';
import { currentUser } from '@/data/prototype';
import { Avatar } from '@/components/ui/Avatar';

/** Compact top bar for phone and tablet widths, where the sidebar is not shown. */
export function Header() {
  const { product, navigation, ui } = productConfig;
  const user = currentUser();
  return (
    <header className="app-header">
      <Link to={navigation[0]?.route ?? '/'} className="brand">
        <img className="brand__logo" src={product.logo} alt="" width={26} height={26} />
        <span className="brand__name">{product.shortName}</span>
      </Link>
      {user && (
        <span className="app-header__user" title={ui.account}>
          <Avatar name={user.name} src={user.avatar} size={34} />
        </span>
      )}
    </header>
  );
}
