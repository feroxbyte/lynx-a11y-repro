import { useState } from '@lynx-js/react';

import { PAGES } from './pages.js';
import './Home.css';
import './shared/Page.css';

// Lists every page; tapping one opens it, with a button back to the list.
export function Home() {
  const [open, setOpen] = useState<string | null>(null);
  const page = PAGES.find((p) => p.meta.name === open);

  if (page) {
    return (
      <view className="Shell">
        <view
          className="Back"
          accessibility-element={true}
          accessibility-label="All pages"
          accessibility-traits="button"
          bindtap={() => setOpen(null)}
        >
          <text className="BackText" accessibility-element={false}>
            ‹ All pages
          </text>
        </view>
        <view className="ShellPage">
          <page.App />
        </view>
      </view>
    );
  }

  return (
    <scroll-view className="Page" scroll-orientation="vertical">
      <text className="Title">Lynx accessibility repros</text>
      {PAGES.map(({ meta }) => {
        const issue = meta.issue ? `lynx#${meta.issue}` : 'issue not filed yet';
        return (
          <view
            key={meta.name}
            className="Entry"
            accessibility-element={true}
            accessibility-label={`${meta.title}, ${meta.platform}, ${issue}`}
            accessibility-traits="button"
            bindtap={() => setOpen(meta.name)}
          >
            <text className="EntryTitle" accessibility-element={false}>
              {meta.title}
            </text>
            <text className="EntryDetail" accessibility-element={false}>
              {meta.platform} · {issue}
            </text>
            <text className="EntryDetail" accessibility-element={false}>
              {meta.summary}
            </text>
          </view>
        );
      })}
    </scroll-view>
  );
}
