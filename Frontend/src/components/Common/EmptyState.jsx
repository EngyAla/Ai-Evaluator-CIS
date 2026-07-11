import React from 'react';
import './EmptyState.css';

export default function EmptyState({ message = 'Select a student from the list to view their evaluation details.' }) {
  return (
    <div className="empty-state-container">
      <div className="empty-state-card">
        <svg className="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-.621-.504-1.125-1.125-1.125H9.75M8.25 21h8.25A2.25 2.25 0 0018.75 18.75V5.25A2.25 2.25 0 0016.5 3h-8.25A2.25 2.25 0 006 5.25v13.5A2.25 2.25 0 008.25 21z" />
        </svg>
        <h3 className="empty-state-title">Student Evaluation Details</h3>
        <p className="empty-state-message">{message}</p>
      </div>
    </div>
  );
}
