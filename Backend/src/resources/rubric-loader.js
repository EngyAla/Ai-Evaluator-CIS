import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Loads a rubric markdown file from the src/resources/rubrics/ directory.
 * 
 * @param {string} relativePath - The filename of the rubric (e.g. 'beginner-week4.md').
 * @returns {Promise<string>} - The full markdown content as a UTF-8 string.
 * @throws {Error} - Throws error if file not found or load fails.
 */
export async function loadRubric(relativePath) {
  if (!relativePath) {
    throw new Error('Rubric relative path is required.');
  }

  // Resolve absolute path to the rubrics folder
  const absolutePath = path.resolve(__dirname, 'rubrics', relativePath);

  try {
    const content = await fs.readFile(absolutePath, 'utf8');
    return content;
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`Rubric file not found: src/resources/rubrics/${relativePath}`);
    }
    throw error;
  }
}
