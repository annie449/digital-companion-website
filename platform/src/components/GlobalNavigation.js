import React from 'react';
import { Link } from 'react-router-dom';
import './GlobalNavigation.css';

function GlobalNavigation() {
  return (
    <nav className="global-navigation">
      <div className="nav-logo">
        <Link to="/">Digital Companion™</Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">
          <span className="nav-icon">🏠</span>
          <span className="nav-text">Home</span>
        </Link>
        <Link to="/tasks" className="nav-link">
          <span className="nav-icon">✓</span>
          <span className="nav-text">Tasks</span>
        </Link>
        <Link to="/estate" className="nav-link">
          <span className="nav-icon">📊</span>
          <span className="nav-text">Estate</span>
        </Link>
        <Link to="/journal" className="nav-link">
          <span className="nav-icon">📓</span>
          <span className="nav-text">Journal</span>
        </Link>
        <Link to="/meditation" className="nav-link">
          <span className="nav-icon">🧘</span>
          <span className="nav-text">Meditation</span>
        </Link>
        <Link to="/services" className="nav-link">
          <span className="nav-icon">🔍</span>
          <span className="nav-text">Services</span>
        </Link>
        <Link to="/help" className="nav-link">
          <span className="nav-icon">❓</span>
          <span className="nav-text">Help</span>
        </Link>
      </div>
      <div className="nav-actions">
        <button className="notification-button">
          <span className="nav-icon">🔔</span>
          <span className="notification-count">2</span>
        </button>
        <button className="user-button">
          <span className="user-initials">JD</span>
        </button>
      </div>
    </nav>
  );
}

export default GlobalNavigation;
