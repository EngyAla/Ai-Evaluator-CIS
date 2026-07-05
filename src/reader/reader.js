import fs from 'fs/promises';

/**
 * Reads the content and size of scanned files in parallel, assigning an incremental ID.
 * Excludes absolute path details from the final output objects.
 * 
 * @param {Object} input - Input parameter object.
 * @param {Array<Object>} input.filesMetadata - Array of file metadata objects from the scanner.
 * @returns {Promise<{ sourceFiles: Array<Object> }>} - Object containing the array of complete SourceFile objects.
 */
export async function readFiles({ filesMetadata }) {
  if (!Array.isArray(filesMetadata)) {
    throw new Error('filesMetadata must be an array.');
  }

  const sourceFiles = await Promise.all(
    filesMetadata.map(async (fileMeta, index) => {
      try {
        const stats = await fs.stat(fileMeta.absolutePath);
        const content = await fs.readFile(fileMeta.absolutePath, 'utf8');
        return {
          id: index + 1,
          fileName: fileMeta.fileName,
          relativePath: fileMeta.relativePath,
          extension: fileMeta.extension,
          size: stats.size,
          content
        };
      } catch (error) {
        throw new Error(`Failed to read file ${fileMeta.relativePath}: ${error.message}`);
      }
    })
  );

  return { sourceFiles };
}
