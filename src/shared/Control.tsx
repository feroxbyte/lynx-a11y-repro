// Controls styled like the real thing (button, toggle button, switch, checkbox, tile) that set their
// accessibility attributes the way an app would, from the same state that drives their look.
// Under each, a caption shows those attributes and what a screen reader should say, so a tester
// can compare it with what they hear.

import './Control.css';

// A tile is a plain element, such as a photo, that carries custom accessibility-actions.
export type Kind = 'button' | 'toggle' | 'switch' | 'checkbox' | 'tile';

export interface Case {
  id: string;
  kind: Kind;
  label: string;
  // A button that can't be used.
  disabled?: boolean;
  // Extra attributes the case adds for a state, such as accessibility-status.
  extra?: (on: boolean) => Record<string, string>;
}

// What the element sets, as iOS-style traits plus a role description for switches and checkboxes.
export function attributesFor(c: Case, on: boolean): Record<string, string | undefined> {
  const states = [
    'button',
    ...(c.kind !== 'button' && on ? ['selected'] : []),
    ...(c.disabled ? ['disabled'] : []),
  ];
  return {
    ...(c.kind === 'switch' || c.kind === 'checkbox'
      ? { 'accessibility-role-description': c.kind }
      : {}),
    ...c.extra?.(on),
    'accessibility-traits': states.join(','),
  };
}

// What a screen reader should say, in TalkBack's words.
export function expectedFor(c: Case, on: boolean): string {
  switch (c.kind) {
    case 'button':
      return c.disabled ? 'Button, disabled' : 'Button';
    case 'toggle':
      return on ? 'Button, selected' : 'Button';
    case 'switch':
      return on ? 'Switch, on' : 'Switch, off';
    case 'checkbox':
      return on ? 'Checkbox, checked' : 'Checkbox, not checked';
    case 'tile':
      return '';
  }
}

// The look only: the element itself carries the label and state, so these texts stay hidden from
// screen readers.
function Visual({ c, on }: { c: Case; on: boolean }) {
  switch (c.kind) {
    case 'button':
      return (
        <view className={c.disabled ? 'Button ButtonDisabled' : 'Button'}>
          <text accessibility-element={false} className="ButtonText">{c.label}</text>
        </view>
      );
    case 'toggle':
      return (
        <view className={on ? 'Toggle TogglePressed' : 'Toggle'}>
          <text accessibility-element={false} className={on ? 'ToggleText TogglePressedText' : 'ToggleText'}>{c.label}</text>
        </view>
      );
    case 'switch':
      return (
        <view className="Line">
          <text accessibility-element={false} className="LineLabel">{c.label}</text>
          <view className={on ? 'Track TrackOn' : 'Track'}>
            <view className={on ? 'Thumb ThumbOn' : 'Thumb'} />
          </view>
        </view>
      );
    case 'checkbox':
      return (
        <view className="Line">
          <view className={on ? 'Box BoxChecked' : 'Box'}>
            {on ? <text accessibility-element={false} className="Check">✓</text> : null}
          </view>
          <text accessibility-element={false} className="LineLabel BoxLabel">{c.label}</text>
        </view>
      );
    case 'tile':
      return (
        <view className="Tile">
          <text accessibility-element={false} className="TileText">{c.label}</text>
        </view>
      );
  }
}

export function Control({
  c,
  on,
  onTap,
  attributes = attributesFor(c, on),
  expected = expectedFor(c, on),
}: {
  c: Case;
  on: boolean;
  onTap?: () => void;
  // Override what the element sets, for cases that change the attributes themselves.
  attributes?: Record<string, string | string[] | undefined>;
  expected?: string;
}) {
  const names = Object.keys(attributes).filter((name) => attributes[name] !== undefined);
  return (
    // No wrapper view: Lynx marks a view that is not an accessibility element as not visible, and
    // tools such as uiautomator then skip everything inside it.
    <>
      <view
        id={c.id}
        className="Control"
        accessibility-element={true}
        accessibility-label={c.label}
        {...attributes}
        bindtap={c.disabled ? undefined : onTap}
      >
        <Visual c={c} on={on} />
      </view>
      <text className="Caption" accessibility-element={false}>
        {names.length
          ? names
              .map((name) => {
                const value = attributes[name];
                return Array.isArray(value)
                  ? `${name}={${JSON.stringify(value)}}`
                  : `${name}="${value}"`;
              })
              .join('\n')
          : '(no accessibility attributes)'}
      </text>
      <text className="Caption CaptionExpected" accessibility-element={false}>
        Screen reader should say: {c.label}
        {expected ? `, ${expected}` : ''}
      </text>
    </>
  );
}
