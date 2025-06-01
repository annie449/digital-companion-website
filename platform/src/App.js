import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import components
import GlobalNavigation from './components/GlobalNavigation';
import MainDashboard from './components/MainDashboard';
import TasksDashboard from './components/TasksDashboard';
import EstateDashboard from './components/EstateDashboard';
import EstatePlanningDashboard from './components/EstatePlanningDashboard';
import MemoryVaultDashboard from './components/MemoryVaultDashboard';
import JournalDashboard from './components/JournalDashboard';
import MeditationDashboard from './components/MeditationDashboard';
import ServicesDashboard from './components/ServicesDashboard';
import HelpDashboard from './components/HelpDashboard';

function App() {
  return (
    <Router>
      <div className="app-container">
        <GlobalNavigation />
        <main className="main-content">
          <Routes>
            {/* Redirect root to main dashboard */}
            <Route path="/" element={<MainDashboard />} />
            
            {/* Main feature routes */}
            <Route path="/tasks" element={<TasksDashboard />} />
            <Route path="/estate" element={<EstateDashboard />} />
            <Route path="/estate/planning" element={<EstatePlanningDashboard />} />
            <Route path="/estate/memory-vault" element={<MemoryVaultDashboard />} />
            <Route path="/journal" element={<JournalDashboard />} />
            <Route path="/meditation" element={<MeditationDashboard />} />
            <Route path="/services" element={<ServicesDashboard />} />
            <Route path="/help" element={<HelpDashboard />} />
            
            {/* Fallback route for any unmatched paths */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
