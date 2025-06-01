import React, { useState, useContext, useEffect } from 'react';
import { MeditationContext } from '../context/MeditationContext';
import { SelfCareContext } from '../context/SelfCareContext';
import MeditationPlayer from './MeditationPlayer';
import MeditationLibrary from './MeditationLibrary';
import './MeditationDashboard.css';

/**
 * MeditationDashboard Component
 * 
 * Main dashboard for the meditation feature that integrates the player,
 * library, and user statistics in a cohesive interface.
 */
const MeditationDashboard = () => {
  // State
  const [selectedMeditation, setSelectedMeditation] = useState(null);
  const [showLibrary, setShowLibrary] = useState(true);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  
  // Context
  const { 
    getRecommendedMeditations, 
    getMeditationStats,
    getMeditationHistory,
    isLoading 
  } = useContext(MeditationContext);
  
  const { userState } = useContext(SelfCareContext);
  
  // Get recommended meditations and stats
  const [recommendedMeditations, setRecommendedMeditations] = useState([]);
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalMinutes: 0,
    sessionsThisWeek: 0,
    minutesThisWeek: 0
  });
  const [recentHistory, setRecentHistory] = useState([]);
  
  // Load data when component mounts
  useEffect(() => {
    if (!isLoading) {
      const recommended = getRecommendedMeditations(userState);
      setRecommendedMeditations(recommended.slice(0, 3));
      
      const meditationStats = getMeditationStats();
      setStats(meditationStats);
      
      const history = getMeditationHistory();
      setRecentHistory(history.slice(0, 5));
    }
  }, [isLoading, getRecommendedMeditations, getMeditationStats, getMeditationHistory, userState]);
  
  // Handle meditation selection
  const handleSelectMeditation = (meditation) => {
    setSelectedMeditation(meditation);
    setShowLibrary(false);
    setSessionCompleted(false);
  };
  
  // Handle session completion
  const handleSessionComplete = () => {
    setSessionCompleted(true);
    
    // Refresh stats and history
    const meditationStats = getMeditationStats();
    setStats(meditationStats);
    
    const history = getMeditationHistory();
    setRecentHistory(history.slice(0, 5));
  };
  
  // Return to library
  const handleReturnToLibrary = () => {
    setShowLibrary(true);
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  return (
    <div className="meditation-dashboard">
      <div className="dashboard-header">
        <h1>Guided Meditation</h1>
        <p className="dashboard-description">
          Find peace and support through guided meditations designed for your grief journey.
        </p>
      </div>
      
      {showLibrary ? (
        <div className="dashboard-content">
          {/* Stats Section */}
          <div className="meditation-stats-section">
            <h2>Your Meditation Journey</h2>
            <div className="stats-container">
              <div className="stat-card">
                <span className="stat-value">{stats.totalSessions}</span>
                <span className="stat-label">Total Sessions</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{stats.totalMinutes}</span>
                <span className="stat-label">Total Minutes</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{stats.sessionsThisWeek}</span>
                <span className="stat-label">Sessions This Week</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{stats.minutesThisWeek}</span>
                <span className="stat-label">Minutes This Week</span>
              </div>
            </div>
          </div>
          
          {/* Recommended Section */}
          {recommendedMeditations.length > 0 && (
            <div className="recommended-section">
              <h2>Recommended For You</h2>
              <div className="recommended-container">
                {recommendedMeditations.map(meditation => (
                  <div 
                    key={meditation.id}
                    className="recommended-item"
                    onClick={() => handleSelectMeditation(meditation)}
                  >
                    <img 
                      src={meditation.content.image_url || '/assets/default-meditation.jpg'} 
                      alt={meditation.title}
                      className="recommended-thumbnail"
                    />
                    <div className="recommended-details">
                      <h3>{meditation.title}</h3>
                      <p className="recommended-creator">By {meditation.creator.name}</p>
                      <p className="recommended-duration">
                        {Math.floor(meditation.duration / 60)} min
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Recent History */}
          {recentHistory.length > 0 && (
            <div className="history-section">
              <h2>Recent Sessions</h2>
              <div className="history-container">
                {recentHistory.map(session => (
                  <div 
                    key={session.id}
                    className="history-item"
                    onClick={() => session.meditation && handleSelectMeditation(session.meditation)}
                  >
                    <div className="history-date">
                      {formatDate(session.timestamp)}
                    </div>
                    <div className="history-details">
                      <h3>{session.meditation ? session.meditation.title : 'Unknown Meditation'}</h3>
                      <p className="history-duration">
                        {Math.floor(session.duration / 60)} min
                      </p>
                    </div>
                    {session.completed && (
                      <div className="completion-badge">
                        ✓
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Full Library */}
          <div className="library-section">
            <MeditationLibrary onSelectMeditation={handleSelectMeditation} />
          </div>
        </div>
      ) : (
        <div className="player-view">
          {/* Back button */}
          <button 
            className="back-button"
            onClick={handleReturnToLibrary}
            aria-label="Return to library"
          >
            ← Back to Library
          </button>
          
          {/* Player */}
          <div className="player-container">
            <MeditationPlayer 
              meditation={selectedMeditation}
              onComplete={handleSessionComplete}
            />
          </div>
          
          {/* Post-session message */}
          {sessionCompleted && (
            <div className="session-completed">
              <h2>Session Completed</h2>
              <p>Great job taking time for yourself. How are you feeling now?</p>
              <div className="post-session-actions">
                <button onClick={handleReturnToLibrary}>
                  Return to Library
                </button>
                <button onClick={() => setSessionCompleted(false)}>
                  Replay Meditation
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MeditationDashboard;
