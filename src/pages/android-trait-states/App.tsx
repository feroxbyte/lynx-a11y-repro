import { useState } from '@lynx-js/react';

import { Control } from '../../shared/Control.js';
import type { Case } from '../../shared/Control.js';
import '../../shared/Page.css';

// A pressed toggle, a disabled button, switches and checkboxes, set up as an app would: iOS-style
// accessibility-traits lists ("button,selected") and accessibility-role-description. Tap any control
// to change it; with a screen reader, double-tap it and listen for the new state.
//
// Below, controls whose attributes the app removes, as it does when it passes undefined. After
// "Remove attributes", a screen reader should read them without the old role, state or actions.

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

export const SAVE: Case = { id: 'save', kind: 'button', label: 'Save', disabled: true };
export const THEME: Case = { id: 'theme', kind: 'switch', label: 'Theme' };
export const PHOTO: Case = { id: 'photo', kind: 'tile', label: 'Photo' };

export function App() {
  const [on, setOn] = useState(INITIAL);
  const [removed, setRemoved] = useState(false);
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

      <text className="Title Section">Removing attributes</text>
      <Control
        c={SAVE}
        on={false}
        attributes={{ 'accessibility-traits': removed ? undefined : 'button,disabled' }}
        expected={removed ? '' : 'Button, disabled'}
      />
      <Control
        c={THEME}
        on={false}
        attributes={{
          'accessibility-role-description': removed ? undefined : 'switch',
          'accessibility-status': removed ? undefined : 'Auto',
          'accessibility-traits': 'button',
        }}
        expected={removed ? 'Button' : 'Auto, Switch, off'}
      />
      <Control
        c={PHOTO}
        on={false}
        attributes={{ 'accessibility-actions': removed ? undefined : ['Share', 'Delete'] }}
        expected={removed ? '' : 'with actions Share and Delete'}
      />
      <view
        id="remove"
        className="Button"
        accessibility-element={true}
        accessibility-label={removed ? 'Restore attributes' : 'Remove attributes'}
        accessibility-traits="button"
        bindtap={() => setRemoved((value) => !value)}
      >
        <text accessibility-element={false} className="ButtonText">
          {removed ? 'Restore attributes' : 'Remove attributes'}
        </text>
      </view>
      <view className="PageEnd" />
    </scroll-view>
  );
}
