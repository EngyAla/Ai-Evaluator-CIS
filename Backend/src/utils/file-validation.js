import { getFileExtension } from './file-helpers.js';

/**
 * Validates that the given file's extension is within the allowed list.
 *
 * @param {File} file - The native browser File object to validate.
 * @param {string[]} allowedExtensions - e.g. ['.md'] or ['.csv']
 * @param {{ maxSize?: number }} [options] - Optional constraints (maxSize in bytes).
 * @returns {{ valid: boolean, error: string|null }}
 */
export function validateExtension(file, allowedExtensions, options = {}) {
  const ext = getFileExtension(file.name);

  if (!allowedExtensions.includes(ext)) {
    const list = allowedExtensions
      .map((e) => `${e.toUpperCase().replace('.', '')} (${e})`)
      .join(' or ');
    return {
      valid: false,
      error: `Please upload a ${list} file.`,
    };
  }

  // Optional: max size check (not enforced yet, prepared for future use)
  if (options.maxSize !== undefined && file.size > options.maxSize) {
    return {
      valid: false,
      error: `File size exceeds the maximum allowed size of ${Math.round(options.maxSize / 1024)} KB.`,
    };
  }

  return { valid: true, error: null };
}

/**
 * Validates that only a single file was dropped.
 *
 * @param {FileList} fileList
 * @returns {{ valid: boolean, error: string|null }}
 */
export function validateSingleFile(fileList) {
  if (fileList.length > 1) {
    return { valid: false, error: 'Only one file is allowed.' };
  }
  return { valid: true, error: null };
}
