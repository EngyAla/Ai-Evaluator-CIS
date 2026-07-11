import { evaluateRepository } from './services/repository-evaluator.service.js';

async function main() {
  const repoUrl = process.argv[2];
  const rubricFile = process.argv[3];

  if (!repoUrl || !rubricFile) {
    console.error('Error: Missing required arguments.');
    console.error('Usage: node src/main.js <github-repository-url> <rubric-file>');
    console.error('Example: node src/main.js https://github.com/Nora-Elsharkawy/Week2.git beginner-week4.md');
    process.exit(1);
  }

  try {
    const result = await evaluateRepository({
      repositoryUrl: repoUrl,
      rubricFile: rubricFile
    });

    console.log('\nEvaluation completed successfully.');
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('\nExecution failed:');
    console.error(error.message);
    process.exit(1);
  }
}

main();