# lynx-a11y-repro

Minimal ReactLynx pages that reproduce accessibility bugs in [Lynx](https://github.com/lynx-family/lynx).
One page per issue. Each page shows controls styled like the real thing (buttons, switches,
checkboxes) that set their accessibility attributes the way an app would. Under each control, a
caption lists those attributes and what a screen reader should say, so you can compare it with
what you hear.

## Pages

| Page | Platform | Issue | What it shows |
| --- | --- | --- | --- |
| [`android-trait-states`](src/pages/android-trait-states) | Android | (not filed yet) | `accessibility-traits` lists and switch/checkbox states are not read |

## Getting Started

Install the dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm run dev
```

Every page is served as `<page>.lynx.bundle`. Open one in LynxExplorer (scan the QR code in the
terminal, or enter the printed URL), turn on TalkBack (Android) or VoiceOver (iOS), and follow the
steps in the page's README.

## Adding a page

1. Create `src/pages/<page>/` with an `index.tsx` that renders the page. It is picked up as
   `<page>.lynx.bundle` without any config change.
2. Use the controls in `src/shared/Control.tsx`, or add a new kind there so other pages can
   reuse it.
3. Add a `README.md` in the folder (issue link, platform, steps, expected results) and a line to
   the table above.
