import React, { useContext } from 'react';
import { SelfCareContext } from '../context/SelfCareContext';
import './SuggestedActivities.css';

function SuggestedActivities({ activities }) {
  const { completeActivity, scheduleActivity } = useContext(SelfCareContext);
  
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'physical': return '🚶';
      case 'emotional': return '❤️';
      case 'social': return '👥';
      case 'spiritual': return '✨';
      default: return '📋';
    }
  };
  
  const handleCompleteNow = (activityId) => {
    completeActivity(activityId, {
      notes: '',
      moodBefore: '',
      moodAfter: ''
    });
  };
  
  const handleScheduleForLater = (activityId) => {
    // Schedule for tomorrow by default
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0); // 10:00 AM
    
    scheduleActivity(activityId, tomorrow);
  };
  
  return (
    <div className="suggested-activities">
      {activities.length > 0 ? (
        <ul className="activities-list">
          {activities.map(activity => (
            <li key={activity.id} className="activity-item">
              <div className="activity-icon">{getCategoryIcon(activity.category)}</div>
              <div className="activity-details">
                <h4 className="activity-title">{activity.title}</h4>
                <p className="activity-description">{activity.description}</p>
                <div className="activity-meta">
                  <span className="activity-category">{activity.category}</span>
                  <span className="activity-duration">{activity.duration} min</span>
                </div>
              </div>
              <div className="activity-actions">
                <button 
                  className="complete-now-btn"
                  onClick={() => handleCompleteNow(activity.id)}
                >
                  Do Now
                </button>
                <button 
                  className="schedule-btn"
                  onClick={() => handleScheduleForLater(activity.id)}
                >
                  Schedule
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-activities-message">No activities suggested at the moment</p>
      )}
    </div>
  );
}

export default SuggestedActivities;
