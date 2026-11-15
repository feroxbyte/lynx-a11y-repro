// Every page, for the home app (index.lynx.bundle). Add a line here when adding a page.
import { App as AndroidTraitStates } from './pages/android-trait-states/App.js';
import { meta as androidTraitStates } from './pages/android-trait-states/meta.js';
import { App as AndroidAnnounceLinksLists } from './pages/android-announce-links-lists/App.js';
import { meta as androidAnnounceLinksLists } from './pages/android-announce-links-lists/meta.js';
import type { PageMeta } from './shared/PageMeta.js';

export const PAGES: { meta: PageMeta; App: () => JSX.Element }[] = [
  { meta: androidTraitStates, App: AndroidTraitStates },
  { meta: androidAnnounceLinksLists, App: AndroidAnnounceLinksLists },
];
