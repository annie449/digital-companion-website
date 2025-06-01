import React from 'react';
import './MemoryVaultDashboard.css';

function MemoryVaultDashboard() {
  return (
    <div className="memory-vault-dashboard">
      <h1>Memory Vault</h1>
      <p className="dashboard-description">Preserve and share important memories, stories, and messages.</p>
      
      <div className="memory-actions">
        <button className="primary-action">Add New Memory</button>
        <button className="secondary-action">Share Memory Collection</button>
      </div>
      
      <div className="memory-categories">
        <div className="category-tabs">
          <button className="category-tab active">All Memories</button>
          <button className="category-tab">Photos</button>
          <button className="category-tab">Videos</button>
          <button className="category-tab">Stories</button>
          <button className="category-tab">Letters</button>
          <button className="category-tab">Audio</button>
        </div>
        
        <div className="memory-grid">
          <div className="memory-card">
            <div className="memory-preview photo">
              <div className="memory-icon">📷</div>
            </div>
            <div className="memory-details">
              <h3>Family Vacation Photos</h3>
              <p className="memory-date">Added: May 15, 2025</p>
              <p className="memory-description">Photos from our trip to the beach last summer.</p>
            </div>
            <div className="memory-actions">
              <button className="memory-action">View</button>
              <button className="memory-action">Share</button>
            </div>
          </div>
          
          <div className="memory-card">
            <div className="memory-preview video">
              <div className="memory-icon">🎥</div>
            </div>
            <div className="memory-details">
              <h3>Wedding Anniversary Video</h3>
              <p className="memory-date">Added: April 22, 2025</p>
              <p className="memory-description">Video compilation of our 25th wedding anniversary celebration.</p>
            </div>
            <div className="memory-actions">
              <button className="memory-action">View</button>
              <button className="memory-action">Share</button>
            </div>
          </div>
          
          <div className="memory-card">
            <div className="memory-preview letter">
              <div className="memory-icon">✉️</div>
            </div>
            <div className="memory-details">
              <h3>Letter to Children</h3>
              <p className="memory-date">Added: June 1, 2025</p>
              <p className="memory-description">A letter sharing life lessons and memories for my children.</p>
            </div>
            <div className="memory-actions">
              <button className="memory-action">View</button>
              <button className="memory-action">Share</button>
            </div>
          </div>
          
          <div className="memory-card">
            <div className="memory-preview story">
              <div className="memory-icon">📖</div>
            </div>
            <div className="memory-details">
              <h3>Childhood Stories</h3>
              <p className="memory-date">Added: May 28, 2025</p>
              <p className="memory-description">Collection of stories from my childhood growing up in the countryside.</p>
            </div>
            <div className="memory-actions">
              <button className="memory-action">View</button>
              <button className="memory-action">Share</button>
            </div>
          </div>
          
          <div className="memory-card">
            <div className="memory-preview audio">
              <div className="memory-icon">🎵</div>
            </div>
            <div className="memory-details">
              <h3>Favorite Family Recipes</h3>
              <p className="memory-date">Added: May 10, 2025</p>
              <p className="memory-description">Audio recordings explaining family recipes passed down through generations.</p>
            </div>
            <div className="memory-actions">
              <button className="memory-action">View</button>
              <button className="memory-action">Share</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="memory-guides">
        <h2>Memory Preservation Guides</h2>
        <div className="guides-grid">
          <div className="guide-card">
            <h3>Capturing Meaningful Photos</h3>
            <p>Tips for taking and organizing photos that tell your story.</p>
            <a href="#" className="guide-link">Read Guide</a>
          </div>
          
          <div className="guide-card">
            <h3>Recording Video Memories</h3>
            <p>How to create meaningful video content for future generations.</p>
            <a href="#" className="guide-link">Read Guide</a>
          </div>
          
          <div className="guide-card">
            <h3>Writing Legacy Letters</h3>
            <p>Guidance for writing letters that share your values and memories.</p>
            <a href="#" className="guide-link">Read Guide</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemoryVaultDashboard;
