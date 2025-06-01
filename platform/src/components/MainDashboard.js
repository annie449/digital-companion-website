import React from 'react';
import './MainDashboard.css';

/**
 * Main Dashboard Component
 * 
 * This component serves as the homepage/main dashboard for the Digital Companion platform,
 * providing an overview of all features and recent activity.
 */
const MainDashboard = () => {
  return (
    <div className="main-dashboard">
      <header className="dashboard-header">
        <h1>Welcome to Digital Companion</h1>
        <p>Your personal guide through difficult times</p>
      </header>

      <section className="dashboard-summary">
        <div className="summary-card">
          <h2>Your Journey</h2>
          <p>Track your progress and access key resources to support you during this time.</p>
          <div className="progress-container">
            <div className="progress-item">
              <div className="progress-value">4</div>
              <div className="progress-label">Tasks</div>
            </div>
            <div className="progress-item">
              <div className="progress-value">3</div>
              <div className="progress-label">Journal Entries</div>
            </div>
            <div className="progress-item">
              <div className="progress-value">12</div>
              <div className="progress-label">Meditation Sessions</div>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-cards">
        <div className="feature-card">
          <div className="feature-icon">✓</div>
          <h3>Tasks</h3>
          <p>Track and manage your tasks to stay organized during this difficult time.</p>
          <button className="feature-button">View Tasks</button>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Estate</h3>
          <p>Manage and track all estate-related information in one place.</p>
          <button className="feature-button">View Estate</button>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📓</div>
          <h3>Journal</h3>
          <p>Record your thoughts, feelings, and memories during this journey.</p>
          <button className="feature-button">Open Journal</button>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🧘</div>
          <h3>Meditation</h3>
          <p>Find moments of peace and mindfulness during your grief journey.</p>
          <button className="feature-button">Start Meditation</button>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <h3>Services</h3>
          <p>Find support services and resources to help you during this difficult time.</p>
          <button className="feature-button">Find Services</button>
        </div>

        <div className="feature-card">
          <div className="feature-icon">❓</div>
          <h3>Help</h3>
          <p>Get assistance and answers to your questions about Digital Companion.</p>
          <button className="feature-button">Get Help</button>
        </div>
      </section>

      <section className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">✓</div>
            <div className="activity-content">
              <h4>Task Completed</h4>
              <p>Organize memorial service</p>
              <div className="activity-meta">2 days ago</div>
            </div>
          </div>

          <div className="activity-item">
            <div className="activity-icon">📓</div>
            <div className="activity-content">
              <h4>Journal Entry Added</h4>
              <p>First Week Reflections</p>
              <div className="activity-meta">4 days ago</div>
            </div>
          </div>

          <div className="activity-item">
            <div className="activity-icon">🧘</div>
            <div className="activity-content">
              <h4>Meditation Session</h4>
              <p>Mindful Breathing - 5 minutes</p>
              <div className="activity-meta">1 week ago</div>
            </div>
          </div>
        </div>
      </section>

      <section className="wellbeing-check">
        <h2>Wellbeing Check</h2>
        <p>How are you feeling today?</p>
        <div className="mood-tracker">
          <button className="mood-button">😔</button>
          <button className="mood-button">😐</button>
          <button className="mood-button">🙂</button>
          <button className="mood-button">😊</button>
        </div>
      </section>
    </div>
  );
};

export default MainDashboard;
