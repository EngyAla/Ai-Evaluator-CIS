/**
 * @typedef {Object} ScoreResult
 *
 * @property {number} score - The student's final score (number of passed requirements)
 * @property {number} maxScore - The maximum possible score (equal to totalRequirements)
 * @property {number} percentage - The grade percentage (rounded to 2 decimal places, e.g. 86.67)
 * @property {number} passedRequirements - Count of critical requirements satisfied
 * @property {number} failedRequirements - Count of critical requirements violated (capped to totalRequirements)
 * @property {number} totalRequirements - Total number of critical requirements parsed from the rubric
 * @property {string} grade - Qualitative grade (e.g. Excellent, Very Good, Good, Pass, Needs Improvement)
 */

export {};
