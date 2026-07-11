import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css';

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <button className="back-button" onClick={() => navigate('/')}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="back-icon">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
    </button>
  );
}
