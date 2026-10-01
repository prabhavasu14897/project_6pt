import { productConfig } from '@/config';
import type { NavigationItem, ScreenConfig } from '@/types/navigation';

/** Enabled navigation items, in configured order, whose screen is also enabled. */
export function primaryNavigation(): NavigationItem[] {
  return productConfig.navigation.filter((item) => item.enabled && isScreenEnabled(item.id));
}

/** Everything routable: the primary navigation plus settings. */
export function allNavigation(): NavigationItem[] {
  const { settings } = productConfig;
  return settings.enabled ? [...primaryNavigation(), settings] : primaryNavigation();
}

export function findNavigation(id: string): NavigationItem | undefined {
  return allNavigation().find((item) => item.id === id);
}

/** Route for a navigation id; falls back to the first route so a renamed id never yields a dead link. */
export function routeFor(id: string): string {
  return findNavigation(id)?.route ?? allNavigation()[0]?.route ?? '/';
}

export function screenFor(id: string): ScreenConfig | undefined {
  return productConfig.screens[id];
}

function isScreenEnabled(id: string): boolean {
  return productConfig.screens[id]?.enabled ?? true;
}

/** Whether `pathname` is inside the section that `route` heads. */
export function isRouteActive(route: string, pathname: string): boolean {
  if (route === '/') return pathname === '/';
  return pathname === route || pathname.startsWith(`${route}/`);
}
