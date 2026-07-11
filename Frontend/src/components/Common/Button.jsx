import React from 'react';
import './Button.css';

export default function Button({ children, onClick, variant = 'primary', disabled, className = '', type = 'button' }) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
