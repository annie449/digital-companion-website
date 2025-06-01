import React, { useContext } from 'react';
import { DigitalCompanionContext } from '../context/DigitalCompanionContext';
import './GlobalNavigation.css';

function GlobalNavigation() {
  const { currentView, navigateTo, user, notifications } = useContext(DigitalCompanionContext);
  
  // Count unread notifications
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  // Get user initials for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <nav className="global-navigation">
      <div className="logo">
        <img src="/logo.png" alt="Digital Companion" className="logo-image" />
        <h1 className="logo-text">Digital Companion™</h1>
      </div>
      
      <ul className="nav-links">
        <li className={currentView === 'home' ? 'active' : ''}>
          <a href="#" onClick={() => navigateTo('home')}>
            <span className="nav-icon">🏠</span>
            <span className="nav-text">Home</span>
          </a>
        </li>
        <li className={currentView === 'tasks' ? 'active' : ''}>
          <a href="#" onClick={() => navigateTo('tasks')}>
            <span className="nav-icon">✓</span>
            <span className="nav-text">Tasks</span>
          </a>
        </li>
        <li className={currentView === 'estate' ? 'active' : ''}>
          <a href="#" onClick={() => navigateTo('estate')}>
            <span className="nav-icon">📊</span>
            <span className="nav-text">Estate</span>
          </a>
        </li>
        <li className={currentView === 'journal' ? 'active' : ''}>
          <a href="#" onClick={() => navigateTo('journal')}>
            <span className="nav-icon">📓</span>
            <span className="nav-text">Journal</span>
          </a>
        </li>
        <li className={currentView === 'services' ? 'active' : ''}>
          <a href="#" onClick={() => navigateTo('services')}>
            <span className="nav-icon">🔍</span>
            <span className="nav-text">Services</span>
          </a>
        </li>
        <li className={currentView === 'help' ? 'active' : ''}>
          <a href="#" onClick={() => navigateTo('help')}>
            <span className="nav-icon">❓</span>
            <span className="nav-text">Help</span>
          </a>
        </li>
      </ul>
      
      <div className="user-controls">
        <div className="notifications">
          <button className="notification-button" onClick={() => navigateTo('notifications')}>
            <span className="notification-icon">🔔</span>
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>
        </div>
        
        <div className="user-profile">
          <button className="profile-button" onClick={() => navigateTo('profile')}>
            <div className="profile-avatar">{getInitials(user.name)}</div>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default GlobalNavigation;
