import type { ReactNode } from 'react';

export function ContentContainer({ children }: { children: ReactNode }) {
  return (
    <main id="main" className="content" tabIndex={-1}>
      <div className="content__inner">{children}</div>
    </main>
  );
}
