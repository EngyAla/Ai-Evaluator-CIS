/**
 * @typedef {Object} EvaluationIssue
 *
 * @property {string|null} file - The relative path of the file where the issue was found (or null if general)
 * @property {string} message - Clean description of the rubric violation
 * @property {string|null} snippet - Code correction snippet proposed by the LLM (or null if none)
 */

/**
 * @typedef {Object} EvaluationReport
 *
 * @property {string} summary - Overall mentor response summary (e.g. 'Great work! However,')
 * @property {EvaluationIssue[]} issues - List of specific critical requirement violations
 * @property {number} totalIssues - Total count of detected issues
 */

export {};
