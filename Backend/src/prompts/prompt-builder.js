import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { PROMPT_VERSION } from '../config/constants.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TEMPLATE_PATH = path.resolve(__dirname, 'templates/evaluation-template.md');

// Mapping of file extensions to markdown code block language identifiers
const LANGUAGE_MAPPING = {
  '.html': 'html',
  '.css': 'css',
  '.js': 'javascript'
};

/**
 * Builds the student submission markdown block.
 * @param {Array<import('../types/file.schema.js').SourceFile>} sourceFiles 
 * @returns {string}
 */
function buildStudentSubmissionBlock(sourceFiles) {
  return sourceFiles.map(file => {
    const lang = LANGUAGE_MAPPING[file.extension] || '';
    // Format:
    // ===== relative/path/index.html =====
    // ```html
    // (file content)
    // ```
    return `===== ${file.relativePath} =====\n\n\`\`\`${lang}\n${file.content}\n\`\`\``;
  }).join('\n\n');
}

/**
 * Generates an evaluation prompt for an LLM based on assignment details, rubric, and student code.
 * Loads the template from disk, performs placeholder replacement, and constructs the output.
 * 
 * @param {Object} input - Input payload.
 * @param {string} input.assignmentTitle - The title of the assignment.
 * @param {string} input.assignmentDescription - The instructions or description of the assignment.
 * @param {string} input.rubric - Plain text evaluation rubric.
 * @param {Array<import('../types/file.schema.js').SourceFile>} input.sourceFiles - Array of student source files.
 * @returns {Promise<{ prompt: string, metadata: { assignmentTitle: string, totalFiles: number, totalCharacters: number, promptVersion: string, generatedAt: string } }>}
 */
export async function buildPrompt({ assignmentTitle, assignmentDescription, rubric, sourceFiles }) {
  if (!assignmentTitle || !assignmentDescription || !rubric || !Array.isArray(sourceFiles)) {
    throw new Error('Invalid parameters: assignmentTitle, assignmentDescription, rubric, and sourceFiles array are required.');
  }

  // Load the prompt template
  let template;
  try {
    template = await fs.readFile(TEMPLATE_PATH, 'utf8');
  } catch (error) {
    throw new Error(`Failed to read evaluation template from ${TEMPLATE_PATH}: ${error.message}`);
  }

  // Format student submission
  const studentSubmission = buildStudentSubmissionBlock(sourceFiles);

  // Replace placeholders
  const prompt = template
    .replace('{{assignmentTitle}}', assignmentTitle)
    .replace('{{assignmentDescription}}', assignmentDescription)
    .replace('{{rubric}}', rubric)
    .replace('{{studentSubmission}}', studentSubmission);

  return {
    prompt,
    metadata: {
      assignmentTitle,
      totalFiles: sourceFiles.length,
      totalCharacters: prompt.length,
      promptVersion: PROMPT_VERSION,
      generatedAt: new Date().toISOString()
    }
  };
}
