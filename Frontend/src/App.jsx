import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout.jsx';
import StudentDetails from './pages/StudentDetails.jsx';
import EmptyState from './components/Common/EmptyState.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<EmptyState />} />
          <Route path="student/:studentId" element={<StudentDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}
