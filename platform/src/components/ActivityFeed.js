import React, { useContext } from 'react';
import { DigitalCompanionContext } from '../context/DigitalCompanionContext';
import './ActivityFeed.css';

function ActivityFeed({ activities }) {
  // Format timestamp to relative time (e.g., "2 hours ago")
  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };
  
  // Get icon based on activity type
  const getActivityIcon = (activity) => {
    switch(activity.type) {
      case 'task':
        return activity.action === 'completed' ? '✅' : 
               activity.action === 'added' ? '➕' : '🔄';
      case 'estate':
        return '💼';
      case 'link':
        return '🔗';
      case 'report':
        return '📊';
      default:
        return '📝';
    }
  };
  
  return (
    <div className="activity-feed">
      {activities.length > 0 ? (
        <ul className="activity-list">
          {activities.map(activity => (
            <li key={activity.id} className="activity-item">
              <div className="activity-icon">{getActivityIcon(activity)}</div>
              <div className="activity-content">
                <div className="activity-message">
                  <strong>{activity.action}</strong> {activity.item}
                </div>
                <div className="activity-time">
                  {getRelativeTime(activity.timestamp)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-activity-message">No recent activity</p>
      )}
    </div>
  );
}

export default ActivityFeed;
