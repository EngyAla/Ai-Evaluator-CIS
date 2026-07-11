import fs from 'fs/promises';
import path from 'path';
import { ALLOWED_EXTENSIONS, IGNORED_DIRS, IGNORED_FILES } from '../config/constants.js';

/**
 * Recursively traverses directory to collect matching file metadata.
 * @param {string} dirPath - Current directory path.
 * @param {string} basePath - Base directory path to calculate relative paths.
 * @returns {Promise<Array<Object>>}
 */
async function scanDirRecursive(dirPath, basePath) {
  let results = [];

  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      if (IGNORED_DIRS.includes(entry.name)) {
        continue;
      }
      const subdirResults = await scanDirRecursive(entryPath, basePath);
      results = results.concat(subdirResults);
    } else if (entry.isFile()) {
      if (IGNORED_FILES.includes(entry.name)) {
        continue;
      }

      const extension = path.extname(entry.name).toLowerCase();
      if (ALLOWED_EXTENSIONS.includes(extension)) {
        const relativePath = path.relative(basePath, entryPath).replace(/\\/g, '/');

        results.push({
          fileName: entry.name,
          relativePath,
          absolutePath: entryPath.replace(/\\/g, '/'),
          extension
        });
      }
    }
  }

  return results;
}

/**
 * Recursively scans a directory for files matching the allowed extensions,
 * ignoring directories and files defined in configuration.
 * 
 * @param {Object} input - Input parameter object.
 * @param {string} input.repositoryPath - Absolute path of the directory to scan.
 * @returns {Promise<{ filesMetadata: Array<Object> }>} - Object containing the array of file metadata objects.
 */
export async function scanRepository({ repositoryPath }) {
  if (!repositoryPath) {
    throw new Error('repositoryPath is required for scanning.');
  }
  const filesMetadata = await scanDirRecursive(repositoryPath, repositoryPath);
  return { filesMetadata };
}
