import { evaluateRepository } from './repository-evaluator.service.js';

// ── Batch throttling configuration ────────────────────────────────────────
/**
 * Delay (in ms) inserted between consecutive student evaluations.
 * Reduces the risk of triggering Gemini API rate limits during large batches.
 * Set to 0 to disable inter-student delays.
 */
const BATCH_DELAY_MS = 3000;

/** Resolves after `ms` milliseconds. */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Sequentially evaluates a batch of student repositories.
 * A configurable delay is inserted between students (not before the first,
 * not after the last) to reduce the risk of API rate-limit errors.
 *
 * @param {object} options
 * @param {string}        options.rubricFile  - Relative name of the rubric markdown file.
 * @param {Array<object>} options.students    - List of { student, repositoryUrl }.
 * @returns {Promise<Array<object>>} Enriched batch evaluation results.
 */
export async function evaluateBatch({ rubricFile, students }) {
  const results = [];

  for (let i = 0; i < students.length; i++) {
    const { student, repositoryUrl } = students[i];

    // ── Inter-student delay (skip before the first student) ──────────
    if (i > 0 && BATCH_DELAY_MS > 0) {
      console.log(`[Batch] Waiting ${BATCH_DELAY_MS} ms before evaluating the next repository...`);
      await sleep(BATCH_DELAY_MS);
    }

    console.log(`[Batch] Evaluating student ${i + 1}/${students.length}: ${student}`);

    try {
      const evalResult = await evaluateRepository({ repositoryUrl, rubricFile });

      const score  = evalResult.score;
      const status = score >= 60 ? 'Passed' : 'Failed';

      results.push({
        student,
        repository:  repositoryUrl,
        status,
        summary:     evalResult.summary,
        score,
        issues:      evalResult.issues,
        totalIssues: evalResult.totalIssues,
      });
    } catch (error) {
      console.error(`[Batch] Error evaluating repository for ${student}:`, error.message);

      let errorMessage = error.message;

      if (error.message.includes('Repository cloning failed')) {
        errorMessage = 'Repository cloning failed.';
      } else if (
        error.message.includes('quota exceeded') ||
        error.message.includes('RESOURCE_EXHAUSTED')
      ) {
        errorMessage = error.message; // already cleaned up by the provider
      } else if (
        error.message.includes('Gemini evaluation failed') ||
        error.message.includes('AI evaluation failed')
      ) {
        errorMessage = 'Gemini evaluation failed.';
      }

      results.push({
        student,
        repository:  repositoryUrl,
        status:      'Error',
        summary:     null,
        score:       null,
        issues:      [],
        totalIssues: 0,
        error:       errorMessage,
      });
    }
  }

  return results;
}
