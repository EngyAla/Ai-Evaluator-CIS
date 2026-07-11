import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Dashboard from '../../pages/Dashboard.jsx';
import './Layout.css';

export default function Layout() {
  return (
    <div className="app-shell">
      <Header />
      <div className="app-body">
        {/* Left Panel — Dashboard (always visible) */}
        <div className="pane pane-left">
          <Dashboard />
        </div>
        {/* Right Panel — Route-specific details or empty state */}
        <div className="pane pane-right">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
