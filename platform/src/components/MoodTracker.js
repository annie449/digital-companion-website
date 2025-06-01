import React, { useState, useContext } from 'react';
import { SelfCareContext } from '../context/SelfCareContext';
import './MoodTracker.css';

function MoodTracker() {
  const { addMoodEntry, currentMood } = useContext(SelfCareContext);
  const [selectedMood, setSelectedMood] = useState('');
  const [intensity, setIntensity] = useState(5);
  const [notes, setNotes] = useState('');
  const [triggers, setTriggers] = useState('');
  const [showForm, setShowForm] = useState(false);
  
  const moodOptions = [
    { value: 'calm', label: 'Calm', emoji: '😌' },
    { value: 'happy', label: 'Happy', emoji: '😊' },
    { value: 'sad', label: 'Sad', emoji: '😢' },
    { value: 'anxious', label: 'Anxious', emoji: '😰' },
    { value: 'angry', label: 'Angry', emoji: '😠' },
    { value: 'overwhelmed', label: 'Overwhelmed', emoji: '😩' },
    { value: 'hopeful', label: 'Hopeful', emoji: '🙂' },
    { value: 'numb', label: 'Numb', emoji: '😐' }
  ];
  
  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setShowForm(true);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const triggerArray = triggers
      .split(',')
      .map(trigger => trigger.trim())
      .filter(trigger => trigger.length > 0);
    
    addMoodEntry({
      mood: selectedMood,
      intensity,
      notes,
      triggers: triggerArray,
      associatedTasks: [],
      associatedAssets: []
    });
    
    // Reset form
    setSelectedMood('');
    setIntensity(5);
    setNotes('');
    setTriggers('');
    setShowForm(false);
  };
  
  return (
    <div className="mood-tracker">
      {currentMood && !showForm ? (
        <div className="current-mood">
          <div className="mood-timestamp">
            Last updated: {new Date(currentMood.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </div>
          <div className="mood-display">
            <span className="mood-emoji">
              {moodOptions.find(m => m.value === currentMood.mood)?.emoji || '😐'}
            </span>
            <span className="mood-label">
              {moodOptions.find(m => m.value === currentMood.mood)?.label || currentMood.mood}
            </span>
            <div className="mood-intensity">
              Intensity: {currentMood.intensity}/10
            </div>
          </div>
          <button 
            className="update-mood-btn"
            onClick={() => setShowForm(true)}
          >
            Update Mood
          </button>
        </div>
      ) : !showForm ? (
        <div className="mood-selection">
          <p>Select how you're feeling right now:</p>
          <div className="mood-options">
            {moodOptions.map(mood => (
              <button
                key={mood.value}
                className="mood-option-btn"
                onClick={() => handleMoodSelect(mood.value)}
              >
                <span className="mood-emoji">{mood.emoji}</span>
                <span className="mood-label">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <form className="mood-form" onSubmit={handleSubmit}>
          <div className="selected-mood">
            <span className="mood-emoji">
              {moodOptions.find(m => m.value === selectedMood)?.emoji || '😐'}
            </span>
            <span className="mood-label">
              {moodOptions.find(m => m.value === selectedMood)?.label || selectedMood}
            </span>
          </div>
          
          <div className="form-group">
            <label htmlFor="intensity">Intensity (1-10):</label>
            <input
              type="range"
              id="intensity"
              min="1"
              max="10"
              value={intensity}
              onChange={(e) => setIntensity(parseInt(e.target.value))}
            />
            <span className="intensity-value">{intensity}</span>
          </div>
          
          <div className="form-group">
            <label htmlFor="notes">Notes (optional):</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How are you feeling? What's on your mind?"
              rows="3"
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="triggers">Triggers (optional, comma-separated):</label>
            <input
              type="text"
              id="triggers"
              value={triggers}
              onChange={(e) => setTriggers(e.target.value)}
              placeholder="e.g., paperwork, memories, upcoming meeting"
            />
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save Mood
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default MoodTracker;
