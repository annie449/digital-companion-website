import React from 'react';
import './JournalDashboard.css';

/**
 * Journal Dashboard Component
 * 
 * This component displays the user's journal entries and provides
 * functionality for creating and managing personal reflections.
 */
const JournalDashboard = () => {
  // Sample journal entries - in a real app, this would come from a context or API
  const journalEntries = [
    {
      id: 1,
      title: 'First Week Reflections',
      preview: 'This first week has been incredibly difficult, but I'm finding small moments of peace...',
      date: '2025-05-28',
      mood: 'reflective',
      tags: ['grief', 'coping', 'memories']
    },
    {
      id: 2,
      title: 'Memories of Summer Trips',
      preview: 'Today I found myself thinking about all our summer trips to the lake house...',
      date: '2025-05-25',
      mood: 'nostalgic',
      tags: ['memories', 'family', 'trips']
    },
    {
      id: 3,
      title: 'Planning the Memorial',
      preview: 'The memorial service planning is underway. I want to make sure it reflects who they truly were...',
      date: '2025-05-20',
      mood: 'determined',
      tags: ['memorial', 'planning', 'family']
    }
  ];

  return (
    <div className="journal-dashboard">
      <header className="dashboard-header">
        <h1>Journal</h1>
        <p>Record your thoughts, feelings, and memories during this journey.</p>
      </header>

      <section className="journal-actions">
        <button className="primary-button">
          <span className="button-icon">✏️</span>
          New Entry
        </button>
        <div className="search-container">
          <input type="text" placeholder="Search journal entries..." className="search-input" />
          <button className="search-button">🔍</button>
        </div>
      </section>

      <section className="journal-entries">
        <div className="section-header">
          <h2>Recent Entries</h2>
          <button className="text-button">View All</button>
        </div>
        <div className="entries-list">
          {journalEntries.map(entry => (
            <div key={entry.id} className="journal-entry-card">
              <div className="entry-date">
                {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
              <div className="entry-content">
                <h3>{entry.title}</h3>
                <p>{entry.preview}</p>
                <div className="entry-meta">
                  <div className="entry-mood">
                    Mood: <span>{entry.mood}</span>
                  </div>
                  <div className="entry-tags">
                    {entry.tags.map((tag, index) => (
                      <span key={index} className="tag">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="journal-prompts">
        <h2>Writing Prompts</h2>
        <p>Need inspiration? Try one of these prompts to help express your feelings.</p>
        <div className="prompts-list">
          <div className="prompt-card">
            <h3>What is your favorite memory?</h3>
            <p>Describe a cherished memory in detail, including how it makes you feel now.</p>
            <button className="secondary-button">Write About This</button>
          </div>
          <div className="prompt-card">
            <h3>What are you grateful for today?</h3>
            <p>Reflect on the things, people, or moments that brought you comfort or joy.</p>
            <button className="secondary-button">Write About This</button>
          </div>
          <div className="prompt-card">
            <h3>How are you feeling right now?</h3>
            <p>Express your current emotions without judgment or filtering.</p>
            <button className="secondary-button">Write About This</button>
          </div>
        </div>
      </section>

      <section className="journal-stats">
        <div className="stats-card">
          <h3>Journal Activity</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">12</div>
              <div className="stat-label">Total Entries</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">3</div>
              <div className="stat-label">This Week</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">8</div>
              <div className="stat-label">Mood Tracked</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JournalDashboard;
