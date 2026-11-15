import { readdirSync } from 'node:fs';

import { pluginQRCode } from '@lynx-js/qrcode-rsbuild-plugin';
import { pluginReactLynx } from '@lynx-js/react-rsbuild-plugin';
import { defineConfig } from '@lynx-js/rspeedy';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';

// index.lynx.bundle is the home app with every page. Every folder in src/pages is also its own
// bundle, dist/<folder>.lynx.bundle, for linking from its issue.
const pages = readdirSync('src/pages', { withFileTypes: true }).filter((entry) => entry.isDirectory());

export default defineConfig({
  source: {
    entry: {
      index: './src/index.tsx',
      ...Object.fromEntries(pages.map((page) => [page.name, `./src/pages/${page.name}/index.tsx`])),
    },
  },
  plugins: [
    // Not fullscreen: LynxExplorer then keeps the status bar, so pages stay clear of the camera
    // cutout on Android, where env(safe-area-inset-top) is 0.
    pluginQRCode(),
    pluginReactLynx(),
    pluginTypeCheck(),
  ],
});
