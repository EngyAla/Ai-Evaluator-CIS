import fs from 'fs/promises';

/**
 * Ensures that a directory exists, creating it recursively if it does not.
 * @param {string} dirPath - Absolute path of the directory.
 */
export async function ensureDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

/**
 * Recursively deletes a directory or file if it exists.
 * @param {string} targetPath - Absolute path of the directory or file to delete.
 */
export async function cleanupDir(targetPath) {
  try {
    await fs.rm(targetPath, { recursive: true, force: true });
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
}
