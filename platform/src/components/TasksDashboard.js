import React from 'react';
import './TasksDashboard.css';

/**
 * Tasks Dashboard Component
 * 
 * This component displays the user's tasks, including priority tasks,
 * completed tasks, and task categories.
 */
const TasksDashboard = () => {
  // Sample tasks data - in a real app, this would come from a context or API
  const tasks = [
    {
      id: 1,
      title: 'Obtain death certificates',
      category: 'Legal',
      status: 'In Progress',
      priority: 'High',
      dueDate: '2025-06-15',
      progress: 50,
      icon: '⚖️'
    },
    {
      id: 2,
      title: 'Notify bank accounts',
      category: 'Financial',
      status: 'Not Started',
      priority: 'High',
      dueDate: '2025-06-20',
      progress: 0,
      icon: '💰'
    },
    {
      id: 3,
      title: 'Contact life insurance provider',
      category: 'Financial',
      status: 'In Progress',
      priority: 'Medium',
      dueDate: '2025-06-25',
      progress: 25,
      icon: '📝'
    },
    {
      id: 4,
      title: 'Organize memorial service',
      category: 'Personal',
      status: 'Completed',
      priority: 'High',
      completedDate: '2025-05-15',
      progress: 100,
      icon: '🕯️'
    }
  ];

  // Filter tasks by status
  const priorityTasks = tasks.filter(task => task.priority === 'High' && task.status !== 'Completed');
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress');
  const completedTasks = tasks.filter(task => task.status === 'Completed');

  return (
    <div className="tasks-dashboard">
      <header className="dashboard-header">
        <h1>Tasks</h1>
        <p>Track and manage your tasks to stay organized during this difficult time.</p>
      </header>

      <section className="tasks-overview">
        <div className="overview-card">
          <h3>Total Tasks</h3>
          <div className="overview-value">{tasks.length}</div>
        </div>
        <div className="overview-card">
          <h3>In Progress</h3>
          <div className="overview-value">{inProgressTasks.length}</div>
        </div>
        <div className="overview-card">
          <h3>Completed</h3>
          <div className="overview-value">{completedTasks.length}</div>
        </div>
      </section>

      <section className="priority-tasks">
        <div className="section-header">
          <h2>Priority Tasks</h2>
          <button className="primary-button">Add Task</button>
        </div>
        <div className="tasks-list">
          {priorityTasks.map(task => (
            <div key={task.id} className="task-card">
              <div className="task-icon">{task.icon}</div>
              <div className="task-content">
                <h3>{task.title}</h3>
                <div className="task-meta">
                  <span className="task-category">{task.category}</span>
                  <span className="task-status">{task.status}</span>
                </div>
                <div className="task-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${task.progress}%` }}></div>
                  </div>
                  <span>{task.progress}%</span>
                </div>
              </div>
              <div className="task-actions">
                <button className="icon-button">✏️</button>
                <button className="icon-button">✓</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="all-tasks">
        <div className="section-header">
          <h2>All Tasks</h2>
          <div className="filter-controls">
            <select className="filter-select">
              <option>All Categories</option>
              <option>Legal</option>
              <option>Financial</option>
              <option>Personal</option>
            </select>
            <select className="filter-select">
              <option>All Statuses</option>
              <option>Not Started</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
        </div>
        <div className="tasks-list">
          {tasks.map(task => (
            <div key={task.id} className="task-card">
              <div className="task-icon">{task.icon}</div>
              <div className="task-content">
                <h3>{task.title}</h3>
                <div className="task-meta">
                  <span className="task-category">{task.category}</span>
                  <span className="task-status">{task.status}</span>
                </div>
                <div className="task-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${task.progress}%` }}></div>
                  </div>
                  <span>{task.progress}%</span>
                </div>
              </div>
              <div className="task-actions">
                <button className="icon-button">✏️</button>
                <button className="icon-button">✓</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="task-categories">
        <h2>Categories</h2>
        <div className="categories-grid">
          <div className="category-card">
            <div className="category-icon">⚖️</div>
            <h3>Legal</h3>
            <p>2 tasks</p>
          </div>
          <div className="category-card">
            <div className="category-icon">💰</div>
            <h3>Financial</h3>
            <p>3 tasks</p>
          </div>
          <div className="category-card">
            <div className="category-icon">👤</div>
            <h3>Personal</h3>
            <p>1 task</p>
          </div>
          <div className="category-card add-category">
            <div className="category-icon">+</div>
            <h3>Add Category</h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TasksDashboard;
