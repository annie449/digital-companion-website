import React, { useState, useRef, useEffect } from 'react';
import { useContext } from 'react';
import { SelfCareContext } from '../context/SelfCareContext';
import './MeditationPlayer.css';

/**
 * MeditationPlayer Component
 * 
 * A comprehensive audio player for guided meditations with attribution,
 * background play capability, and offline support.
 */
const MeditationPlayer = ({ meditation, onComplete }) => {
  // State management
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showAttribution, setShowAttribution] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Context for global state
  const { addToFavorites, removeFromFavorite, downloadMeditation, 
          checkIfDownloaded, checkIfFavorite, logMeditationSession } = useContext(SelfCareContext);
  
  // Refs
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  
  // Check if meditation is downloaded or favorited on component mount
  useEffect(() => {
    if (meditation) {
      setIsDownloaded(checkIfDownloaded(meditation.id));
      setIsFavorite(checkIfFavorite(meditation.id));
    }
  }, [meditation, checkIfDownloaded, checkIfFavorite]);
  
  // Set up audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    
    if (!audio || !meditation) return;
    
    // Load the audio source
    audio.src = meditation.content.audio_url;
    
    // Event listeners
    const setAudioData = () => {
      setDuration(audio.duration);
    };
    
    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };
    
    const handleAudioEnd = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (onComplete) onComplete();
      
      // Log completed session
      logMeditationSession({
        meditationId: meditation.id,
        duration: audio.duration,
        completedAt: new Date().toISOString(),
        completed: true
      });
    };
    
    // Add event listeners
    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', handleAudioEnd);
    
    // Cleanup
    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', handleAudioEnd);
    };
  }, [meditation, onComplete, logMeditationSession]);
  
  // Handle play/pause
  const togglePlay = () => {
    const audio = audioRef.current;
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play()
        .catch(error => {
          console.error('Error playing audio:', error);
        });
    }
    
    setIsPlaying(!isPlaying);
  };
  
  // Handle rewind 15 seconds
  const handleRewind = () => {
    const audio = audioRef.current;
    audio.currentTime = Math.max(0, audio.currentTime - 15);
  };
  
  // Handle forward 15 seconds
  const handleForward = () => {
    const audio = audioRef.current;
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 15);
  };
  
  // Handle volume change
  const handleVolumeChange = (e) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    audioRef.current.volume = value;
  };
  
  // Handle playback rate change
  const handlePlaybackRateChange = (rate) => {
    setPlaybackRate(rate);
    audioRef.current.playbackRate = rate;
  };
  
  // Handle progress bar click
  const handleProgressBarClick = (e) => {
    const progressBar = progressBarRef.current;
    const percent = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth;
    const audio = audioRef.current;
    audio.currentTime = percent * audio.duration;
  };
  
  // Handle favorite toggle
  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorite(meditation.id);
    } else {
      addToFavorites(meditation.id);
    }
    setIsFavorite(!isFavorite);
  };
  
  // Handle download
  const handleDownload = () => {
    downloadMeditation(meditation.id)
      .then(() => {
        setIsDownloaded(true);
      })
      .catch(error => {
        console.error('Error downloading meditation:', error);
      });
  };
  
  // Format time (seconds to MM:SS)
  const formatTime = (time) => {
    if (isNaN(time)) return '00:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // If no meditation is provided, return null
  if (!meditation) return null;
  
  return (
    <div className="meditation-player">
      {/* Hidden audio element */}
      <audio ref={audioRef} preload="metadata" />
      
      {/* Meditation image and title */}
      <div className="meditation-header">
        <img 
          src={meditation.content.image_url || '/assets/default-meditation.jpg'} 
          alt={meditation.title}
          className="meditation-image"
        />
        <div className="meditation-info">
          <h2>{meditation.title}</h2>
          <div className="creator-info">
            <span>By {meditation.creator.name}</span>
            <button 
              className="attribution-button"
              onClick={() => setShowAttribution(!showAttribution)}
              aria-label="Show attribution information"
            >
              ℹ️
            </button>
          </div>
        </div>
      </div>
      
      {/* Attribution panel (collapsible) */}
      {showAttribution && (
        <div className="attribution-panel">
          <div className="attribution-content">
            <h3>Content Attribution</h3>
            <p>{meditation.attribution.text}</p>
            <div className="source-info">
              <span>Source: {meditation.source.type}</span>
              {meditation.source.url && (
                <a 
                  href={meditation.source.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  View Original
                </a>
              )}
              {meditation.source.license && (
                <span>License: {meditation.source.license}</span>
              )}
            </div>
          </div>
          <button 
            className="close-attribution"
            onClick={() => setShowAttribution(false)}
            aria-label="Close attribution panel"
          >
            ×
          </button>
        </div>
      )}
      
      {/* Progress bar */}
      <div 
        className="progress-container" 
        ref={progressBarRef}
        onClick={handleProgressBarClick}
      >
        <div 
          className="progress-bar"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        ></div>
        <div className="time-display">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      
      {/* Playback controls */}
      <div className="controls">
        <button 
          className="control-button rewind"
          onClick={handleRewind}
          aria-label="Rewind 15 seconds"
        >
          -15s
        </button>
        
        <button 
          className="control-button play-pause"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? '❚❚' : '▶'}
        </button>
        
        <button 
          className="control-button forward"
          onClick={handleForward}
          aria-label="Forward 15 seconds"
        >
          +15s
        </button>
      </div>
      
      {/* Additional controls */}
      <div className="additional-controls">
        {/* Volume control */}
        <div className="volume-control">
          <span className="volume-icon">🔊</span>
          <input 
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            aria-label="Volume"
          />
        </div>
        
        {/* Playback rate */}
        <div className="playback-rate">
          <span>Speed:</span>
          <div className="rate-buttons">
            <button 
              className={playbackRate === 0.8 ? 'active' : ''}
              onClick={() => handlePlaybackRateChange(0.8)}
            >
              0.8x
            </button>
            <button 
              className={playbackRate === 1 ? 'active' : ''}
              onClick={() => handlePlaybackRateChange(1)}
            >
              1x
            </button>
            <button 
              className={playbackRate === 1.2 ? 'active' : ''}
              onClick={() => handlePlaybackRateChange(1.2)}
            >
              1.2x
            </button>
          </div>
        </div>
        
        {/* Favorite button */}
        <button 
          className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
          onClick={handleFavoriteToggle}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? '★' : '☆'}
        </button>
        
        {/* Download button */}
        {!isDownloaded ? (
          <button 
            className="download-button"
            onClick={handleDownload}
            aria-label="Download for offline use"
          >
            ↓
          </button>
        ) : (
          <span className="downloaded-indicator" aria-label="Available offline">
            ✓
          </span>
        )}
      </div>
      
      {/* Transcript toggle (if available) */}
      {meditation.content.transcript && (
        <div className="transcript-section">
          <button 
            className="transcript-toggle"
            onClick={() => window.open(meditation.content.transcript, '_blank')}
            aria-label="View meditation transcript"
          >
            View Transcript
          </button>
        </div>
      )}
    </div>
  );
};

export default MeditationPlayer;
