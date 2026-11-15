import type { ReactNode } from '@lynx-js/react';

import './SafeArea.css';

// Keeps the page clear of the status bar, camera cutout and home indicator. Lynx fills
// env(safe-area-inset-*) on iOS; on Android it is 0, so pages are opened without fullscreen there
// and the host keeps its status bar.
export function SafeArea({ children }: { children: ReactNode }) {
  return <view className="SafeArea">{children}</view>;
}
