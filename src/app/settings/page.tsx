import { productConfig } from '@/config';
import { findNavigation, screenFor } from '@/lib/navigation';
import { PageHeader } from '@/components/layout/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import type { ScreenPageProps } from '@/app/layout';

/** Placeholder until this screen's build step; title, copy and icon already come from configuration. */
export default function SettingsPage({ screenId }: ScreenPageProps) {
  const { ui } = productConfig;
  const screen = screenFor(screenId);
  return (
    <>
      <PageHeader title={screen?.title ?? ''} description={screen?.description} />
      <EmptyState icon={findNavigation(screenId)?.icon ?? 'Settings'} title={ui.comingSoon} hint={ui.comingSoonHint} />
    </>
  );
}
