import React from 'react';
import './MainDashboard.css';

function MainDashboard() {
  return (
    <div className="main-dashboard">
      <div className="hero-section">
        <h1>Welcome to Digital Companion</h1>
        <p className="subtitle">Your personal guide through difficult times</p>
        
        <div className="intro-text">
          <p>Digital Companion is a supportive platform designed to help you navigate through grief, loss, and life transitions. We provide tools, resources, and guidance to make difficult processes more manageable.</p>
        </div>
        
        <div className="cta-buttons">
          <a href="/tasks" className="primary-button">Get Started</a>
          <a href="https://forms.gle/YourBetaTestingFormLink" className="secondary-button">Join Beta Testing</a>
        </div>
      </div>
      
      <div className="features-section">
        <h2>How We Can Help</h2>
        
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Task Management</h3>
            <p>Organize and track important tasks during difficult transitions.</p>
          </div>
          
          <div className="feature-card">
            <h3>Estate Planning</h3>
            <p>Prepare and manage important documents and decisions.</p>
          </div>
          
          <div className="feature-card">
            <h3>Memory Preservation</h3>
            <p>Create and share meaningful memories with loved ones.</p>
          </div>
          
          <div className="feature-card">
            <h3>Wellbeing Support</h3>
            <p>Access meditation, journaling, and emotional support resources.</p>
          </div>
        </div>
      </div>
      
      <div className="about-section">
        <h2>About Digital Companion</h2>
        <p>Digital Companion was created to provide compassionate support during life's most challenging moments. Our platform combines practical tools with emotional support resources to help you navigate grief, loss, and major life transitions.</p>
        <p>We're currently in beta testing and would love your feedback to help us improve our services.</p>
      </div>
    </div>
  );
}

export default MainDashboard;
