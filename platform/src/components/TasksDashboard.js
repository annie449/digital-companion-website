import React from 'react';
import './TasksDashboard.css';

function TasksDashboard() {
  return (
    <div className="tasks-dashboard">
      <h1>Tasks Dashboard</h1>
      <p className="dashboard-description">Track and manage important tasks during difficult transitions.</p>
      
      <div className="tasks-container">
        <div className="tasks-category">
          <h2>Immediate Tasks</h2>
          <ul className="tasks-list">
            <li className="task-item">
              <div className="task-header">
                <span className="task-name">Notify family and friends</span>
                <span className="task-status completed">Completed</span>
              </div>
              <p className="task-description">Contact immediate family members and close friends.</p>
            </li>
            <li className="task-item">
              <div className="task-header">
                <span className="task-name">Contact funeral home</span>
                <span className="task-status in-progress">In Progress</span>
              </div>
              <p className="task-description">Arrange initial meeting with funeral director.</p>
            </li>
            <li className="task-item">
              <div className="task-header">
                <span className="task-name">Obtain death certificates</span>
                <span className="task-status not-started">Not Started</span>
              </div>
              <p className="task-description">Request multiple copies for legal and financial matters.</p>
            </li>
          </ul>
        </div>
        
        <div className="tasks-category">
          <h2>Financial Tasks</h2>
          <ul className="tasks-list">
            <li className="task-item">
              <div className="task-header">
                <span className="task-name">Locate important documents</span>
                <span className="task-status in-progress">In Progress</span>
              </div>
              <p className="task-description">Find will, insurance policies, and financial accounts.</p>
            </li>
            <li className="task-item">
              <div className="task-header">
                <span className="task-name">Contact insurance companies</span>
                <span className="task-status not-started">Not Started</span>
              </div>
              <p className="task-description">Notify life insurance, health insurance, and other policies.</p>
            </li>
          </ul>
        </div>
        
        <div className="tasks-category">
          <h2>Legal Tasks</h2>
          <ul className="tasks-list">
            <li className="task-item">
              <div className="task-header">
                <span className="task-name">Contact attorney</span>
                <span className="task-status not-started">Not Started</span>
              </div>
              <p className="task-description">Schedule meeting to discuss will and estate matters.</p>
            </li>
            <li className="task-item">
              <div className="task-header">
                <span className="task-name">Begin probate process</span>
                <span className="task-status not-started">Not Started</span>
              </div>
              <p className="task-description">File necessary paperwork with probate court.</p>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="add-task-section">
        <button className="add-task-button">+ Add New Task</button>
      </div>
    </div>
  );
}

export default TasksDashboard;
