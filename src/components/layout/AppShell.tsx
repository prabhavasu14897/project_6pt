import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { productConfig } from '@/config';
import { allNavigation, isRouteActive, screenFor } from '@/lib/navigation';
import { Sidebar } from '@/components/navigation/Sidebar';
import { MobileNavigation } from '@/components/navigation/MobileNavigation';
import { Toaster } from '@/components/ui/Toast';
import { ContentContainer } from './ContentContainer';
import { Header } from './Header';

export function AppShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  // Document title follows the active screen, then the product name.
  useEffect(() => {
    const active = [...allNavigation()].reverse().find((item) => isRouteActive(item.route, pathname));
    const screen = active ? screenFor(active.id) : undefined;
    const { name } = productConfig.product;
    document.title = screen ? `${screen.title} · ${name}` : name;
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        {productConfig.ui.skipToContent}
      </a>
      <Sidebar />
      <div className="app-shell__main">
        <Header />
        <ContentContainer>{children}</ContentContainer>
      </div>
      <MobileNavigation />
      <Toaster />
    </div>
  );
}
