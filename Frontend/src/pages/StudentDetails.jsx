import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PageContainer from '../components/Layout/PageContainer.jsx';
import StudentInfoCard from '../components/Details/StudentInfoCard.jsx';
import SummaryCard from '../components/Details/SummaryCard.jsx';
import IssuesTable from '../components/Details/IssuesTable.jsx';
import BackButton from '../components/Details/BackButton.jsx';
import Button from '../components/Common/Button.jsx';
import './StudentDetails.css';

/**
 * Student details right pane.
 * Receives the full student data via React Router location state.
 * Renders either a successful evaluation report or an error card.
 */
export default function StudentDetails() {
  const { studentId } = useParams();
  const location = useLocation();

  const studentName = studentId ? decodeURIComponent(studentId) : 'Student';
  const studentData = location.state?.student ?? null;

  // ── No data available (direct URL access or stale navigation) ──────
  if (!studentData) {
    return (
      <PageContainer className="student-details-page">
        <div className="student-details-header">
          <h1 className="student-details-title">Student Evaluation Details</h1>
          <BackButton />
        </div>
        <div className="student-details-empty">
          <p className="student-details-empty-text">
            No evaluation data available for <strong>{studentName}</strong>.
          </p>
          <p className="student-details-empty-hint">
            Run an evaluation from the dashboard first.
          </p>
        </div>
      </PageContainer>
    );
  }

  const isError = studentData.status === 'Error';
  const isCompleted = ['Completed', 'Passed', 'Failed'].includes(studentData.status);

  return (
    <PageContainer className="student-details-page">
      <div className="student-details-header">
        <h1 className="student-details-title">Student Evaluation Details</h1>
        <BackButton />
      </div>

      <div className="student-details-content-scroll">
        {/* ── Student info card (always shown) ── */}
        <StudentInfoCard
          student={studentData.student}
          repository={studentData.repository || studentData.repositoryUrl || ''}
          score={isCompleted ? studentData.score : null}
          status={studentData.status}
          totalIssues={isCompleted ? studentData.totalIssues : null}
        />

        {/* ── Error card ── */}
        {isError && (
          <div className="student-error-card">
            <div className="student-error-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="student-error-icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h3 className="student-error-title">Evaluation Failed</h3>
            <p className="student-error-message">{studentData.error || 'An unknown error occurred.'}</p>
            <p className="student-error-hint">No evaluation report was generated for this repository.</p>
          </div>
        )}

        {/* ── Completed: summary + issues ── */}
        {isCompleted && (
          <>
            <SummaryCard summary={studentData.summary || 'No summary available.'} />
            <IssuesTable issues={studentData.issues || []} />
          </>
        )}

        {/* ── Download button (only for completed) ── */}
        {/* {isCompleted && (
          <div className="student-details-actions">
            <Button variant="secondary" className="download-report-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="btn-icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF Report
            </Button>
          </div>
        )} */}
      </div>
    </PageContainer>
  );
}
