import React, { useContext } from 'react';
import { SelfCareContext } from '../context/SelfCareContext';
import './MeditationPreview.css';

function MeditationPreview({ meditations }) {
  const { completeMeditationSession, toggleFavoriteMeditation, navigateTo } = useContext(SelfCareContext);
  
  const handleMeditationClick = (meditationId) => {
    navigateTo(`wellbeing/meditations/${meditationId}`);
  };
  
  const handleFavoriteToggle = (e, meditationId) => {
    e.stopPropagation(); // Prevent triggering the parent click
    toggleFavoriteMeditation(meditationId);
  };
  
  return (
    <div className="meditation-preview">
      {meditations.length > 0 ? (
        <ul className="meditation-list">
          {meditations.map(meditation => (
            <li 
              key={meditation.id} 
              className="meditation-item"
              onClick={() => handleMeditationClick(meditation.id)}
            >
              <div 
                className="meditation-image" 
                style={{ backgroundImage: `url(${meditation.imageUrl})` }}
              >
                <div className="meditation-duration">{meditation.duration} min</div>
                <button 
                  className={`favorite-btn ${meditation.favorited ? 'favorited' : ''}`}
                  onClick={(e) => handleFavoriteToggle(e, meditation.id)}
                >
                  {meditation.favorited ? '★' : '☆'}
                </button>
              </div>
              <div className="meditation-details">
                <h4 className="meditation-title">{meditation.title}</h4>
                <div className="meditation-meta">
                  <span className="meditation-category">{meditation.category}</span>
                  <span className="meditation-sessions">
                    {meditation.completedSessions.length} session{meditation.completedSessions.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-meditations-message">No meditations available</p>
      )}
    </div>
  );
}

export default MeditationPreview;
