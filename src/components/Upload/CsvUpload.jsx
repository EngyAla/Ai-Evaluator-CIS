import React from 'react';
import UploadCard from './UploadCard.jsx';
import { FILE_TYPES } from '../../constants/file-types.js';

const CsvIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 10h18M3 14h18M10 3v18M14 3v18M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
    />
  </svg>
);

/**
 * CSV-specific wrapper around the generic UploadCard.
 * Injects CSV-specific props; the parent (Dashboard) owns the state.
 */
export default function CsvUpload({ selectedFile, error, onFileSelect, onError }) {
  return (
    <UploadCard
      title="Students List"
      description="Upload a CSV file containing student names and GitHub repository URLs."
      icon={<CsvIcon />}
      accept=".csv"
      allowedExtensions={FILE_TYPES.STUDENTS}
      selectedFile={selectedFile}
      error={error}
      onFileSelect={onFileSelect}
      onError={onError}
    />
  );
}
