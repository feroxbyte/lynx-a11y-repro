import { root } from '@lynx-js/react';

import { SafeArea } from '../../shared/SafeArea.js';
import { App } from './App.js';

root.render(
  <SafeArea>
    <App />
  </SafeArea>,
);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
