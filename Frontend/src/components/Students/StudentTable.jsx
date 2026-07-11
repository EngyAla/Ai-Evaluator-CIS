import React, { useState } from 'react';
import StudentRow from './StudentRow.jsx';
import SectionTitle from '../Typography/SectionTitle.jsx';
import './StudentTable.css';

/**
 * Detected Students table — the single source of truth for each student's
 * evaluation status.
 *
 * Props:
 *   students {Array<object>} — parsed from CSV, enriched after evaluation.
 */
export default function StudentTable({ students = [] }) {
  const [search, setSearch] = useState('');

  // ── Empty state ────────────────────────────────────────────────────
  if (students.length === 0) {
    return (
      <div className="student-table-section">
        <div className="student-table-header">
          <SectionTitle>Detected Students</SectionTitle>
        </div>
        <div className="student-table-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="student-table-empty-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
          </svg>
          <p className="student-table-empty-title">No students detected.</p>
          <p className="student-table-empty-hint">Upload a CSV file to begin.</p>
        </div>
      </div>
    );
  }

  // ── Filtered view ──────────────────────────────────────────────────
  const filtered = students.filter((s) => {
    const term = search.toLowerCase();
    const repo = s.repositoryUrl || s.repository || '';
    return (
      s.student.toLowerCase().includes(term) ||
      repo.toLowerCase().includes(term)
    );
  });

  return (
    <div className="student-table-section">
      <div className="student-table-header">
        <SectionTitle count={students.length}>Detected Students</SectionTitle>
        <div className="student-table-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="search-icon">
            <circle cx="11" cy="11" r="8" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="student-table-search-input"
          />
        </div>
      </div>

      <div className="student-table-wrap">
        <table className="student-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Repository</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, i) => (
              <StudentRow key={`${s.student}-${i}`} data={s} />
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={3} className="student-table-no-match">
                  No students match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
