import React, { useContext, useState } from 'react';
import { AIAssistantContext } from '../context/AIAssistantContext';
import './AssistantSettings.css';

function AssistantSettings() {
  const { preferences, updatePreferences } = useContext(AIAssistantContext);
  
  const [formValues, setFormValues] = useState({
    proactiveAssistance: preferences.proactiveAssistance,
    voiceEnabled: preferences.voiceEnabled,
    notificationsEnabled: preferences.notificationsEnabled,
    suggestionFrequency: preferences.suggestionFrequency
  });
  
  const handleToggleChange = (e) => {
    const { name, checked } = e.target;
    
    setFormValues({
      ...formValues,
      [name]: checked
    });
    
    updatePreferences({
      [name]: checked
    });
  };
  
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    
    setFormValues({
      ...formValues,
      [name]: value
    });
    
    updatePreferences({
      [name]: value
    });
  };
  
  return (
    <div className="assistant-settings">
      <h2>AI Assistant Settings</h2>
      
      <div className="settings-section">
        <h3>Assistance Preferences</h3>
        
        <div className="setting-item">
          <div className="setting-info">
            <label htmlFor="proactiveAssistance">Proactive Assistance</label>
            <p className="setting-description">
              Allow the assistant to provide suggestions and insights based on your activities
            </p>
          </div>
          <div className="setting-control">
            <label className="toggle-switch">
              <input
                type="checkbox"
                id="proactiveAssistance"
                name="proactiveAssistance"
                checked={formValues.proactiveAssistance}
                onChange={handleToggleChange}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
        
        <div className="setting-item">
          <div className="setting-info">
            <label htmlFor="voiceEnabled">Voice Interaction</label>
            <p className="setting-description">
              Enable voice commands and responses for the assistant
            </p>
          </div>
          <div className="setting-control">
            <label className="toggle-switch">
              <input
                type="checkbox"
                id="voiceEnabled"
                name="voiceEnabled"
                checked={formValues.voiceEnabled}
                onChange={handleToggleChange}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
        
        <div className="setting-item">
          <div className="setting-info">
            <label htmlFor="notificationsEnabled">Assistant Notifications</label>
            <p className="setting-description">
              Receive notifications for important suggestions and reminders
            </p>
          </div>
          <div className="setting-control">
            <label className="toggle-switch">
              <input
                type="checkbox"
                id="notificationsEnabled"
                name="notificationsEnabled"
                checked={formValues.notificationsEnabled}
                onChange={handleToggleChange}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
        
        <div className="setting-item">
          <div className="setting-info">
            <label htmlFor="suggestionFrequency">Suggestion Frequency</label>
            <p className="setting-description">
              How often the assistant should provide suggestions
            </p>
          </div>
          <div className="setting-control">
            <select
              id="suggestionFrequency"
              name="suggestionFrequency"
              value={formValues.suggestionFrequency}
              onChange={handleSelectChange}
            >
              <option value="low">Low - Minimal suggestions</option>
              <option value="medium">Medium - Balanced approach</option>
              <option value="high">High - Frequent suggestions</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="settings-section">
        <h3>Privacy & Data</h3>
        
        <div className="privacy-info">
          <p>
            Your Digital Companion assistant uses your data to provide personalized assistance.
            All data is processed locally on your device and is not shared with third parties.
          </p>
          <p>
            You can reset the assistant's learning at any time to remove personalized patterns
            it has learned from your usage.
          </p>
        </div>
        
        <button className="reset-learning-btn">
          Reset Assistant Learning
        </button>
      </div>
    </div>
  );
}

export default AssistantSettings;
