import { calculateScore } from './score-calculator.js';

/**
 * Counts the total number of critical requirements defined in the rubric markdown.
 * Walks through lines under "### Critical Requirements" headers.
 * 
 * @param {string} rubricText - The raw content of the rubric markdown file.
 * @returns {number} - The counted requirements.
 */
export function countRubricRequirements(rubricText) {
  if (!rubricText || typeof rubricText !== 'string') {
    return 0;
  }

  const lines = rubricText.replace(/\r\n/g, '\n').split('\n');
  let count = 0;
  let inCritical = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // Toggle inCritical state when encountering markdown headers
    if (trimmed.startsWith('#')) {
      if (trimmed.toLowerCase().includes('critical requirements')) {
        inCritical = true;
      } else {
        inCritical = false;
      }
      continue;
    }

    // A markdown divider line (---) exits the current section
    if (trimmed.startsWith('---')) {
      inCritical = false;
      continue;
    }

    if (inCritical) {
      // Matches list items starting with "-", "*", or digit lists (e.g. "1.")
      const isBullet = trimmed.startsWith('-') || trimmed.startsWith('*') || /^\d+\./.test(trimmed);
      if (isBullet) {
        count++;
      }
    }
  }

  return count;
}

/**
 * Coordinates parsing the rubric and generating the final structured ScoreResult.
 * 
 * @param {import('../types/evaluation.schema.js').EvaluationReport} evaluationReport - The parsed issues report.
 * @param {string} rubricText - The raw rubric markdown content.
 * @returns {import('./score.schema.js').ScoreResult}
 */
export function generateScore(evaluationReport, rubricText) {
  const totalRequirements = countRubricRequirements(rubricText);
  const failedCount = evaluationReport.issues ? evaluationReport.issues.length : 0;

  return calculateScore(failedCount, totalRequirements);
}
