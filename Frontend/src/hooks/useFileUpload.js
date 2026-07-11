import { useRef, useState, useCallback } from 'react';
import { createFileMetadata } from '../../../Backend/src/utils/file-helpers.js';
import { validateExtension, validateSingleFile } from '../../../Backend/src/utils/file-validation.js';

/**
 * Reusable hook that encapsulates all file upload behavior.
 *
 * @param {object} config
 * @param {string[]} config.allowedExtensions - e.g. ['.md']
 * @param {Function} [config.onFileSelect]    - Called with file metadata when a valid file is chosen.
 * @param {Function} [config.onError]         - Called with the error string when validation fails.
 * @param {{ maxSize?: number }} [config.options] - Optional validation constraints.
 */
export function useFileUpload({ allowedExtensions, onFileSelect, onError, options = {} } = {}) {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);

  /** Process a single File — validate, create metadata, update state. */
  const processFile = useCallback(
    (file) => {
      // Single-file rule is already enforced at the call site for drops,
      // but we call it here too for consistency when invoked from other paths.
      const extResult = validateExtension(file, allowedExtensions, options);
      if (!extResult.valid) {
        setError(extResult.error);
        setSelectedFile(null);
        if (onError) onError(extResult.error);
        return;
      }

      const metadata = createFileMetadata(file);
      setSelectedFile(metadata);
      setError(null);
      if (onFileSelect) onFileSelect(metadata);
    },
    [allowedExtensions, options, onFileSelect, onError]
  );

  /** Open the hidden native file picker. */
  const openFilePicker = useCallback(() => {
    if (fileInputRef.current) {
      // Reset value so re-selecting the same file fires onChange
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  }, []);

  /** Called when Browse File button is clicked. */
  const handleBrowse = useCallback(() => {
    openFilePicker();
  }, [openFilePicker]);

  /** onChange handler for the hidden <input type="file"> */
  const handleInputChange = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  /** Drag events */
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);

      const { files } = e.dataTransfer;

      // Multiple files check
      const singleResult = validateSingleFile(files);
      if (!singleResult.valid) {
        setError(singleResult.error);
        setSelectedFile(null);
        if (onError) onError(singleResult.error);
        return;
      }

      const file = files[0];
      if (file) processFile(file);
    },
    [processFile, onError]
  );

  /** Clear selection and any errors, restoring the default placeholder. */
  const removeFile = useCallback(() => {
    setSelectedFile(null);
    setError(null);
    if (onFileSelect) onFileSelect(null);
    if (onError) onError(null);
  }, [onFileSelect, onError]);

  return {
    fileInputRef,
    selectedFile,
    error,
    isDragActive,
    openFilePicker,
    handleBrowse,
    handleInputChange,
    handleDrop,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    removeFile,
  };
}
