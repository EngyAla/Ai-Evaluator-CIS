import React from 'react';
import './Spinner.css';

export default function Spinner({ size = 'medium', color }) {
  const style = color === 'white'
    ? { borderTopColor: '#ffffff', borderColor: 'rgba(255,255,255,0.2)', borderTopColor: '#ffffff' }
    : undefined;
  return <div className={`spinner spinner-${size}`} style={style} />;
}
