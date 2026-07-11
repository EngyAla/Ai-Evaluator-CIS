/**
 * Maps a percentage score to a qualitative grade based on predefined thresholds.
 * 
 * @param {number} percentage - The calculated percentage (0 to 100).
 * @returns {string} - The mapped grade string.
 */
function getGrade(percentage) {
  if (percentage >= 95) return 'Excellent';
  if (percentage >= 85) return 'Very Good';
  if (percentage >= 75) return 'Good';
  if (percentage >= 60) return 'Pass';
  return 'Needs Improvement';
}

/**
 * Pure calculation logic that computes the score details.
 * 
 * @param {number} failedCount - The number of failed issues/requirements.
 * @param {number} totalRequirements - The total requirements defined in the rubric.
 * @returns {import('./score.schema.js').ScoreResult}
 */
export function calculateScore(failedCount, totalRequirements) {
  // Ensure we do not divide by zero and that counts remain positive
  const safeTotal = totalRequirements > 0 ? totalRequirements : 1;
  const failedRequirements = Math.min(safeTotal, Math.max(0, failedCount));
  const passedRequirements = safeTotal - failedRequirements;

  const score = passedRequirements;
  const maxScore = safeTotal;
  
  const rawPercentage = (score / safeTotal) * 100;
  const percentage = Math.round(rawPercentage * 100) / 100; // round to 2 decimal places

  const grade = getGrade(percentage);

  return {
    score,
    maxScore,
    percentage,
    passedRequirements,
    failedRequirements,
    totalRequirements: safeTotal,
    grade
  };
}
