import React, { useContext } from 'react';
import { DigitalCompanionContext } from '../context/DigitalCompanionContext';
import { SelfCareContext } from '../context/SelfCareContext';
import './WellbeingDashboard.css';

// Import sub-components (to be created)
import MoodTracker from './MoodTracker';
import SuggestedActivities from './SuggestedActivities';
import JournalPreview from './JournalPreview';
import MeditationPreview from './MeditationPreview';
import WellbeingMetrics from './WellbeingMetrics';

function WellbeingDashboard() {
  const { navigateTo } = useContext(DigitalCompanionContext);
  const { 
    currentMood, 
    wellbeingScores, 
    journalEntries, 
    meditationSessions,
    getSuggestedActivities
  } = useContext(SelfCareContext);
  
  // Get suggested activities based on current mood
  const suggestedActivities = getSuggestedActivities();
  
  // Get recent journal entries
  const recentJournalEntries = journalEntries.slice(0, 2);
  
  // Get recommended meditations
  const recommendedMeditations = meditationSessions.slice(0, 2);
  
  return (
    <div className="wellbeing-dashboard">
      <h2>Wellbeing Center</h2>
      
      <div className="wellbeing-summary">
        <h3>Your Wellbeing Journey</h3>
        <div className="wellbeing-progress-bar">
          <div 
            className="wellbeing-progress-fill" 
            style={{width: `${wellbeingScores.overall}%`}}
          ></div>
        </div>
        <div className="wellbeing-stats">
          <span>Overall: {wellbeingScores.overall}%</span>
          <span>Emotional: {wellbeingScores.emotional}%</span>
          <span>Physical: {wellbeingScores.physical}%</span>
        </div>
      </div>
      
      <div className="wellbeing-grid">
        <div className="wellbeing-column">
          <div className="wellbeing-card mood-card">
            <h3>How are you feeling today?</h3>
            <MoodTracker />
          </div>
          
          <div className="wellbeing-card activities-card">
            <h3>Suggested for You</h3>
            <SuggestedActivities activities={suggestedActivities} />
            <button 
              className="view-all-btn" 
              onClick={() => navigateTo('wellbeing/activities')}
            >
              View All Activities
            </button>
          </div>
        </div>
        
        <div className="wellbeing-column">
          <div className="wellbeing-card journal-card">
            <h3>Journal</h3>
            <JournalPreview entries={recentJournalEntries} />
            <button 
              className="view-all-btn" 
              onClick={() => navigateTo('wellbeing/journal')}
            >
              Open Journal
            </button>
          </div>
          
          <div className="wellbeing-card meditation-card">
            <h3>Guided Meditations</h3>
            <MeditationPreview meditations={recommendedMeditations} />
            <button 
              className="view-all-btn" 
              onClick={() => navigateTo('wellbeing/meditations')}
            >
              Browse Meditations
            </button>
          </div>
          
          <div className="wellbeing-card metrics-card">
            <h3>Wellbeing Insights</h3>
            <WellbeingMetrics scores={wellbeingScores} />
            <button 
              className="view-all-btn" 
              onClick={() => navigateTo('wellbeing/insights')}
            >
              View Detailed Insights
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WellbeingDashboard;
