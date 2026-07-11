import fs from 'fs/promises';
import path from 'path';
import { cloneRepository } from '../github/downloader.js';
import { scanRepository } from '../scanner/scanner.js';
import { readFiles } from '../reader/reader.js';
import { buildPrompt } from '../prompts/prompt-builder.js';
import { loadRubric } from '../resources/rubric-loader.js';
import { evaluatePrompt } from '../ai/ai-client.js';
import { parseEvaluation } from '../parser/evaluation-parser.js';
import { generateScore } from '../scoring/score-generator.js';
import { OUTPUT_DIR } from '../config/constants.js';
import { ensureDir } from '../utils/fs-helpers.js';

// Mock Assignment Details
const MOCK_ASSIGNMENT = {
  assignmentTitle: 'Beginner-a_week4',
  assignmentDescription: `Watch videos from Lesson 23 to Lesson 37.
Solve all assignments.
Upload your GitHub repository.`
};

/**
 * Evaluates a single GitHub repository against a rubric.
 * This service is stateless and does not maintain in-memory state between requests.
 *
 * @param {Object} options
 * @param {string} options.repositoryUrl - The URL of the GitHub repository.
 * @param {string} options.rubricFile - The relative name of the rubric markdown file.
 * @returns {Promise<Object>} The evaluation result object.
 */
export async function evaluateRepository({ repositoryUrl, rubricFile }) {
  if (!repositoryUrl) {
    throw new Error('Missing repositoryUrl');
  }
  if (!rubricFile) {
    throw new Error('Missing rubricFile');
  }

  let repositoryPath = null;

  try {
    // 1. Clone repository
    console.log(`Cloning repository: ${repositoryUrl}...`);
    let cloneResult;
    try {
      cloneResult = await cloneRepository(repositoryUrl);
      repositoryPath = cloneResult.repositoryPath;
    } catch (cloneError) {
      throw new Error(`Repository cloning failed. Details: ${cloneError.message}`);
    }
    console.log('Repository cloned successfully.');

    // 2. Scan repository to discover target source files metadata
    const { filesMetadata } = await scanRepository({ repositoryPath });
    console.log('Source files scanned.');

    // 3. Read discovered files, fetching content and size, assigning IDs, and stripping absolutePath
    const { sourceFiles } = await readFiles({ filesMetadata });
    console.log(`${sourceFiles.length} source files found.`);

    // 4. Load Rubric dynamically
    let rubric;
    try {
      rubric = await loadRubric(rubricFile);
    } catch (rubricError) {
      throw new Error(`Rubric loading failed. Details: ${rubricError.message}`);
    }
    console.log('Rubric loaded successfully.');

    // 5. Generate Prompt
    console.log('\nGenerating evaluation prompt...');
    const promptOutput = await buildPrompt({
      assignmentTitle: MOCK_ASSIGNMENT.assignmentTitle,
      assignmentDescription: MOCK_ASSIGNMENT.assignmentDescription,
      rubric,
      sourceFiles
    });
    console.log('Prompt generated successfully.');

    // 6. Ensure output directory exists and write the complete prompt
    await ensureDir(OUTPUT_DIR);
    const promptPath = path.join(OUTPUT_DIR, 'prompt.md');
    await fs.writeFile(promptPath, promptOutput.prompt, 'utf8');
    console.log(`Prompt successfully written to:\noutput/prompt.md`);

    // 7. Send compiled prompt to the generic AI client
    console.log('\nSending prompt to AI Evaluator...');
    let aiResponse;
    try {
      aiResponse = await evaluatePrompt(promptOutput.prompt);
    } catch (aiError) {
      throw new Error(`Gemini evaluation failed. Details: ${aiError.message}`);
    }

    // 8. Print AI execution metadata
    console.log('\n--------------------------------');
    console.log(`Provider:        ${aiResponse.provider}`);
    console.log(`Model:           ${aiResponse.model}`);
    console.log(`Prompt Length:   ${aiResponse.usage.promptCharacters} characters`);
    console.log(`Response Length: ${aiResponse.usage.responseCharacters} characters`);
    console.log(`Duration:        ${aiResponse.durationMs} ms`);
    console.log('--------------------------------');

    // 9. Write the complete raw response returned by the LLM
    const aiOutputPath = path.join(OUTPUT_DIR, 'ai-evaluation.md');
    await fs.writeFile(aiOutputPath, aiResponse.text, 'utf8');
    console.log(`AI evaluation successfully written to:\noutput/ai-evaluation.md`);

    // 10. Parse raw response and save structured JSON
    console.log('\nParsing evaluation response...');
    const report = parseEvaluation(aiResponse.text);
    const jsonOutputPath = path.join(OUTPUT_DIR, 'evaluation.json');
    await fs.writeFile(jsonOutputPath, JSON.stringify(report, null, 2), 'utf8');
    console.log(`Structured evaluation successfully written to:\noutput/evaluation.json`);

    // 11. Generate score report and save JSON
    console.log('\nGenerating score report...');
    const scoreResult = generateScore(report, rubric);
    const scoreOutputPath = path.join(OUTPUT_DIR, 'score.json');
    await fs.writeFile(scoreOutputPath, JSON.stringify(scoreResult, null, 2), 'utf8');
    console.log(`Score report successfully written to:\noutput/score.json`);

    return {
      student: null,
      repository: repositoryUrl,
      summary: report.summary,
      score: scoreResult.score,
      issues: report.issues,
      totalIssues: report.totalIssues,
      artifacts: {
        prompt: true,
        evaluation: true,
        report: true,
        score: true
      }
    };

  } finally {
    if (repositoryPath) {
      try {
        await fs.rm(repositoryPath, { recursive: true, force: true });
        console.log('\nTemporary repository removed successfully.');
      } catch (cleanupError) {
        console.warn('\nWarning:');
        console.warn(`Failed to remove temporary repository:\n${repositoryPath}`);
      }
    }
  }
}
