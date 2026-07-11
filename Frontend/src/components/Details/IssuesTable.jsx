import React from 'react';
import IssueRow from './IssueRow.jsx';
import './IssuesTable.css';

/**
 * Renders the list of evaluation issues.
 * Empty array results in a "no issues" state.
 */
export default function IssuesTable({ issues = [] }) {
  return (
    <div className="issues-table">
      <div className="issues-table-header">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="issues-header-icon">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 className="issues-title">Issues ({issues.length})</h3>
      </div>
      {issues.length > 0 ? (
        <div className="issues-list">
          {issues.map((issue, i) => (
            <IssueRow key={i} {...issue} />
          ))}
        </div>
      ) : (
        <p className="issues-empty">No issues found. Great work!</p>
      )}
    </div>
  );
}
