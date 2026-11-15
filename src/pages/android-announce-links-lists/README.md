# android-announce-links-lists

**Issue:** [lynx-family/lynx#11001](https://github.com/lynx-family/lynx/issues/11001)
**Platform:** Android (TalkBack)

Three things TalkBack misses on Android:

1. `lynx.accessibilityAnnounce` replies `{"msg":"Success"}`, but TalkBack says nothing.
2. A tappable span inside `<text>` is listed by TalkBack, but opening it does nothing; its
   `bindtap` never fires. A touch works.
3. `<list>` items are read without their position or the list size. A native Android list is read
   as "Inbox, 1/5, in list, 5 items".

## Steps

1. `pnpm run dev`, then open `android-announce-links-lists.lynx.bundle` in LynxExplorer.
2. Turn on TalkBack.
3. Double-tap "Save" and listen for "Saved".
4. Focus the sentence, double-tap it, and pick "terms" from TalkBack's list. "Last link opened"
   should change to "terms".
5. Swipe from "List" into the list and listen for the position.

## Expected

| Section | TalkBack should say or do |
| --- | --- |
| Save | "Saved" |
| Links | Opening "terms" from TalkBack sets "Last link opened: terms" |
| List | "Inbox, 1/5, in list, 5 items" |
