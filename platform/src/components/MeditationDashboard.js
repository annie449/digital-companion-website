import React from 'react';
import './MeditationDashboard.css';

/**
 * Meditation Dashboard Component
 * 
 * This component displays meditation content, tracks progress,
 * and provides access to guided meditation sessions.
 */
const MeditationDashboard = () => {
  // Sample meditation data - in a real app, this would come from a context or API
  const featuredMeditations = [
    {
      id: 1,
      title: 'Finding Peace in Grief',
      description: 'A gentle meditation to help process feelings of loss and find moments of peace.',
      duration: 15,
      category: 'Grief & Loss',
      image: 'https://via.placeholder.com/300x200?text=Meditation',
      instructor: 'Sarah Johnson'
    },
    {
      id: 2,
      title: 'Calming Anxiety',
      description: 'Techniques to help calm anxious thoughts and find your center during difficult times.',
      duration: 10,
      category: 'Anxiety Relief',
      image: 'https://via.placeholder.com/300x200?text=Meditation',
      instructor: 'Michael Chen'
    },
    {
      id: 3,
      title: 'Restful Sleep',
      description: 'A soothing meditation to help you find rest when grief affects your sleep.',
      duration: 20,
      category: 'Sleep',
      image: 'https://via.placeholder.com/300x200?text=Meditation',
      instructor: 'Emma Wilson'
    }
  ];

  const recentlyPlayed = [
    {
      id: 4,
      title: 'Mindful Breathing',
      duration: 5,
      lastPlayed: '2 days ago',
      progress: 100
    },
    {
      id: 5,
      title: 'Releasing Emotions',
      duration: 12,
      lastPlayed: '1 week ago',
      progress: 75
    }
  ];

  const collections = [
    { id: 1, name: 'Grief & Loss', count: 8 },
    { id: 2, name: 'Sleep & Rest', count: 6 },
    { id: 3, name: 'Anxiety Relief', count: 5 },
    { id: 4, name: 'Mindfulness', count: 10 }
  ];

  return (
    <div className="meditation-dashboard">
      <header className="dashboard-header">
        <h1>Meditation</h1>
        <p>Find moments of peace and mindfulness during your grief journey.</p>
      </header>

      <section className="meditation-stats">
        <div className="stats-card">
          <h3>Your Meditation Journey</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">12</div>
              <div className="stat-label">Sessions</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">3.5</div>
              <div className="stat-label">Hours</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">8</div>
              <div className="stat-label">Days Streak</div>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-meditations">
        <h2>Recommended for You</h2>
        <div className="meditations-grid">
          {featuredMeditations.map(meditation => (
            <div key={meditation.id} className="meditation-card">
              <div className="meditation-image">
                <img src={meditation.image} alt={meditation.title} />
                <div className="meditation-duration">{meditation.duration} min</div>
              </div>
              <div className="meditation-content">
                <div className="meditation-category">{meditation.category}</div>
                <h3>{meditation.title}</h3>
                <p>{meditation.description}</p>
                <div className="meditation-instructor">
                  With {meditation.instructor}
                </div>
              </div>
              <div className="meditation-actions">
                <button className="primary-button">Play</button>
                <button className="icon-button">♡</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="dashboard-columns">
        <section className="recently-played">
          <h2>Recently Played</h2>
          <div className="recently-played-list">
            {recentlyPlayed.map(item => (
              <div key={item.id} className="recently-played-item">
                <div className="play-button">▶</div>
                <div className="item-details">
                  <h3>{item.title}</h3>
                  <div className="item-meta">
                    <span>{item.duration} min</span>
                    <span>•</span>
                    <span>{item.lastPlayed}</span>
                  </div>
                  {item.progress < 100 && (
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${item.progress}%` }}></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="collections">
          <h2>Collections</h2>
          <div className="collections-list">
            {collections.map(collection => (
              <div key={collection.id} className="collection-item">
                <h3>{collection.name}</h3>
                <span>{collection.count} meditations</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="daily-meditation">
        <div className="daily-meditation-card">
          <div className="daily-meditation-content">
            <h2>Daily Meditation</h2>
            <h3>Gentle Acceptance</h3>
            <p>A 5-minute practice to cultivate acceptance and peace in your day.</p>
            <button className="primary-button">Start Now</button>
          </div>
          <div className="daily-meditation-image">
            <img src="https://via.placeholder.com/300x200?text=Daily+Meditation" alt="Daily Meditation" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default MeditationDashboard;
