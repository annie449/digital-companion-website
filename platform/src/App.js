import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
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

/**
 * Main App Component
 * 
 * This component serves as the root of the application and defines the routing structure.
 * It includes routes for all major features including the new Estate Planning and Memory Vault.
 */
function App() {
  return (
    <div className="App">
      <GlobalNavigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<MainDashboard />} />
          <Route path="/tasks" element={<TasksDashboard />} />
          <Route path="/estate" element={<EstateDashboard />} />
          <Route path="/estate/planning" element={<EstatePlanningDashboard />} />
          <Route path="/estate/memory-vault" element={<MemoryVaultDashboard />} />
          <Route path="/journal" element={<JournalDashboard />} />
          <Route path="/meditation" element={<MeditationDashboard />} />
          <Route path="/services" element={<ServicesDashboard />} />
          <Route path="/help" element={<HelpDashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
