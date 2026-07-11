import React from 'react';
import Spinner from './Spinner.jsx';
import './LoadingOverlay.css';

export default function LoadingOverlay({ message = 'Evaluating...' }) {
  return (
    <div className="loading-overlay">
      <div className="loading-overlay-content">
        <Spinner size="large" />
        <p className="loading-overlay-message">{message}</p>
      </div>
    </div>
  );
}
