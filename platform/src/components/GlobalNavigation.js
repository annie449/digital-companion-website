import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './GlobalNavigation.css';

/**
 * Global Navigation Component
 * 
 * This component provides the main navigation for the Digital Companion platform,
 * including links to all major features and user account options.
 */
const GlobalNavigation = () => {
  const location = useLocation();
  
  // Helper function to check if a path is active
  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="global-navigation">
      <div className="nav-brand">
        <Link to="/">Digital Companion™</Link>
      </div>
      
      <div className="nav-links">
        <Link to="/" className={isActive('/') ? 'active' : ''}>
          🏠Home
        </Link>
        <Link to="/tasks" className={isActive('/tasks') ? 'active' : ''}>
          ✓Tasks
        </Link>
        <Link to="/estate" className={isActive('/estate') ? 'active' : ''}>
          📊Estate
        </Link>
        <Link to="/journal" className={isActive('/journal') ? 'active' : ''}>
          📓Journal
        </Link>
        <Link to="/meditation" className={isActive('/meditation') ? 'active' : ''}>
          🧘Meditation
        </Link>
        <Link to="/services" className={isActive('/services') ? 'active' : ''}>
          🔍Services
        </Link>
        <Link to="/help" className={isActive('/help') ? 'active' : ''}>
          ❓Help
        </Link>
      </div>
      
      <div className="nav-actions">
        <button className="notification-button">
          🔔<span className="notification-badge">2</span>
        </button>
        <button className="user-button">
          JD
        </button>
      </div>
    </nav>
  );
};

export default GlobalNavigation;
