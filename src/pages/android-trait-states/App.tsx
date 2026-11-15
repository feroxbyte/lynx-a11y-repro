import { useState } from '@lynx-js/react';

import { Control } from '../../shared/Control.js';
import type { Case } from '../../shared/Control.js';
import '../../shared/Page.css';

// A pressed toggle, a disabled button, switches and checkboxes, set up as an app would: iOS-style
// accessibility-traits lists ("button,selected") and accessibility-role-description. Tap any control
// to change it; with a screen reader, double-tap it and listen for the new state.

export const CASES: Case[] = [
  { id: 'bold', kind: 'toggle', label: 'Bold' },
  { id: 'send', kind: 'button', label: 'Send', disabled: true },
  { id: 'wifi', kind: 'switch', label: 'Wi-Fi' },
  { id: 'bluetooth', kind: 'switch', label: 'Bluetooth' },
  { id: 'agree', kind: 'checkbox', label: 'Agree' },
  { id: 'remember', kind: 'checkbox', label: 'Remember me' },
  {
    id: 'night-light',
    kind: 'switch',
    label: 'Night light',
    extra: (on) => ({ 'accessibility-status': on ? 'on' : 'off' }),
  },
];

export const INITIAL: Record<string, boolean> = {
  bold: true,
  send: false,
  wifi: true,
  bluetooth: false,
  agree: true,
  remember: false,
  'night-light': true,
};

export function App() {
  const [on, setOn] = useState(INITIAL);
  return (
    <scroll-view className="Page" scroll-orientation="vertical">
      <text className="Title">Toggles, switches and checkboxes</text>
      {CASES.map((c) => (
        <Control
          key={c.id}
          c={c}
          on={on[c.id]}
          onTap={() => setOn((state) => ({ ...state, [c.id]: !state[c.id] }))}
        />
      ))}
    </scroll-view>
  );
}
