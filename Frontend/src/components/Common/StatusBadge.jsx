import React from 'react';
import './StatusBadge.css';

/**
 * Color-coded status badge.
 *
 * Supported statuses:
 *   Passed / Completed  → green (success)
 *   Failed / Error      → red   (error)
 *   Waiting             → gray  (warning)
 *   Evaluating          → teal  (info / primary)
 */
export default function StatusBadge({ status }) {
  if (!status) return null;
  const s = status.toLowerCase();

  let variant = 'info';
  if (s === 'passed' || s === 'completed')     variant = 'success';
  else if (s === 'failed' || s === 'error')    variant = 'error';
  else if (s === 'waiting')                    variant = 'warning';
  else if (s === 'evaluating')                 variant = 'info';

  return (
    <span className={`status-badge status-${variant}`}>
      {status}
    </span>
  );
}
