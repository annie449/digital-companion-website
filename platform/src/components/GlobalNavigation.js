import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './GlobalNavigation.css';

function GlobalNavigation() {
  const [showDropdown, setShowDropdown] = useState(false);
  
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="global-navigation">
      <div className="nav-logo">
        <NavLink to="/">Digital Companion</NavLink>
      </div>
      
      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About Us</NavLink>
        <NavLink to="/how-it-works">How It Works</NavLink>
        
        <div className="dropdown">
          <button 
            className="dropdown-button" 
            onClick={toggleDropdown}
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            Digital Companion Platform
          </button>
          
          {showDropdown && (
            <div 
              className="dropdown-content"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <NavLink to="/tasks">Tasks Management</NavLink>
              <NavLink to="/estate">Estate</NavLink>
              <NavLink to="/journal">Journal</NavLink>
              <NavLink to="/meditation">Meditation</NavLink>
              <NavLink to="/memory">Memory</NavLink>
              <NavLink to="/practical-guides">Practical Guides</NavLink>
              <NavLink to="/emotional-support">Emotional Support</NavLink>
              <NavLink to="/services">Services</NavLink>
            </div>
          )}
        </div>
        
        <NavLink to="/faq">FAQ</NavLink>
        <NavLink to="/privacy">Privacy Policy</NavLink>
        <NavLink to="/terms">Terms of Service</NavLink>
      </div>
    </nav>
  );
}

export default GlobalNavigation;
