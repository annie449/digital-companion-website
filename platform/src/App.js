import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import common components
import GlobalNavigation from './common/GlobalNavigation';

// Import only essential pages initially
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import HowItWorksPage from './pages/HowItWorksPage';

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
          <div className="footer-content">
            <div className="footer-copyright">
              &copy; {new Date().getFullYear()} Digital Companion
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
