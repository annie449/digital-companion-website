import React from 'react';
import './MainDashboard.css';
import { Link } from 'react-router-dom';

function MainDashboard() {
  return (
    <div className="main-dashboard">
      <div className="dashboard-header">
        <h1>Welcome to Digital Companion</h1>
        <div className="welcome-message">
          <p>Your personal guide through difficult times</p>
        </div>
      </div>
      
      {/* Company Info Section - Restored */}
      <div className="company-info-section">
        <h2>About Digital Companion</h2>
        <p>Digital Companion is a supportive platform designed to help individuals navigate through grief and loss. We provide tools and resources to assist with practical tasks, emotional wellbeing, and preserving memories during difficult times.</p>
        
        <div className="mission-statement">
          <h3>Our Mission</h3>
          <p>To provide compassionate digital support that helps people manage the practical and emotional challenges following the loss of a loved one.</p>
        </div>
        
        <div className="beta-testing">
          <h3>Join Our Beta Program</h3>
          <p>We're currently in beta testing and would love your feedback to improve our platform.</p>
          <a href="https://forms.gle/YourBetaSurveyLink" className="beta-button">Take Our Survey</a>
        </div>
      </div>
      
      <h2 className="section-title">Your Journey</h2>
      <div className="journey-stats">
        <div className="stat-item">
          <div className="stat-value">4</div>
          <div className="stat-label">Tasks</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">3</div>
          <div className="stat-label">Journal Entries</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">12</div>
          <div className="stat-label">Meditation Sessions</div>
        </div>
      </div>
      
      <div className="feature-cards">
        <div className="feature-card">
          <div className="feature-icon">✓</div>
          <h3 className="feature-title">Tasks</h3>
          <p className="feature-description">Track and manage your tasks to stay organized during this difficult time.</p>
          <Link to="/tasks" className="feature-button">View Tasks</Link>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3 className="feature-title">Estate</h3>
          <p className="feature-description">Manage and track all estate-related information in one place.</p>
          <Link to="/estate" className="feature-button">View Estate</Link>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">📓</div>
          <h3 className="feature-title">Journal</h3>
          <p className="feature-description">Record your thoughts, feelings, and memories during this journey.</p>
          <Link to="/journal" className="feature-button">Open Journal</Link>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">🧘</div>
          <h3 className="feature-title">Meditation</h3>
          <p className="feature-description">Find moments of peace and mindfulness during your grief journey.</p>
          <Link to="/meditation" className="feature-button">Start Meditation</Link>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <h3 className="feature-title">Services</h3>
          <p className="feature-description">Find support services and resources to help you during this difficult time.</p>
          <Link to="/services" className="feature-button">Find Services</Link>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">❓</div>
          <h3 className="feature-title">Help</h3>
          <p className="feature-description">Get assistance and answers to your questions about Digital Companion.</p>
          <Link to="/help" className="feature-button">Get Help</Link>
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;
