# lynx-a11y-repro

Minimal ReactLynx pages that reproduce accessibility bugs in [Lynx](https://github.com/lynx-family/lynx).
One page per issue. Each page shows controls styled like the real thing (buttons, switches,
checkboxes) that set their accessibility attributes the way an app would. Under each control, a
caption lists those attributes and what a screen reader should say, so you can compare it with
what you hear.

## Pages

| Page | Platform | Issue | What it shows |
| --- | --- | --- | --- |
| [`android-trait-states`](src/pages/android-trait-states) | Android | [#10999](https://github.com/lynx-family/lynx/issues/10999) | `accessibility-traits` lists and switch/checkbox states are not read |
| [`android-announce-links-lists`](src/pages/android-announce-links-lists) | Android | [#11001](https://github.com/lynx-family/lynx/issues/11001) | `accessibilityAnnounce` is silent, `<text>` links can't be opened, `<list>` has no position |

## Getting Started

Install the dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm run dev
```

Open `index.lynx.bundle` in LynxExplorer (scan the QR code in the terminal, or enter the printed
URL) for a list of every page; tap one to open it. Each page is also served on its own as
`<page>.lynx.bundle`, which is what its issue links to. Turn on TalkBack (Android) or VoiceOver
(iOS) and follow the steps in the page's README.

Open pages without `?fullscreen=true`: on Android, Lynx leaves `env(safe-area-inset-top)` at 0,
so a fullscreen page would sit under the status bar and camera cutout. Every page is wrapped in
`SafeArea` (`src/shared/SafeArea.tsx`), which applies the insets where Lynx provides them (iOS).

## Adding a page

1. Create `src/pages/<page>/` with:
   - `App.tsx`: the page. Use the controls in `src/shared/Control.tsx`, or add a new kind there
     so other pages can reuse it.
   - `index.tsx`: renders `App` on its own. It is built as `<page>.lynx.bundle` without any
     config change.
   - `meta.ts`: title, platform, summary and issue number, for the home list.
   - `README.md`: issue link, platform, steps, expected results.
2. Add the page to `src/pages.ts` (home list) and to the table above.
