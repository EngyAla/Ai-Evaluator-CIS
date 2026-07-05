import { cloneRepository } from './github/downloader.js';
import { scanRepository } from './scanner/scanner.js';
import { readFiles } from './reader/reader.js';

async function main() {
  const repoUrl = process.argv[2];

  if (!repoUrl) {
    console.error('Error: Please provide a GitHub repository URL.');
    console.error('Usage: node src/main.js <github-repo-url>');
    process.exit(1);
  }

  try {
    // 1. Clone repository
    const { repositoryPath } = await cloneRepository(repoUrl);
    console.log('Repository cloned successfully.');

    // 2. Scan repository to discover target source files metadata
    const { filesMetadata } = await scanRepository({ repositoryPath });

    // 3. Read discovered files, fetching content and size, assigning IDs, and stripping absolutePath
    const { sourceFiles } = await readFiles({ filesMetadata });

    // 4. Print summary in terminal
    console.log(`${sourceFiles.length} source files found.`);

    // 5. Output the JSON array of files
    console.log('\n--- Collected Files ---');
    console.log(JSON.stringify(sourceFiles, null, 2));

  } catch (error) {
    console.error('\nExecution failed:');
    console.error(error.message);
    process.exit(1);
  }
}

main();
