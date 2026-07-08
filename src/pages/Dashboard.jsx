import React, { useState, useCallback } from 'react';
import PageContainer from '../components/Layout/PageContainer.jsx';
import RubricUpload from '../components/Upload/RubricUpload.jsx';
import CsvUpload from '../components/Upload/CsvUpload.jsx';
import Button from '../components/Common/Button.jsx';
import Spinner from '../components/Common/Spinner.jsx';
import StudentTable from '../components/Students/StudentTable.jsx';
import ProgressList from '../components/Progress/ProgressList.jsx';
import { parseStudentsCsv } from '../utils/csv-parser.js';
import { evaluateBatch } from '../services/evaluation.service.js';
import './Dashboard.css';

export default function Dashboard() {
  // ── Upload state ──────────────────────────────────────────────────
  const [rubricFile, setRubricFile] = useState(null);
  const [csvFile, setCsvFile] = useState(null);
  const [rubricError, setRubricError] = useState(null);
  const [csvError, setCsvError] = useState(null);

  // ── CSV parsing state ─────────────────────────────────────────────
  const [students, setStudents] = useState([]);
  const [csvWarnings, setCsvWarnings] = useState([]);

  // ── Evaluation state ──────────────────────────────────────────────
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResults, setEvaluationResults] = useState([]);
  const [evaluationError, setEvaluationError] = useState(null);

  // ── CSV upload handler: parse immediately on file select ──────────
  const handleCsvFileSelect = useCallback(async (meta) => {
    setCsvFile(meta);
    setCsvError(null);
    setStudents([]);
    setCsvWarnings([]);
    setEvaluationError(null);

    if (!meta) return; // file removed

    try {
      const { students: parsed, warnings } = await parseStudentsCsv(meta.file);
      setStudents(parsed);
      setCsvWarnings(warnings);
    } catch (err) {
      setCsvError(err.message);
      setCsvFile(null);
    }
  }, []);

  const handleCsvError = useCallback((err) => {
    setCsvError(err);
    if (err) {
      setCsvFile(null);
      setStudents([]);
    }
  }, []);

  // ── Evaluate All handler ──────────────────────────────────────────
  const handleEvaluate = useCallback(async () => {
    // Pre-flight validations (guard against stale state)
    if (!rubricFile) {
      setEvaluationError('Please upload an evaluation rubric before starting.');
      return;
    }
    if (!csvFile) {
      setEvaluationError('Please upload a students CSV before starting.');
      return;
    }
    if (students.length === 0) {
      setEvaluationError('No valid students detected in the CSV. Please check the file and try again.');
      return;
    }

    setIsEvaluating(true);
    setEvaluationError(null);
    setEvaluationResults([]);

    try {
      const data = await evaluateBatch({
        rubricFile: rubricFile.name,   // send filename string, not the File object
        students,
      });
      setEvaluationResults(data);
    } catch (err) {
      setEvaluationError(err.message);
    } finally {
      setIsEvaluating(false);
    }
  }, [rubricFile, csvFile, students]);

  // ── Evaluate All button enabled when: both files ok + students present ──
  const canEvaluate =
    rubricFile !== null &&
    csvFile !== null &&
    rubricError === null &&
    csvError === null &&
    students.length > 0 &&
    !isEvaluating;

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

      {/* ── Students table ── */}
      <div className="dashboard-results-section">
        <StudentTable students={students} />
      </div>

      {/* ── Progress list ── */}
      <div className="dashboard-progress-section">
        <ProgressList />
      </div>

      {/* ── Footer actions ── */}
      <div className="dashboard-footer-actions">
        <Button variant="secondary" className="export-excel-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="btn-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Excel Report
        </Button>
      </div>
    </PageContainer>
  );
}
