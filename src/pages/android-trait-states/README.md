# android-trait-states

**Issue:** [lynx-family/lynx#10999](https://github.com/lynx-family/lynx/issues/10999)
**Platform:** Android (iOS reads the same attributes correctly)

On Android, `accessibility-traits` with more than one value (`"button,selected"`) is not read,
and switches and checkboxes marked with `accessibility-role-description` are never read as on/off
or checked. The controls look pressed, disabled, on or checked, but TalkBack doesn't say so.
Removing these attributes at runtime doesn't clear them either, and removing
`accessibility-actions` throws a NullPointerException.

## Steps

1. `pnpm run dev`, then open `android-trait-states.lynx.bundle` in LynxExplorer.
2. Turn on TalkBack and swipe through the controls.
3. Double-tap a switch or checkbox and listen for its new state.
4. Scroll to "Removing attributes", tap "Remove attributes", and swipe to Save, Theme and Photo
   again.

## Expected

| Control | Attributes it sets | TalkBack should say |
| --- | --- | --- |
| Bold (pressed toggle) | `accessibility-traits="button,selected"` | Bold, Button, selected |
| Send (disabled button) | `accessibility-traits="button,disabled"` | Send, Button, disabled |
| Wi-Fi (switch, on) | `accessibility-role-description="switch"`<br>`accessibility-traits="button,selected"` | Wi-Fi, Switch, on |
| Bluetooth (switch, off) | `accessibility-role-description="switch"`<br>`accessibility-traits="button"` | Bluetooth, Switch, off |
| Agree (checkbox, checked) | `accessibility-role-description="checkbox"`<br>`accessibility-traits="button,selected"` | Agree, Checkbox, checked |
| Remember me (checkbox) | `accessibility-role-description="checkbox"`<br>`accessibility-traits="button"` | Remember me, Checkbox, not checked |
| Night light (switch, on) | `accessibility-role-description="switch"`<br>`accessibility-status="on"`<br>`accessibility-traits="button,selected"` | Night light, Switch, on (label once) |

Double-tapping a control flips its state; TalkBack should then say the new state.

### Removing attributes

"Remove attributes" removes these attributes, as an app does when it passes `undefined`:

| Control | Attributes removed | TalkBack should say after |
| --- | --- | --- |
| Save (disabled button) | `accessibility-traits="button,disabled"` | Save |
| Theme (switch) | `accessibility-role-description="switch"`<br>`accessibility-status="Auto"` | Theme, Button |
| Photo | `accessibility-actions={["Share","Delete"]}` | Photo (no actions), and no error |
