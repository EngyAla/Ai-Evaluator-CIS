import React from 'react';
import ScoreBadge from '../Common/ScoreBadge.jsx';
import StatusBadge from '../Common/StatusBadge.jsx';
import './StudentInfoCard.css';

/**
 * Student identity + score header card in the details pane.
 * When status is Error, score-related elements are hidden.
 */
export default function StudentInfoCard({
  student = 'Student',
  repository = '',
  score = null,
  maxScore = 100,
  status = 'Waiting',
  totalIssues = null,
}) {
  const initial = student ? student.charAt(0).toUpperCase() : '?';
  const isError = status === 'Error';
  const showScore = !isError && score !== null;

  // Ensure repository is displayed with https:// link if it starts with github.com
  const repoHref = repository.startsWith('https://') ? repository : `https://${repository}`;

  return (
    <div className="student-info-card">
      <div className="student-info-top">
        <div className="student-info-identity">
          <div className="student-avatar">{initial}</div>
          <div className="student-info-text">
            <h2 className="student-info-name">{student}</h2>
            {repository && (
              <a href={repoHref} target="_blank" rel="noopener noreferrer" className="student-info-repo">
                {repository}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="external-link-icon">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>
        {showScore && (
          <div className="student-info-score-block">
            <span className="student-info-score-label">Overall Score</span>
            <ScoreBadge score={score} maxScore={maxScore} size="large" />
            <StatusBadge status={status} />
          </div>
        )}
        {isError && (
          <div className="student-info-score-block">
            <StatusBadge status="Error" />
          </div>
        )}
      </div>

      <div className="student-info-meta">
        <div className="meta-block">
          <span className="meta-label">Status</span>
          <span className="meta-value">{status}</span>
        </div>
        {totalIssues !== null && (
          <div className="meta-block">
            <span className="meta-label">Total Issues</span>
            <span className="meta-value">{totalIssues}</span>
          </div>
        )}
      </div>
    </div>
  );
}
