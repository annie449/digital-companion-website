import React, { useContext } from 'react';
import { DigitalCompanionContext } from '../context/DigitalCompanionContext';
import './PriorityTasksList.css';

function PriorityTasksList() {
  const { tasks, navigateTo } = useContext(DigitalCompanionContext);
  
  // Get priority tasks (priority 1 or 2, not completed)
  const priorityTasks = tasks
    .filter(task => (task.priority === 1 || task.priority === 2) && task.status !== 'Completed')
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 3); // Show top 3 priority tasks
  
  const handleTaskClick = (taskId) => {
    navigateTo(`tasks/detail/${taskId}`);
  };
  
  const getPriorityClass = (priority) => {
    return priority === 1 ? 'high-priority' : 
           priority === 2 ? 'medium-priority' : 'low-priority';
  };
  
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Legal': return '⚖️';
      case 'Financial': return '💰';
      case 'Notifications': return '📣';
      case 'Self-Care': return '🧘';
      default: return '📋';
    }
  };
  
  return (
    <div className="priority-tasks-list">
      {priorityTasks.length > 0 ? (
        <ul className="tasks-list">
          {priorityTasks.map(task => (
            <li 
              key={task.id} 
              className={`task-item ${getPriorityClass(task.priority)}`}
              onClick={() => handleTaskClick(task.id)}
            >
              <div className="task-icon">{getCategoryIcon(task.category)}</div>
              <div className="task-details">
                <h4 className="task-title">{task.title}</h4>
                <div className="task-meta">
                  <span className="task-category">{task.category}</span>
                  <span className="task-status">{task.status}</span>
                </div>
                <div className="task-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{width: `${task.progress}%`}}
                    ></div>
                  </div>
                  <span className="progress-text">{task.progress}%</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-tasks-message">No priority tasks at the moment</p>
      )}
    </div>
  );
}

export default PriorityTasksList;
