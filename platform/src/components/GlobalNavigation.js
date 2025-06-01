import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './GlobalNavigation.css';

function GlobalNavigation() {
  const location = useLocation();
  
  // Function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="global-navigation">
      <div className="nav-logo">
        <Link to="/">Digital Companion</Link>
      </div>
      
      <div className="nav-links">
        <Link to="/" className={isActive('/') ? 'active' : ''}>
          Home
        </Link>
        
        <Link to="/about" className={isActive('/about') ? 'active' : ''}>
          About Us
        </Link>
        
        <Link to="/how-it-works" className={isActive('/how-it-works') ? 'active' : ''}>
          How It Works
        </Link>
      </div>
    </nav>
  );
}

export default GlobalNavigation;
