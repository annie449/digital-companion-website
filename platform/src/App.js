import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import common components
import GlobalNavigation from './components/GlobalNavigation';

// Import page components from their new location
import HomePage from './components/HomePage';
import AboutUsPage from './components/AboutUsPage';
import HowItWorksPage from './components/HowItWorksPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <GlobalNavigation />
        
        <main className="main-content">
          <Routes>
            {/* Start with just these essential routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<div className="not-found">Page not found</div>} />
          </Routes>
        </main>
        
        <footer className="app-footer">
          <p>&copy; {new Date().getFullYear()} Digital Companion. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
