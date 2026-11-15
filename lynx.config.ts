import { readdirSync } from 'node:fs';

import { pluginQRCode } from '@lynx-js/qrcode-rsbuild-plugin';
import { pluginReactLynx } from '@lynx-js/react-rsbuild-plugin';
import { defineConfig } from '@lynx-js/rspeedy';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';

// Every folder in src/pages is a page, built to dist/<folder>.lynx.bundle.
const pages = readdirSync('src/pages', { withFileTypes: true }).filter((entry) => entry.isDirectory());

export default defineConfig({
  source: {
    entry: Object.fromEntries(
      pages.map((page) => [page.name, `./src/pages/${page.name}/index.tsx`]),
    ),
  },
  plugins: [
    pluginQRCode({
      schema(url) {
        // We use `?fullscreen=true` to open the page in LynxExplorer in full screen mode
        return `${url}?fullscreen=true`;
      },
    }),
    pluginReactLynx(),
    pluginTypeCheck(),
  ],
});
