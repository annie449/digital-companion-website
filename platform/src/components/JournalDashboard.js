import React from 'react';
import './JournalDashboard.css';

function JournalDashboard() {
  return (
    <div className="journal-dashboard">
      <h1>Journal Dashboard</h1>
      <p className="dashboard-description">Record your thoughts, feelings, and memories in a private journal.</p>
      
      <div className="journal-actions">
        <button className="primary-action">Create New Entry</button>
        <button className="secondary-action">View Journal Prompts</button>
      </div>
      
      <div className="journal-entries">
        <h2>Recent Entries</h2>
        <div className="entries-list">
          <div className="entry-card">
            <div className="entry-date">
              <div className="date-month">Jun</div>
              <div className="date-day">01</div>
              <div className="date-year">2025</div>
            </div>
            <div className="entry-content">
              <h3>Finding Small Moments of Peace</h3>
              <p className="entry-preview">This first week has been incredibly difficult, but I\'m finding small moments of peace...</p>
              <div className="entry-footer">
                <span className="entry-mood positive">Hopeful</span>
                <button className="entry-action">Read More</button>
              </div>
            </div>
          </div>
          
          <div className="entry-card">
            <div className="entry-date">
              <div className="date-month">May</div>
              <div className="date-day">28</div>
              <div className="date-year">2025</div>
            </div>
            <div className="entry-content">
              <h3>Memories That Bring Comfort</h3>
              <p className="entry-preview">Today I found an old photo album and spent hours looking through memories...</p>
              <div className="entry-footer">
                <span className="entry-mood mixed">Nostalgic</span>
                <button className="entry-action">Read More</button>
              </div>
            </div>
          </div>
          
          <div className="entry-card">
            <div className="entry-date">
              <div className="date-month">May</div>
              <div className="date-day">25</div>
              <div className="date-year">2025</div>
            </div>
            <div className="entry-content">
              <h3>The First Few Days</h3>
              <p className="entry-preview">Everything feels overwhelming right now. The support from friends has been...</p>
              <div className="entry-footer">
                <span className="entry-mood negative">Overwhelmed</span>
                <button className="entry-action">Read More</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="journal-resources">
        <h2>Journaling Resources</h2>
        <div className="resources-grid">
          <div className="resource-card">
            <h3>Benefits of Grief Journaling</h3>
            <p>Learn how journaling can help process emotions during difficult times.</p>
            <a href="#" className="resource-link">Read Article</a>
          </div>
          
          <div className="resource-card">
            <h3>30 Journal Prompts for Grief</h3>
            <p>Thoughtful prompts to help you express and process your feelings.</p>
            <a href="#" className="resource-link">View Prompts</a>
          </div>
          
          <div className="resource-card">
            <h3>Creating a Memory Journal</h3>
            <p>How to create a journal dedicated to preserving special memories.</p>
            <a href="#" className="resource-link">Read Guide</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JournalDashboard;
