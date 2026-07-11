import React from 'react';
import { useFileUpload } from '../../hooks/useFileUpload.js';
import './UploadCard.css';

/**
 * Generic, fully-reusable upload card.
 * Contains ZERO business logic — all behaviour is driven through props and useFileUpload.
 *
 * Props:
 *   title            {string}    Card heading
 *   description      {string}    Card sub-heading
 *   icon             {ReactNode} Icon shown in the card header
 *   accept           {string}    Native <input accept> attribute  e.g. ".md"
 *   allowedExtensions {string[]} e.g. ['.md']
 *   selectedFile     {object|null} File metadata passed in from parent
 *   error            {string|null} Error message passed in from parent
 *   onFileSelect     {Function}  Called with file metadata or null
 *   onError          {Function}  Called with error string or null
 *   placeholder      {string}    Custom drop-zone label (optional)
 */
export default function UploadCard({
  title,
  description,
  icon,
  accept,
  allowedExtensions,
  selectedFile,
  error,
  onFileSelect,
  onError,
  placeholder,
}) {
  const {
    fileInputRef,
    isDragActive,
    handleBrowse,
    handleInputChange,
    handleDrop,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    removeFile,
  } = useFileUpload({ allowedExtensions, onFileSelect, onError });

  const dropzoneClasses = [
    'upload-dropzone',
    isDragActive ? 'upload-dropzone-active' : '',
    error ? 'upload-dropzone-error' : '',
    selectedFile ? 'upload-dropzone-uploaded' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`upload-card${error ? ' upload-card-has-error' : ''}`}>
      {/* Header */}
      <div className="upload-card-header">
        <div className="upload-card-icon">{icon}</div>
        <div>
          <h3 className="upload-card-title">{title}</h3>
          <p className="upload-card-desc">{description}</p>
        </div>
      </div>

      {/* Hidden native input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        hidden
        onChange={handleInputChange}
        aria-hidden="true"
      />

      {/* Drop zone */}
      <div
        className={dropzoneClasses}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        aria-label={`Upload area for ${title}. Drag and drop your file here or click Browse File.`}
        role="region"
      >
        {selectedFile ? (
          /* ── Uploaded state ── */
          <div className="upload-file-info">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="upload-file-doc-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>

            <div className="upload-file-details">
              <span className="upload-file-name">{selectedFile.name}</span>
              <span className="upload-file-size">{selectedFile.formattedSize}</span>
            </div>

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--success-color)"
              strokeWidth="2"
              className="upload-file-check-icon"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>

            <div className="upload-file-actions">
              <button
                className="upload-action-btn upload-replace-btn"
                onClick={handleBrowse}
                type="button"
              >
                Replace
              </button>
              <button
                className="upload-action-btn upload-remove-btn"
                onClick={removeFile}
                type="button"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          /* ── Default / drag-active state ── */
          <>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="upload-dropzone-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>

            <p className="upload-dropzone-text">
              {placeholder || (
                <>
                  Drag &amp; drop your file here
                  <br />
                  <span className="upload-dropzone-or">or</span>
                </>
              )}
            </p>

            <button
              className="upload-browse-btn"
              onClick={handleBrowse}
              type="button"
            >
              Browse File
            </button>
          </>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="upload-error-message" role="alert">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="upload-error-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
}
