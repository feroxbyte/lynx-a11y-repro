import { useState } from '@lynx-js/react';

import '../../shared/Control.css';
import '../../shared/Page.css';
import './App.css';

// Three things TalkBack misses on Android: an announcement, a link inside <text>, and a list
// item's position. Each section shows what happened and what a screen reader should say.

// accessibilityAnnounce is not in @lynx-js/types.
const lynxWithAnnounce = lynx as unknown as {
  accessibilityAnnounce: (p: { content: string }, cb: (r: { msg?: string }) => void) => void;
};

const FOLDERS = ['Inbox', 'Starred', 'Sent', 'Drafts', 'Trash'];

export function App() {
  const [reply, setReply] = useState('');
  const [link, setLink] = useState('none');

  return (
    <scroll-view className="Page" scroll-orientation="vertical">
      <text className="Title">Announcements, links and lists</text>

      <text className="Section">lynx.accessibilityAnnounce</text>
      <view
        className="Button"
        accessibility-element={true}
        accessibility-label="Save"
        accessibility-traits="button"
        bindtap={() =>
          lynxWithAnnounce.accessibilityAnnounce({ content: 'Saved' }, (r) =>
            setReply(JSON.stringify(r)),
          )
        }
      >
        <text accessibility-element={false} className="ButtonText">Save</text>
      </view>
      <text className="Caption" accessibility-element={false}>
        Announces "Saved". Reply: {reply || '(not tapped yet)'}
      </text>
      <text className="Caption CaptionExpected" accessibility-element={false}>
        Screen reader should say: Saved
      </text>

      <text className="Section">Links inside text</text>
      <text accessibility-element={true} className="Sentence">
        Read the{' '}
        <text className="Link" bindtap={() => setLink('terms')}>terms</text> and the{' '}
        <text className="Link" bindtap={() => setLink('privacy policy')}>privacy policy</text>.
      </text>
      <text className="Caption" accessibility-element={false}>
        Last link opened: {link}
      </text>
      <text className="Caption CaptionExpected" accessibility-element={false}>
        Screen reader: open "terms" from its links or actions menu; "Last link opened" should change
      </text>

      <text className="Section">List</text>
      <list scroll-orientation="vertical" className="Folders">
        {FOLDERS.map((name, i) => (
          <list-item item-key={`folder-${i}`} key={name}>
            <view className="Folder" accessibility-element={true} accessibility-label={name}>
              <text accessibility-element={false} className="FolderText">{name}</text>
            </view>
          </list-item>
        ))}
      </list>
      <text className="Caption CaptionExpected" accessibility-element={false}>
        Screen reader should say: Inbox, 1 of 5, in list, 5 items
      </text>
      <view className="PageEnd" />
    </scroll-view>
  );
}
