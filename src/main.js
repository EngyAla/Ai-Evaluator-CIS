import fs from 'fs/promises';
import path from 'path';
import { cloneRepository } from './github/downloader.js';
import { scanRepository } from './scanner/scanner.js';
import { readFiles } from './reader/reader.js';
import { buildPrompt } from './prompts/prompt-builder.js';
import { loadRubric } from './resources/rubric-loader.js';
import { evaluatePrompt } from './ai/ai-client.js';
import { OUTPUT_DIR } from './config/constants.js';
import { ensureDir } from './utils/fs-helpers.js';

// Mock Assignment Details
const MOCK_ASSIGNMENT = {
  assignmentTitle: 'Beginner-a_week4',
  assignmentDescription: `Watch videos from Lesson 23 to Lesson 37.
Solve all assignments.
Upload your GitHub repository.`
};

async function main() {
  const repoUrl = process.argv[2];
  const rubricFile = process.argv[3];

  if (!repoUrl || !rubricFile) {
    console.error('Error: Missing required arguments.');
    console.error('Usage: node src/main.js <github-repository-url> <rubric-file>');
    console.error('Example: node src/main.js https://github.com/Nora-Elsharkawy/Week2.git beginner-week4.md');
    process.exit(1);
  }

  let repositoryPath = null;

  try {
    // 1. Clone repository
    const cloneResult = await cloneRepository(repoUrl);
    repositoryPath = cloneResult.repositoryPath;
    console.log('Repository cloned successfully.');

    // 2. Scan repository to discover target source files metadata
    const { filesMetadata } = await scanRepository({ repositoryPath });
    console.log('Source files scanned.');

    // 3. Read discovered files, fetching content and size, assigning IDs, and stripping absolutePath
    const { sourceFiles } = await readFiles({ filesMetadata });
    console.log(`${sourceFiles.length} source files found.`);

    // 4. Load Rubric dynamically
    const rubric = await loadRubric(rubricFile);
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
    const outputPath = path.join(OUTPUT_DIR, 'prompt.md');
    await fs.writeFile(outputPath, promptOutput.prompt, 'utf8');
    console.log(`Prompt successfully written to:\noutput/prompt.md`);

    // 7. Send compiled prompt to the generic AI client
    console.log('\nSending prompt to AI Evaluator...');
    const aiResponse = await evaluatePrompt(promptOutput.prompt);
    
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
    console.log(`\nAI evaluation successfully written to:\noutput/ai-evaluation.md`);

  } catch (error) {
    console.error('\nExecution failed:');
    console.error(error.message);
    process.exit(1);
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

main();