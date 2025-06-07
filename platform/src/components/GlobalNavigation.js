import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './GlobalNavigation.css';
import logoImage from '../assets/logo.png'; // Make sure this path is correct for your project

function GlobalNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* Coming Soon Banner */}
      <div className="coming-soon-banner">
        Coming Soon - Join our Beta Program!
      </div>
      
      {/* Navigation Bar */}
      <nav className="global-navigation">
        <div className="nav-logo">
          <img src={logoImage} alt="Digital Companion Logo" />
          <Link to="/">Digital Companion</Link>
        </div>
        
        <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/how-it-works" className="nav-link">How It Works</Link>
          
          <div className="dropdown">
            <button className="dropdown-button">Digital Companion Platform ▼</button>
            <div className="dropdown-content">
              <Link to="/platform/tasks">Tasks Management</Link>
              <Link to="/platform/estate">Estate</Link>
              <Link to="/platform/journal">Journal</Link>
              <Link to="/platform/meditation">Meditation</Link>
              <Link to="/platform/memory">Memory</Link>
              <Link to="/platform/practical-guides">Practical Guides</Link>
              <Link to="/platform/emotional-support">Emotional Support Resources</Link>
              <Link to="/platform/services">Services</Link>
            </div>
          </div>
          
          <Link to="/faq" className="nav-link">FAQ</Link>
          <Link to="/privacy" className="nav-link">Privacy Policy</Link>
          <Link to="/terms" className="nav-link">Terms of Service</Link>
        </div>
        
        <div className="mobile-menu-button" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </>
  );
}

export default GlobalNavigation;
