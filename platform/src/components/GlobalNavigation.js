import React from 'react';
import { NavLink } from 'react-router-dom';
import './GlobalNavigation.css';

function GlobalNavigation() {
  return (
    <nav className="global-navigation">
      <NavLink to="/" className="nav-brand">Digital Companion™</NavLink>
      
      <div className="nav-links">
        <NavLink to="/" end>🏠Home</NavLink>
        <NavLink to="/tasks">✓Tasks</NavLink>
        <NavLink to="/estate">📊Estate</NavLink>
        <NavLink to="/journal">📓Journal</NavLink>
        <NavLink to="/meditation">🧘Meditation</NavLink>
        <NavLink to="/services">🔍Services</NavLink>
        <NavLink to="/help">❓Help</NavLink>
      </div>
      
      <div className="nav-actions">
        <button aria-label="Notifications">🔔2</button>
        <button aria-label="User Profile">JD</button>
      </div>
      
      <button className="mobile-menu-button" aria-label="Menu">☰</button>
    </nav>
  );
}

export default GlobalNavigation;
