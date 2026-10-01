import type { IconName } from '@/components/navigation/NavigationIcon';

export interface NavigationItem {
  /** Matches a key in `screens`; also used to resolve the page implementation. */
  id: string;
  label: string;
  icon: IconName;
  route: string;
  enabled: boolean;
  /** Shown directly in the mobile bottom bar; everything else goes into the "more" sheet. */
  mobilePrimary?: boolean;
}

export interface ScreenConfig {
  title: string;
  description: string;
  primaryAction?: string;
  enabled: boolean;
}
