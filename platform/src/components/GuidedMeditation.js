import React, { useState, useEffect } from 'react';
import { useSelfCareContext } from '../context/SelfCareContext';
import './GuidedMeditation.css';

/**
 * GuidedMeditation Component
 * 
 * A comprehensive meditation tool offering guided sessions, breathing exercises,
 * and mindfulness practices to support emotional wellbeing during grief.
 */
const GuidedMeditation = () => {
  const { meditationSessions, completeMeditationSession } = useSelfCareContext();
  
  // State management
  const [activeTab, setActiveTab] = useState('guided');
  const [selectedSession, setSelectedSession] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [breathingPhase, setBreathingPhase] = useState('inhale');
  const [breathingCount, setBreathingCount] = useState(0);
  const [breathingDuration, setBreathingDuration] = useState(5); // minutes
  const [breathingSpeed, setBreathingSpeed] = useState('medium');
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [sessionFeedback, setSessionFeedback] = useState('');
  const [sessionRating, setSessionRating] = useState(0);
  
  // Audio reference
  const audioRef = React.useRef(null);
  
  // Filter sessions based on active tab
  const getFilteredSessions = () => {
    if (!meditationSessions) return [];
    
    switch (activeTab) {
      case 'guided':
        return meditationSessions.filter(session => session.type === 'guided');
      case 'breathing':
        return meditationSessions.filter(session => session.type === 'breathing');
      case 'mindfulness':
        return meditationSessions.filter(session => session.type === 'mindfulness');
      case 'favorites':
        return meditationSessions.filter(session => session.isFavorite);
      default:
        return meditationSessions;
    }
  };
  
  // Handle session selection
  const selectSession = (session) => {
    setSelectedSession(session);
    setIsPlaying(false);
    setCurrentTime(0);
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };
  
  // Handle play/pause
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  // Handle audio time update
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  // Handle audio loaded metadata
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  
  // Handle audio ended
  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setShowCompletionModal(true);
  };
  
  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };
  
  // Handle seek
  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };
  
  // Format time (seconds to MM:SS)
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Start breathing exercise
  const startBreathingExercise = () => {
    setBreathingPhase('inhale');
    setBreathingCount(0);
    setIsPlaying(true);
    
    // Calculate breathing cycle duration based on speed
    let inhaleTime, holdTime, exhaleTime;
    
    switch (breathingSpeed) {
      case 'slow':
        inhaleTime = 5000; // 5 seconds
        holdTime = 3000;   // 3 seconds
        exhaleTime = 6000; // 6 seconds
        break;
      case 'fast':
        inhaleTime = 3000; // 3 seconds
        holdTime = 1000;   // 1 second
        exhaleTime = 3000; // 3 seconds
        break;
      default: // medium
        inhaleTime = 4000; // 4 seconds
        holdTime = 2000;   // 2 seconds
        exhaleTime = 4000; // 4 seconds
    }
    
    // Start breathing cycle
    const breathingCycle = () => {
      // Inhale phase
      setBreathingPhase('inhale');
      setTimeout(() => {
        // Hold phase
        setBreathingPhase('hold');
        setTimeout(() => {
          // Exhale phase
          setBreathingPhase('exhale');
          setTimeout(() => {
            // Increment count and check if we should continue
            const newCount = breathingCount + 1;
            setBreathingCount(newCount);
            
            // Calculate total cycles based on duration (minutes)
            const totalCycles = Math.floor((breathingDuration * 60) / ((inhaleTime + holdTime + exhaleTime) / 1000));
            
            if (newCount < totalCycles && isPlaying) {
              breathingCycle();
            } else {
              setIsPlaying(false);
              setShowCompletionModal(true);
            }
          }, exhaleTime);
        }, holdTime);
      }, inhaleTime);
    };
    
    breathingCycle();
  };
  
  // Stop breathing exercise
  const stopBreathingExercise = () => {
    setIsPlaying(false);
  };
  
  // Handle session completion
  const handleSessionComplete = async () => {
    try {
      await completeMeditationSession({
        sessionId: selectedSession?.id,
        duration: currentTime,
        rating: sessionRating,
        feedback: sessionFeedback.trim() || null,
        completedAt: new Date().toISOString()
      });
      
      // Reset state
      setShowCompletionModal(false);
      setSessionRating(0);
      setSessionFeedback('');
    } catch (err) {
      console.error('Failed to save session completion:', err);
    }
  };
  
  // Render session list
  const renderSessionList = () => {
    const filteredSessions = getFilteredSessions();
    
    if (filteredSessions.length === 0) {
      return (
        <div className="empty-sessions">
          <div className="empty-icon"></div>
          <p>No sessions available in this category</p>
        </div>
      );
    }
    
    return (
      <div className="session-list">
        {filteredSessions.map(session => (
          <div 
            key={session.id}
            className={`session-item ${selectedSession?.id === session.id ? 'selected' : ''}`}
            onClick={() => selectSession(session)}
          >
            <div className={`session-icon ${session.type}-icon`}></div>
            <div className="session-info">
              <div className="session-title">{session.title}</div>
              <div className="session-details">
                <span className="session-duration">{session.duration} min</span>
                <span className="session-type">{session.type}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  // Render guided meditation player
  const renderGuidedPlayer = () => {
    if (!selectedSession) return null;
    
    return (
      <div className="meditation-player">
        <div className="player-header">
          <h3>{selectedSession.title}</h3>
          <p className="session-description">{selectedSession.description}</p>
        </div>
        
        <div className="player-visualization">
          <div className={`visualization-graphic ${isPlaying ? 'playing' : ''}`}></div>
        </div>
        
        <div className="player-controls">
          <div className="time-display">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="time-slider"
          />
          
          <div className="control-buttons">
            <button 
              className="control-btn backward-btn"
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.currentTime = Math.max(0, currentTime - 10);
                }
              }}
            >
              <div className="backward-icon"></div>
            </button>
            
            <button 
              className={`control-btn ${isPlaying ? 'pause-btn' : 'play-btn'}`}
              onClick={togglePlayPause}
            >
              <div className={isPlaying ? 'pause-icon' : 'play-icon'}></div>
            </button>
            
            <button 
              className="control-btn forward-btn"
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.currentTime = Math.min(duration, currentTime + 10);
                }
              }}
            >
              <div className="forward-icon"></div>
            </button>
          </div>
          
          <div className="volume-control">
            <div className="volume-icon"></div>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
          </div>
        </div>
        
        <audio
          ref={audioRef}
          src={selectedSession.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleAudioEnded}
        />
      </div>
    );
  };
  
  // Render breathing exercise
  const renderBreathingExercise = () => {
    return (
      <div className="breathing-exercise">
        <div className="breathing-header">
          <h3>Guided Breathing Exercise</h3>
          <p>Follow the animation and breathe along with the rhythm</p>
        </div>
        
        <div className="breathing-settings">
          <div className="setting-group">
            <label>Duration</label>
            <select 
              value={breathingDuration}
              onChange={(e) => setBreathingDuration(parseInt(e.target.value))}
              disabled={isPlaying}
            >
              <option value="2">2 minutes</option>
              <option value="5">5 minutes</option>
              <option value="10">10 minutes</option>
              <option value="15">15 minutes</option>
            </select>
          </div>
          
          <div className="setting-group">
            <label>Speed</label>
            <select 
              value={breathingSpeed}
              onChange={(e) => setBreathingSpeed(e.target.value)}
              disabled={isPlaying}
            >
              <option value="slow">Slow</option>
              <option value="medium">Medium</option>
              <option value="fast">Fast</option>
            </select>
          </div>
        </div>
        
        <div className="breathing-visualization">
          <div className={`breathing-circle ${breathingPhase}`}>
            <div className="breathing-text">
              {breathingPhase === 'inhale' && 'Inhale...'}
              {breathingPhase === 'hold' && 'Hold...'}
              {breathingPhase === 'exhale' && 'Exhale...'}
            </div>
          </div>
        </div>
        
        <div className="breathing-controls">
          {!isPlaying ? (
            <button 
              className="start-breathing-btn"
              onClick={startBreathingExercise}
            >
              Start Breathing Exercise
            </button>
          ) : (
            <button 
              className="stop-breathing-btn"
              onClick={stopBreathingExercise}
            >
              Stop Exercise
            </button>
          )}
        </div>
      </div>
    );
  };
  
  // Render completion modal
  const renderCompletionModal = () => {
    if (!showCompletionModal) return null;
    
    return (
      <div className="modal-overlay">
        <div className="completion-modal">
          <div className="modal-header">
            <h3>Session Complete</h3>
            <button 
              className="close-modal-btn"
              onClick={() => setShowCompletionModal(false)}
            >
              &times;
            </button>
          </div>
          
          <div className="modal-content">
            <div className="completion-message">
              <div className="completion-icon"></div>
              <p>Great job! You've completed your meditation session.</p>
            </div>
            
            <div className="rating-section">
              <h4>How was your experience?</h4>
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    className={`star-btn ${sessionRating >= star ? 'active' : ''}`}
                    onClick={() => setSessionRating(star)}
                  >
                    <div className="star-icon"></div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="feedback-section">
              <h4>Any thoughts you'd like to share? (Optional)</h4>
              <textarea
                placeholder="Share your experience..."
                value={sessionFeedback}
                onChange={(e) => setSessionFeedback(e.target.value)}
                rows={3}
              ></textarea>
            </div>
          </div>
          
          <div className="modal-footer">
            <button 
              className="skip-btn"
              onClick={() => setShowCompletionModal(false)}
            >
              Skip
            </button>
            <button 
              className="save-btn"
              onClick={handleSessionComplete}
            >
              Save & Continue
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="guided-meditation">
      <div className="meditation-header">
        <h2>Guided Meditation</h2>
        <p>Find peace and support through guided meditation practices</p>
      </div>
      
      <div className="meditation-content">
        <div className="meditation-sidebar">
          <div className="meditation-tabs">
            <button 
              className={`tab-btn ${activeTab === 'guided' ? 'active' : ''}`}
              onClick={() => setActiveTab('guided')}
            >
              Guided
            </button>
            <button 
              className={`tab-btn ${activeTab === 'breathing' ? 'active' : ''}`}
              onClick={() => setActiveTab('breathing')}
            >
              Breathing
            </button>
            <button 
              className={`tab-btn ${activeTab === 'mindfulness' ? 'active' : ''}`}
              onClick={() => setActiveTab('mindfulness')}
            >
              Mindfulness
            </button>
            <button 
              className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
              onClick={() => setActiveTab('favorites')}
            >
              Favorites
            </button>
          </div>
          
          {activeTab !== 'breathing' && renderSessionList()}
        </div>
        
        <div className="meditation-main">
          {activeTab === 'breathing' ? (
            renderBreathingExercise()
          ) : (
            renderGuidedPlayer()
          )}
        </div>
      </div>
      
      {renderCompletionModal()}
    </div>
  );
};

export default GuidedMeditation;
