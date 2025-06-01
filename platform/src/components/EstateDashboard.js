import React from 'react';
import './EstateDashboard.css';

function EstateDashboard() {
  return (
    <div className="estate-dashboard">
      <h1>Estate Dashboard</h1>
      <p className="dashboard-description">Manage estate planning and memory preservation.</p>
      
      <div className="estate-sections">
        <div className="estate-section-card">
          <h2>Estate Planning</h2>
          <p>Organize important documents and make critical decisions for the future.</p>
          <div className="progress-container">
            <div className="progress-label">
              <span>Progress</span>
              <span>35%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '35%' }}></div>
            </div>
          </div>
          <a href="/estate/planning" className="section-button">Continue Planning</a>
        </div>
        
        <div className="estate-section-card">
          <h2>Memory Vault</h2>
          <p>Preserve and share important memories, stories, and messages.</p>
          <div className="progress-container">
            <div className="progress-label">
              <span>Memories Saved</span>
              <span>12</span>
            </div>
            <div className="memory-preview">
              <div className="memory-item">Family vacation photos</div>
              <div className="memory-item">Wedding anniversary video</div>
              <div className="memory-item">Letter to children</div>
            </div>
          </div>
          <a href="/estate/memory-vault" className="section-button">Open Memory Vault</a>
        </div>
      </div>
      
      <div className="estate-resources">
        <h2>Helpful Resources</h2>
        <div className="resources-grid">
          <div className="resource-card">
            <h3>Estate Planning Guide</h3>
            <p>A comprehensive guide to organizing your estate and important documents.</p>
            <a href="#" className="resource-link">Read Guide</a>
          </div>
          <div className="resource-card">
            <h3>Legal Document Templates</h3>
            <p>Access templates for wills, power of attorney, and other important documents.</p>
            <a href="#" className="resource-link">View Templates</a>
          </div>
          <div className="resource-card">
            <h3>Memory Preservation Tips</h3>
            <p>Learn how to effectively preserve and share meaningful memories.</p>
            <a href="#" className="resource-link">Read Tips</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EstateDashboard;
