import React, { useContext } from 'react';
import { DigitalCompanionContext } from '../context/DigitalCompanionContext';
import './QuickActionButtons.css';

function QuickActionButtons() {
  const { navigateTo, addTask, addAsset } = useContext(DigitalCompanionContext);
  
  const handleAddTask = () => {
    navigateTo('tasks/create');
  };
  
  const handleAddAsset = () => {
    navigateTo('estate/add');
  };
  
  const handleGenerateReport = () => {
    navigateTo('reports/create');
  };
  
  const handleViewProgress = () => {
    navigateTo('progress');
  };
  
  return (
    <div className="quick-action-buttons">
      <button className="action-button task-button" onClick={handleAddTask}>
        <span className="action-icon">✓</span>
        <span className="action-text">Add Task</span>
      </button>
      
      <button className="action-button asset-button" onClick={handleAddAsset}>
        <span className="action-icon">💼</span>
        <span className="action-text">Add Asset</span>
      </button>
      
      <button className="action-button report-button" onClick={handleGenerateReport}>
        <span className="action-icon">📊</span>
        <span className="action-text">Generate Report</span>
      </button>
      
      <button className="action-button progress-button" onClick={handleViewProgress}>
        <span className="action-icon">📈</span>
        <span className="action-text">View Progress</span>
      </button>
    </div>
  );
}

export default QuickActionButtons;
