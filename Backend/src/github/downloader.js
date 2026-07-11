import crypto from 'crypto';
import path from 'path';
import simpleGit from 'simple-git';
import { REPOS_DIR } from '../config/constants.js';
import { ensureDir } from '../utils/fs-helpers.js';

/**
 * Clones a GitHub repository into a unique subdirectory under workspace/repositories.
 * @param {string} repoUrl - The URL of the GitHub repository to clone.
 * @returns {Promise<{ repositoryPath: string }>} - Object containing the absolute path of the cloned repository.
 */
export async function cloneRepository(repoUrl) {
  if (!repoUrl) {
    throw new Error('GitHub repository URL is required.');
  }

  // Generate a unique identifier for this clone session
  const cloneId = crypto.randomUUID();
  const targetPath = path.join(REPOS_DIR, cloneId);

  // Ensure the base repositories directory and target subdirectory exist
  await ensureDir(targetPath);

  try {
    const git = simpleGit();
    // Perform standard clone
    await git.clone(repoUrl, targetPath);
    return { repositoryPath: targetPath };
  } catch (error) {
    // If cloning fails, clean up the created target path to avoid leaving empty folders
    try {
      const { cleanupDir } = await import('../utils/fs-helpers.js');
      await cleanupDir(targetPath);
    } catch (cleanupError) {
      // Ignore cleanup error, throw the original clone error
    }
    throw new Error(`Failed to clone repository from ${repoUrl}: ${error.message}`);
  }
}
