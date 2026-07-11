import React from 'react';
import './SectionTitle.css';

export default function SectionTitle({ children, className = '', count }) {
  return (
    <h2 className={`section-title ${className}`}>
      {children}
      {count !== undefined && <span className="section-title-count">({count})</span>}
    </h2>
  );
}
