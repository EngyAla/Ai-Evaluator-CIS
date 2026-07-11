/**
 * Formats a raw byte count into a human-readable string.
 *
 * @param {number} bytes - File size in bytes.
 * @returns {string} e.g. "620 B", "2.4 KB", "15.7 MB", "1.2 GB"
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

/**
 * Extracts the lowercase file extension from a filename.
 *
 * @param {string} filename
 * @returns {string} e.g. ".md", ".csv"
 */
export function getFileExtension(filename) {
  const lastDot = filename.lastIndexOf('.');
  if (lastDot === -1) return '';
  return filename.slice(lastDot).toLowerCase();
}

/**
 * Transforms a native File object into a structured metadata object.
 * This object is the canonical representation used throughout the app.
 *
 * @param {File} file - The native browser File object.
 * @returns {{ file: File, name: string, size: number, formattedSize: string, extension: string }}
 */
export function createFileMetadata(file) {
  return {
    file,
    name: file.name,
    size: file.size,
    formattedSize: formatFileSize(file.size),
    extension: getFileExtension(file.name),
  };
}
