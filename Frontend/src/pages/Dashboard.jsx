import React, { useState, useCallback } from 'react';
import PageContainer from '../components/Layout/PageContainer.jsx';
import RubricUpload from '../components/Upload/RubricUpload.jsx';
import CsvUpload from '../components/Upload/CsvUpload.jsx';
import Button from '../components/Common/Button.jsx';
import Spinner from '../components/Common/Spinner.jsx';
import StudentTable from '../components/Students/StudentTable.jsx';
import { parseStudentsCsv } from '../../../Backend/src/utils/csv-parser.js';
import { evaluateBatch } from '../../../Backend/src/services/evaluation.service.js';
import { downloadExcelReport } from '../../../Backend/src/services/excel-export.service.js';
import './Dashboard.css';

/**
 * Normalises a backend status string to one of the four supported
 * frontend statuses: Waiting | Evaluating | Completed | Error.
 */
function normaliseStatus(backendStatus) {
  if (!backendStatus) return 'Waiting';
  if (backendStatus === 'Error') return 'Error';
  // Passed and Failed both mean the evaluation finished successfully
  if (['Passed', 'Failed', 'Completed'].includes(backendStatus)) return 'Completed';
  return backendStatus;
}

export default function Dashboard() {
  // ── Upload state ──────────────────────────────────────────────────
  const [rubricFile, setRubricFile]   = useState(null);
  const [csvFile,    setCsvFile]      = useState(null);
  const [rubricError, setRubricError] = useState(null);
  const [csvError,    setCsvError]    = useState(null);

  // ── Single students state — the source of truth ───────────────────
  const [students,    setStudents]    = useState([]);
  const [csvWarnings, setCsvWarnings] = useState([]);

  // ── Evaluation state ──────────────────────────────────────────────
  const [isEvaluating,    setIsEvaluating]    = useState(false);
  const [evaluationError, setEvaluationError] = useState(null);

  // ── CSV upload handler: parse immediately ─────────────────────────
  const handleCsvFileSelect = useCallback(async (meta) => {
    setCsvFile(meta);
    setCsvError(null);
    setStudents([]);
    setCsvWarnings([]);
    setEvaluationError(null);

    if (!meta) return;

    try {
      const { students: parsed, warnings } = await parseStudentsCsv(meta.file);
      // Seed every student with status = Waiting
      setStudents(parsed.map((s) => ({ ...s, status: 'Waiting' })));
      setCsvWarnings(warnings);
    } catch (err) {
      setCsvError(err.message);
      setCsvFile(null);
    }
  }, []);

  const handleCsvError = useCallback((err) => {
    setCsvError(err);
    if (err) { setCsvFile(null); setStudents([]); }
  }, []);

  // ── Evaluate All ──────────────────────────────────────────────────
  const handleEvaluate = useCallback(async () => {
    if (!rubricFile) { setEvaluationError('Please upload an evaluation rubric before starting.'); return; }
    if (!csvFile)    { setEvaluationError('Please upload a students CSV before starting.'); return; }
    if (students.length === 0) { setEvaluationError('No valid students detected. Check the CSV file.'); return; }

    setIsEvaluating(true);
    setEvaluationError(null);

    // ── Immediately mark every student as "Evaluating" ──────────────
    setStudents((prev) => prev.map((s) => ({ ...s, status: 'Evaluating' })));

    try {
      const data = await evaluateBatch({
        rubricFile: rubricFile.name,
        students: students.map(({ student, repositoryUrl }) => ({ student, repositoryUrl })),
      });

      // ── Merge backend results into students array ─────────────────
      setStudents((prev) =>
        prev.map((s) => {
          const result = data.find((r) => r.student === s.student);
          if (!result) return { ...s, status: 'Error', error: 'No result returned by the server.' };
          return {
            ...s,
            ...result,
            status: normaliseStatus(result.status),
          };
        })
      );
    } catch (err) {
      // Network / global error — reset all students to Waiting
      setEvaluationError(err.message);
      setStudents((prev) => prev.map((s) => ({ ...s, status: 'Waiting' })));
    } finally {
      setIsEvaluating(false);
    }
  }, [rubricFile, csvFile, students]);

  // ── Export handler ────────────────────────────────────────────────
  const handleExport = useCallback(async () => {
    try {
      await downloadExcelReport(students);
    } catch (err) {
      setEvaluationError(`Export failed: ${err.message}`);
    }
  }, [students]);

  // ── Button guards ─────────────────────────────────────────────────
  const canEvaluate =
    rubricFile   !== null &&
    csvFile      !== null &&
    rubricError  === null &&
    csvError     === null &&
    students.length > 0 &&
    !isEvaluating;

  // Export is available once at least one student has a final status
  const canExport =
    !isEvaluating &&
    students.some((s) => s.status === 'Completed' || s.status === 'Error');

  return (
    <PageContainer className="dashboard-page">
      {/* ── Intro ── */}
      <div className="dashboard-intro">
        <h1 className="dashboard-main-title">AI Assignment Evaluator</h1>
        <p className="dashboard-main-desc">
          Upload an evaluation rubric and a list of GitHub repositories to automatically
          evaluate student assignments using AI.
        </p>
      </div>

      {/* ── Upload cards ── */}
      <div className="dashboard-uploads">
        <RubricUpload
          selectedFile={rubricFile}
          error={rubricError}
          onFileSelect={(meta) => { setRubricFile(meta); setRubricError(null); setEvaluationError(null); }}
          onError={(err) => { setRubricError(err); if (err) setRubricFile(null); }}
        />
        <CsvUpload
          selectedFile={csvFile}
          error={csvError}
          onFileSelect={handleCsvFileSelect}
          onError={handleCsvError}
        />
      </div>

      {/* ── CSV Warnings ── */}
      {csvWarnings.length > 0 && (
        <div className="dashboard-warnings">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="dashboard-warning-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          <div>
            <p className="dashboard-warnings-title">{csvWarnings.length} row(s) were skipped:</p>
            <ul className="dashboard-warnings-list">
              {csvWarnings.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </div>
        </div>
      )}

      {/* ── Evaluation Error ── */}
      {evaluationError && (
        <div className="dashboard-eval-error" role="alert">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="dashboard-eval-error-icon">
            <circle cx="12" cy="12" r="10" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
          </svg>
          {evaluationError}
        </div>
      )}

      {/* ── Evaluate All button ── */}
      <Button
        variant="primary"
        className="evaluate-all-btn"
        disabled={!canEvaluate}
        onClick={handleEvaluate}
      >
        {isEvaluating ? (
          <>
            <Spinner size="small" color="white" />
            Evaluating...
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="currentColor" className="btn-icon">
              <path d="M8 5v14l11-7z" />
            </svg>
            Evaluate All
          </>
        )}
      </Button>

      {/* ── Detected Students table (single source of truth) ── */}
      <div className="dashboard-results-section">
        <StudentTable students={students} />
      </div>

      {/* ── Footer actions ── */}
      <div className="dashboard-footer-actions">
        <Button
          variant="secondary"
          className="export-excel-btn"
          disabled={!canExport}
          onClick={handleExport}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="btn-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Excel Report
        </Button>
      </div>
    </PageContainer>
  );
}
