/**
 * Root layout and application entry. Routes are derived from the configured navigation; this file
 * only maps each navigation id to the page that implements it.
 */
import { StrictMode, type ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, Outlet, RouterProvider, type RouteObject } from 'react-router-dom';
import { productConfig } from '@/config';
import { applyTheme } from '@/lib/theme';
import { allNavigation } from '@/lib/navigation';
import { AppShell } from '@/components/layout/AppShell';
import '@/styles/tokens.css';
import '@/styles/globals.css';

import HomePage from './page';
import CalendarPage from './calendar/page';
import TasksPage from './tasks/page';
import ShoppingPage from './shopping/page';
import ExpensesPage from './expenses/page';
import DigitalHousePage from './digital-house/page';
import MaintenancePage from './maintenance/page';
import FamilyPage from './family/page';
import SettingsPage from './settings/page';

export interface ScreenPageProps {
  /** The navigation / screen id this page is mounted for. */
  screenId: string;
}

/** Page implementations by navigation id. Ids without an implementation fall back to a placeholder. */
const pages: Record<string, ComponentType<ScreenPageProps>> = {
  home: HomePage,
  calendar: CalendarPage,
  tasks: TasksPage,
  shopping: ShoppingPage,
  expenses: ExpensesPage,
  'digital-house': DigitalHousePage,
  maintenance: MaintenancePage,
  family: FamilyPage,
  settings: SettingsPage,
};
const FallbackPage = SettingsPage;

function RootLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}

function buildRoutes(): RouteObject[] {
  const children: RouteObject[] = allNavigation().map((item) => {
    const Page = pages[item.id] ?? FallbackPage;
    return { path: item.route, element: <Page key={item.id} screenId={item.id} /> };
  });
  children.push({ path: '*', element: <Navigate to={allNavigation()[0]?.route ?? '/'} replace /> });
  return [{ element: <RootLayout />, children }];
}

applyTheme(productConfig.theme);

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(
    <StrictMode>
      <RouterProvider router={createBrowserRouter(buildRoutes())} />
    </StrictMode>,
  );
}
