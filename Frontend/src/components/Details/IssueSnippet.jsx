import React, { useState } from 'react';
import './IssueSnippet.css';

export default function IssueSnippet({ snippet }) {
  const [copied, setCopied] = useState(false);

  if (!snippet) {
    return <span className="issue-snippet-empty">No code snippet</span>;
  }

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(snippet).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="issue-snippet-block">
      <button className="issue-snippet-copy-btn" onClick={handleCopy} title="Copy to clipboard">
        {copied ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="copy-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="copy-icon">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </svg>
        )}
      </button>
      <pre className="issue-snippet-code"><code>{snippet}</code></pre>
    </div>
  );
}
