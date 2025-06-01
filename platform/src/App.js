import React from 'react';
import { DigitalCompanionProvider } from './context/DigitalCompanionContext';
import GlobalNavigation from './components/GlobalNavigation';
import MainDashboard from './components/MainDashboard';
import './App.css';

function App() {
  return (
    <DigitalCompanionProvider>
      <div className="app-container">
        <GlobalNavigation />
        <main className="main-content">
          <MainDashboard />
        </main>
      </div>
    </DigitalCompanionProvider>
  );
}

export default App;
