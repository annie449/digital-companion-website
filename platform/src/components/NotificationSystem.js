import React, { useState, useEffect } from 'react';
import { useDigitalCompanionContext } from '../context/DigitalCompanionContext';
import './NotificationSystem.css';

/**
 * NotificationSystem Component
 * 
 * A comprehensive notification system that provides customizable alerts
 * for task deadlines, important dates, and system updates.
 */
const NotificationSystem = () => {
  const { user, notifications, markNotificationAsRead, updateNotificationPreferences } = useDigitalCompanionContext();
  
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState('all');
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    taskReminders: true,
    progressUpdates: true,
    importantDates: true,
    systemUpdates: true,
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
    quietHoursEnabled: false,
    quietHoursStart: '22:00',
    quietHoursEnd: '08:00'
  });
  
  // Calculate unread notifications count
  useEffect(() => {
    if (notifications) {
      const count = notifications.filter(notification => !notification.read).length;
      setUnreadCount(count);
    }
  }, [notifications]);
  
  // Toggle notification panel
  const toggleNotifications = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowPreferences(false);
    }
  };
  
  // Handle notification click
  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markNotificationAsRead(notification.id);
    }
    
    // Handle navigation or action based on notification type
    if (notification.action) {
      // In a real implementation, this would navigate or perform an action
      console.log(`Performing action: ${notification.action}`);
    }
  };
  
  // Toggle notification preferences panel
  const togglePreferences = () => {
    setShowPreferences(!showPreferences);
  };
  
  // Update a single preference
  const updatePreference = (key, value) => {
    setPreferences({
      ...preferences,
      [key]: value
    });
  };
  
  // Save notification preferences
  const savePreferences = () => {
    updateNotificationPreferences(preferences);
    setShowPreferences(false);
  };
  
  // Filter notifications based on active tab
  const getFilteredNotifications = () => {
    if (!notifications) return [];
    
    switch (activeTab) {
      case 'tasks':
        return notifications.filter(notification => 
          notification.category === 'task' || notification.category === 'deadline');
      case 'updates':
        return notifications.filter(notification => 
          notification.category === 'system' || notification.category === 'feature');
      case 'reminders':
        return notifications.filter(notification => 
          notification.category === 'reminder' || notification.category === 'date');
      case 'unread':
        return notifications.filter(notification => !notification.read);
      default:
        return notifications;
    }
  };
  
  // Format notification time
  const formatNotificationTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 1) {
      return 'Just now';
    } else if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
  
  // Render notification icon based on category
  const renderNotificationIcon = (category) => {
    return (
      <div className={`notification-icon ${category}-icon`}></div>
    );
  };
  
  // Render notification preferences panel
  const renderPreferencesPanel = () => {
    return (
      <div className="notification-preferences">
        <h3>Notification Preferences</h3>
        
        <div className="preference-section">
          <h4>Notification Types</h4>
          
          <label className="preference-option">
            <input
              type="checkbox"
              checked={preferences.taskReminders}
              onChange={(e) => updatePreference('taskReminders', e.target.checked)}
            />
            <span>Task Reminders</span>
          </label>
          
          <label className="preference-option">
            <input
              type="checkbox"
              checked={preferences.progressUpdates}
              onChange={(e) => updatePreference('progressUpdates', e.target.checked)}
            />
            <span>Progress Updates</span>
          </label>
          
          <label className="preference-option">
            <input
              type="checkbox"
              checked={preferences.importantDates}
              onChange={(e) => updatePreference('importantDates', e.target.checked)}
            />
            <span>Important Dates</span>
          </label>
          
          <label className="preference-option">
            <input
              type="checkbox"
              checked={preferences.systemUpdates}
              onChange={(e) => updatePreference('systemUpdates', e.target.checked)}
            />
            <span>System Updates</span>
          </label>
        </div>
        
        <div className="preference-section">
          <h4>Delivery Methods</h4>
          
          <label className="preference-option">
            <input
              type="checkbox"
              checked={preferences.emailNotifications}
              onChange={(e) => updatePreference('emailNotifications', e.target.checked)}
            />
            <span>Email Notifications</span>
          </label>
          
          <label className="preference-option">
            <input
              type="checkbox"
              checked={preferences.pushNotifications}
              onChange={(e) => updatePreference('pushNotifications', e.target.checked)}
            />
            <span>Push Notifications</span>
          </label>
          
          <label className="preference-option">
            <input
              type="checkbox"
              checked={preferences.smsNotifications}
              onChange={(e) => updatePreference('smsNotifications', e.target.checked)}
            />
            <span>SMS Notifications</span>
          </label>
        </div>
        
        <div className="preference-section">
          <h4>Quiet Hours</h4>
          
          <label className="preference-option">
            <input
              type="checkbox"
              checked={preferences.quietHoursEnabled}
              onChange={(e) => updatePreference('quietHoursEnabled', e.target.checked)}
            />
            <span>Enable Quiet Hours</span>
          </label>
          
          {preferences.quietHoursEnabled && (
            <div className="quiet-hours-settings">
              <div className="time-setting">
                <label>From</label>
                <input
                  type="time"
                  value={preferences.quietHoursStart}
                  onChange={(e) => updatePreference('quietHoursStart', e.target.value)}
                />
              </div>
              
              <div className="time-setting">
                <label>To</label>
                <input
                  type="time"
                  value={preferences.quietHoursEnd}
                  onChange={(e) => updatePreference('quietHoursEnd', e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="preference-actions">
          <button 
            className="cancel-btn"
            onClick={togglePreferences}
          >
            Cancel
          </button>
          <button 
            className="save-btn"
            onClick={savePreferences}
          >
            Save Preferences
          </button>
        </div>
      </div>
    );
  };
  
  // Render notification list
  const renderNotifications = () => {
    const filteredNotifications = getFilteredNotifications();
    
    if (filteredNotifications.length === 0) {
      return (
        <div className="empty-notifications">
          <div className="empty-icon"></div>
          <p>No notifications to display</p>
        </div>
      );
    }
    
    return (
      <div className="notification-list">
        {filteredNotifications.map(notification => (
          <div 
            key={notification.id}
            className={`notification-item ${!notification.read ? 'unread' : ''}`}
            onClick={() => handleNotificationClick(notification)}
          >
            {renderNotificationIcon(notification.category)}
            
            <div className="notification-content">
              <div className="notification-header">
                <span className="notification-title">{notification.title}</span>
                <span className="notification-time">{formatNotificationTime(notification.timestamp)}</span>
              </div>
              <p className="notification-message">{notification.message}</p>
              
              {notification.action && (
                <button className="notification-action-btn">
                  {notification.actionText || 'View'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="notification-system">
      <button 
        className="notification-toggle"
        onClick={toggleNotifications}
        aria-label="Notifications"
      >
        <div className="notification-bell"></div>
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>
      
      {isOpen && (
        <div className="notification-panel">
          <div className="notification-header">
            <h2>Notifications</h2>
            <div className="header-actions">
              <button 
                className="preferences-btn"
                onClick={togglePreferences}
                aria-label="Notification preferences"
              >
                <div className="settings-icon"></div>
              </button>
              <button 
                className="close-btn"
                onClick={toggleNotifications}
                aria-label="Close notifications"
              >
                &times;
              </button>
            </div>
          </div>
          
          {showPreferences ? (
            renderPreferencesPanel()
          ) : (
            <>
              <div className="notification-tabs">
                <button 
                  className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveTab('all')}
                >
                  All
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'unread' ? 'active' : ''}`}
                  onClick={() => setActiveTab('unread')}
                >
                  Unread
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'tasks' ? 'active' : ''}`}
                  onClick={() => setActiveTab('tasks')}
                >
                  Tasks
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'reminders' ? 'active' : ''}`}
                  onClick={() => setActiveTab('reminders')}
                >
                  Reminders
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'updates' ? 'active' : ''}`}
                  onClick={() => setActiveTab('updates')}
                >
                  Updates
                </button>
              </div>
              
              {renderNotifications()}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationSystem;
