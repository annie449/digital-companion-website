import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './GlobalNavigation.css';

function GlobalNavigation() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <nav className="global-navigation">
      <Link to="/" className="nav-brand">Digital Companion™</Link>
      
      <div className={`nav-links ${showMobileMenu ? 'mobile-active' : ''}`}>
        <NavLink to="/" end>🏠 Home</NavLink>
        <NavLink to="/tasks">✓ Tasks</NavLink>
        <NavLink to="/estate">📊 Estate</NavLink>
        <NavLink to="/journal">📓 Journal</NavLink>
        <NavLink to="/meditation">🧘 Meditation</NavLink>
        <NavLink to="/services">🔍 Services</NavLink>
        <NavLink to="/help">❓ Help</NavLink>
      </div>
      
      <div className="nav-actions">
        <button className="login-button" aria-label="Login">Login</button>
        <button aria-label="Notifications">🔔 2</button>
        <button aria-label="User Profile">JD</button>
      </div>
      
      <button 
        className="mobile-menu-button" 
        aria-label="Menu" 
        onClick={toggleMobileMenu}
      >
        ☰
      </button>
    </nav>
  );
}

export default GlobalNavigation;
