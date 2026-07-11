import React from 'react';
import './SummaryCard.css';

export default function SummaryCard({ summary = 'Great work! However, there are several issues that need to be addressed to fully meet the rubric requirements. Please review the issues below.' }) {
  return (
    <div className="summary-card">
      <div className="summary-card-header">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="summary-icon">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="summary-title">Summary</h3>
      </div>
      <p className="summary-text">{summary}</p>
    </div>
  );
}
