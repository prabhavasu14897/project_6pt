import type { ThemeConfig } from '@/types/product';

/** Maps the configured theme onto the CSS custom properties that tokens.css builds on. */
export function themeToCssVariables(theme: ThemeConfig): Record<string, string> {
  const { colors, typography, radius, spacing, shadows, motion } = theme;
  const vars: Record<string, string> = {
    '--color-background': colors.background,
    '--color-chrome': colors.chrome,
    '--color-surface': colors.surface,
    '--color-surface-elevated': colors.surfaceElevated,
    '--color-surface-strong': colors.surfaceStrong,
    '--color-primary': colors.primary,
    '--color-primary-foreground': colors.primaryForeground,
    '--color-secondary': colors.secondary,
    '--color-text': colors.text,
    '--color-text-secondary': colors.textSecondary,
    '--color-text-muted': colors.textMuted,
    '--color-border': colors.border,
    '--color-border-strong': colors.borderStrong,
    '--color-success': colors.success,
    '--color-warning': colors.warning,
    '--color-danger': colors.danger,
    '--color-ambient': colors.ambient,
    '--font-primary': typography.primary,
    '--font-numeric': typography.numeric,
    '--radius-sm': radius.small,
    '--radius-md': radius.medium,
    '--radius-lg': radius.large,
    '--radius-xl': radius.extraLarge,
    '--radius-full': radius.full,
    '--space-page': spacing.page,
    '--space-section': spacing.section,
    '--space-card': spacing.card,
    '--shadow-card': shadows.card,
    '--shadow-elevated': shadows.elevated,
    '--shadow-overlay': shadows.overlay,
    '--motion-fast': motion.fast,
    '--motion-base': motion.base,
    '--motion-slow': motion.slow,
    '--ease-out': motion.easing,
  };
  colors.chart.forEach((color, index) => {
    vars[`--color-chart-${index + 1}`] = color;
  });
  return vars;
}

export function applyTheme(theme: ThemeConfig, root: HTMLElement = document.documentElement): void {
  for (const [name, value] of Object.entries(themeToCssVariables(theme))) {
    root.style.setProperty(name, value);
  }
  root.dataset.theme = theme.mode;
  root.style.colorScheme = theme.mode;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme.colors.background);
}

/** CSS color for a configured chart palette slot, cycling when the palette is shorter than the data. */
export function chartColor(index: number, paletteSize: number): string {
  return `var(--color-chart-${(index % Math.max(paletteSize, 1)) + 1})`;
}
