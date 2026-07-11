import React from 'react';
import IssueSnippet from './IssueSnippet.jsx';
import './IssueRow.css';

export default function IssueRow({ file, message, snippet }) {
  return (
    <div className="issue-row">
      <div className="issue-row-left">
        <div className="issue-file-tag">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="issue-file-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>{file || 'General'}</span>
        </div>
        <p className="issue-message">{message}</p>
        <span className="issue-category-tag">General</span>
      </div>
      <div className="issue-row-right">
        <IssueSnippet snippet={snippet} />
      </div>
    </div>
  );
}
