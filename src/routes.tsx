import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { Upload } from './pages/Upload';
import { MatchResults } from './pages/MatchResults';
import { VendorInsights } from './pages/VendorInsights';
import { NotFound } from './pages/NotFound';

export const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="upload" element={<Upload />} />
          <Route path="match-results" element={<MatchResults />} />
          <Route path="vendor-insights" element={<VendorInsights />} />
          <Route path="reports" element={<Dashboard />} />
          <Route path="settings" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};