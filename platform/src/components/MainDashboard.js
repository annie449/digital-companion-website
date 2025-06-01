import React, { useContext } from 'react';
import { DigitalCompanionContext } from '../context/DigitalCompanionContext';
import './MainDashboard.css';

// Import components
import PriorityTasksList from './PriorityTasksList';
import EstateOverview from './EstateOverview';
import ActivityFeed from './ActivityFeed';
import QuickActionButtons from './QuickActionButtons';

function MainDashboard() {
  const { progress, recentActivity, navigateTo } = useContext(DigitalCompanionContext);
  
  return (
    <div className="main-dashboard">
      <h2>Welcome to Digital Companion™</h2>
      
      <div className="progress-summary">
        <h3>Your Journey Progress</h3>
        <div className="progress-bar">
          <div className="progress-fill" style={{width: `${progress.overall}%`}}></div>
        </div>
        <div className="progress-stats">
          <span>Overall: {progress.overall}%</span>
          <span>Tasks: {progress.tasks}%</span>
          <span>Estate: {progress.estate}%</span>
        </div>
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-column">
          <div className="dashboard-card">
            <h3>Priority Tasks</h3>
            <PriorityTasksList />
            <button className="view-all-btn" onClick={() => navigateTo('tasks')}>
              View All Tasks
            </button>
          </div>
          
          <div className="dashboard-card">
            <h3>Recent Activity</h3>
            <ActivityFeed activities={recentActivity} />
          </div>
        </div>
        
        <div className="dashboard-column">
          <div className="dashboard-card">
            <h3>Estate Overview</h3>
            <EstateOverview />
            <button className="view-all-btn" onClick={() => navigateTo('estate')}>
              View Estate Details
            </button>
          </div>
          
          <div className="dashboard-card">
            <h3>Quick Actions</h3>
            <QuickActionButtons />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;
