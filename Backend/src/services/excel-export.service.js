/**
 * excel-export.service.js
 *
 * Generates and downloads an Excel workbook from the completed evaluation
 * results that are already stored in frontend state.
 *
 * No backend requests are made — all data comes from the students array.
 *
 * Workbook structure
 * ──────────────────
 *  Sheet 1 — "Evaluation Results"  (one row per student)
 *  Sheet 2 — "Issues"              (one row per issue, Error students excluded)
 */

import ExcelJS from 'exceljs';

// ── Brand colours (hex, no #) ────────────────────────────────────────────────
const COLOUR = {
  headerBg:    '1E1E2E',   // dark navy
  headerFg:    'FFFFFF',
  completed:   '22C55E',   // green
  error:       'EF4444',   // red
  waiting:     '94A3B8',   // slate
  evaluating:  '6366F1',   // indigo
  altRow:      'F8FAFC',   // very light grey for light-mode Excel
  border:      'E2E8F0',
};

/**
 * Applies a bold, coloured header style to a worksheet row.
 * @param {import('exceljs').Row} row
 */
function styleHeader(row) {
  row.eachCell((cell) => {
    cell.fill   = { type: 'pattern', pattern: 'solid', fgColor: { argb: `FF${COLOUR.headerBg}` } };
    cell.font   = { bold: true, color: { argb: `FF${COLOUR.headerFg}` }, size: 11, name: 'Calibri' };
    cell.border = {
      bottom: { style: 'thin', color: { argb: `FF${COLOUR.border}` } },
    };
    cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: false };
  });
  row.height = 22;
  row.commit();
}

/**
 * Returns the ARGB hex string for a given status label.
 * @param {string} status
 * @returns {string}
 */
function statusColour(status) {
  switch (status) {
    case 'Completed': return `FF${COLOUR.completed}`;
    case 'Error':     return `FF${COLOUR.error}`;
    case 'Evaluating': return `FF${COLOUR.evaluating}`;
    default:          return `FF${COLOUR.waiting}`;
  }
}

/**
 * Adds a thin border + vertical-middle alignment to every cell in a data row.
 * @param {import('exceljs').Row} row
 * @param {boolean} alt  — true for alternating row shading
 */
function styleDataRow(row, alt = false) {
  row.eachCell({ includeEmpty: true }, (cell) => {
    if (alt) {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: `FF${COLOUR.altRow}` } };
    }
    cell.border = {
      bottom: { style: 'hair', color: { argb: `FFE2E8F0` } },
    };
    cell.alignment = { vertical: 'middle', wrapText: true };
    cell.font = { name: 'Calibri', size: 10 };
  });
  row.height = 18;
  row.commit();
}

// ────────────────────────────────────────────────────────────────────────────
// Sheet 1 — Evaluation Results
// ────────────────────────────────────────────────────────────────────────────

/**
 * @param {import('exceljs').Worksheet} ws
 * @param {Array<Object>} students
 */
function buildResultsSheet(ws, students) {
  ws.columns = [
    { header: 'Student',      key: 'student',      width: 22 },
    { header: 'Repository',   key: 'repository',   width: 42 },
    { header: 'Score',        key: 'score',        width: 10 },
    { header: 'Total Issues', key: 'totalIssues',  width: 14 },
    { header: 'Status',       key: 'status',       width: 14 },
    { header: 'Summary',      key: 'summary',      width: 60 },
  ];

  styleHeader(ws.getRow(1));

  students.forEach((s, idx) => {
    const isError = s.status === 'Error';

    const row = ws.addRow({
      student:     s.student      ?? '',
      repository:  s.repositoryUrl ?? s.repository ?? '',
      score:       isError ? '' : (s.score ?? ''),
      totalIssues: isError ? 0  : (s.totalIssues ?? 0),
      status:      s.status       ?? 'Waiting',
      summary:     isError
                     ? (s.error ?? 'Evaluation failed.')
                     : (s.summary ?? ''),
    });

    styleDataRow(row, idx % 2 !== 0);

    // Colour the Status cell
    const statusCell = row.getCell('status');
    statusCell.font = {
      name: 'Calibri', size: 10, bold: true,
      color: { argb: statusColour(s.status) },
    };

    row.commit();
  });

  // Freeze the header row
  ws.views = [{ state: 'frozen', ySplit: 1 }];
}

// ────────────────────────────────────────────────────────────────────────────
// Sheet 2 — Issues
// ────────────────────────────────────────────────────────────────────────────

/**
 * @param {import('exceljs').Worksheet} ws
 * @param {Array<Object>} students
 */
function buildIssuesSheet(ws, students) {
  ws.columns = [
    { header: 'Student',      key: 'student',  width: 22 },
    { header: 'File',         key: 'file',     width: 34 },
    { header: 'Issue',        key: 'issue',    width: 54 },
    { header: 'Code Snippet', key: 'snippet',  width: 50 },
  ];

  styleHeader(ws.getRow(1));

  let rowIdx = 0;

  students.forEach((s) => {
    // Error students don't contribute issue rows
    if (s.status === 'Error') return;

    const issues = Array.isArray(s.issues) ? s.issues : [];

    issues.forEach((issue) => {
      const row = ws.addRow({
        student: s.student ?? '',
        file:    issue.file    ?? issue.filename ?? '',
        issue:   issue.issue   ?? issue.message  ?? issue.description ?? '',
        snippet: issue.snippet ?? issue.code     ?? '',
      });

      styleDataRow(row, rowIdx % 2 !== 0);
      rowIdx++;
      row.commit();
    });
  });

  ws.views = [{ state: 'frozen', ySplit: 1 }];
}

// ────────────────────────────────────────────────────────────────────────────
// Public API
// ────────────────────────────────────────────────────────────────────────────

/**
 * Generates evaluation-report.xlsx from the provided students array and
 * triggers an immediate browser download. No network requests are made.
 *
 * @param {Array<{
 *   student:      string,
 *   repositoryUrl?: string,
 *   repository?:  string,
 *   score:        number|null,
 *   summary:      string|null,
 *   issues:       Array,
 *   totalIssues:  number,
 *   status:       'Completed'|'Error'|'Waiting'|'Evaluating',
 *   error?:       string,
 * }>} students
 * @param {string} [filename]
 */
export async function downloadExcelReport(students, filename = 'evaluation-report.xlsx') {
  const workbook = new ExcelJS.Workbook();

  workbook.creator  = 'AI Evaluator';
  workbook.created  = new Date();
  workbook.modified = new Date();

  buildResultsSheet(workbook.addWorksheet('Evaluation Results'), students);
  buildIssuesSheet(workbook.addWorksheet('Issues'), students);

  // Write to buffer and trigger download via a temporary <a> element
  const buffer = await workbook.xlsx.writeBuffer();
  const blob   = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  const url  = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href     = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
