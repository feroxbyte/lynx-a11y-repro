import { root } from '@lynx-js/react';

import { Home } from './Home.js';
import { SafeArea } from './shared/SafeArea.js';

root.render(
  <SafeArea>
    <Home />
  </SafeArea>,
);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
