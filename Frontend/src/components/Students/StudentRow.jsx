import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '../Common/StatusBadge.jsx';
import './StudentRow.css';

/**
 * Single row in the Detected Students table.
 * Clicking navigates to the details page, passing the full student data
 * via React Router location state so the details page can render it.
 *
 * Props:
 *   data {object} — the full student object from Dashboard's students array.
 */
export default function StudentRow({ data }) {
  const navigate = useNavigate();
  const { student, repositoryUrl, repository, status } = data;
  const repoDisplay = repositoryUrl || repository || '';

  const handleClick = () => {
    navigate(`/student/${encodeURIComponent(student)}`, { state: { student: data } });
  };

  return (
    <tr className={`student-row${status === 'Error' ? ' student-row-error' : ''}`} onClick={handleClick}>
      <td className="student-row-name">{student}</td>
      <td className="student-row-repo">
        <div className="student-row-repo-inner">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="student-row-github-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <span>{repoDisplay}</span>
        </div>
      </td>
      <td className="student-row-status">
        <StatusBadge status={status || 'Waiting'} />
      </td>
    </tr>
  );
}
