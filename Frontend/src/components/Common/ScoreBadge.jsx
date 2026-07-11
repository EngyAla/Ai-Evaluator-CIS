import React from 'react';
import './ScoreBadge.css';

export default function ScoreBadge({ score, maxScore = 100, size = 'medium' }) {
  if (score === null || score === undefined) {
    return <span className="score-placeholder">—</span>;
  }
  
  const isPass = score >= 60;

  return (
    <div className={`score-badge score-badge-${size} ${isPass ? 'score-pass' : 'score-fail'}`}>
      <span className="score-num">{Math.max(0, Math.min(score, 100))}</span>
      <span className="score-sep">/</span>
      <span className="score-max">{maxScore}</span>
    </div>
  );
}
