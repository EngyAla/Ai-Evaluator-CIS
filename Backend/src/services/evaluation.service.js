/**
 * Frontend API service for communicating with the Express batch evaluation backend.
 *
 * The backend accepts JSON:  POST /api/evaluate/batch
 *   { rubricFile: "beginner-week4.md", students: [{student, repositoryUrl}] }
 *
 * All HTTP errors are surfaced as thrown Error objects — never swallowed.
 */

const API_BASE = '/api';

/**
 * Sends a batch evaluation request to the backend.
 *
 * @param {{
 *   rubricFile: string,                          // filename, e.g. "beginner-week4.md"
 *   students:  Array<{student: string, repositoryUrl: string}>
 * }} params
 *
 * @returns {Promise<Array<{
 *   student: string,
 *   repository: string,
 *   score: number|null,
 *   summary: string|null,
 *   issues: Array,
 *   totalIssues: number,
 *   status: string,
 *   error?: string
 * }>>}
 *
 * @throws {Error} on network failure or a non-success API response.
 */
export async function evaluateBatch({ rubricFile, students }) {
  let response;

  try {
    response = await fetch(`${API_BASE}/evaluate/batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rubricFile, students }),
    });
  } catch (networkError) {
    throw new Error(
      `Network error: unable to reach the evaluation server. (${networkError.message})`
    );
  }

  let json;
  try {
    json = await response.json();
  } catch {
    throw new Error(
      `Unexpected server response (HTTP ${response.status}). The server may be unavailable.`
    );
  }

  if (!response.ok || !json.success) {
    const message = json?.message ?? `Server returned HTTP ${response.status}.`;
    throw new Error(message);
  }

  return json.data;
}
