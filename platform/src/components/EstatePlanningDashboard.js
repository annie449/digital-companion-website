import React, { useState } from 'react';
import './EstatePlanningDashboard.css';

/**
 * Estate Planning Dashboard Component
 * 
 * This component serves as the main interface for the estate planning feature,
 * allowing users to create, manage, and track progress on essential estate planning documents.
 */
const EstatePlanningDashboard = () => {
  // State for tracking document completion progress
  const [planningProgress, setPlanningProgress] = useState({
    will: 25,
    healthcareDirective: 10,
    powerOfAttorney: 0,
    digitalAssets: 5,
    overall: 10
  });

  // State for document templates
  const [documentTemplates, setDocumentTemplates] = useState([
    {
      id: 'will',
      title: 'Will & Testament',
      description: 'Specify how your assets should be distributed and who will execute your estate.',
      icon: '📜',
      progress: 25,
      lastUpdated: '2 days ago'
    },
    {
      id: 'healthcare',
      title: 'Healthcare Directive',
      description: 'Document your medical care preferences if you become unable to make decisions.',
      icon: '🏥',
      progress: 10,
      lastUpdated: '1 week ago'
    },
    {
      id: 'poa',
      title: 'Power of Attorney',
      description: 'Designate someone to make financial or legal decisions on your behalf.',
      icon: '⚖️',
      progress: 0,
      lastUpdated: 'Not started'
    },
    {
      id: 'digital',
      title: 'Digital Asset Instructions',
      description: 'Provide guidance for handling your online accounts and digital property.',
      icon: '💻',
      progress: 5,
      lastUpdated: '2 weeks ago'
    }
  ]);

  // State for recent activity
  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      action: 'updated',
      document: 'Will & Testament',
      timestamp: '2 days ago'
    },
    {
      id: 2,
      action: 'created',
      document: 'Healthcare Directive',
      timestamp: '1 week ago'
    },
    {
      id: 3,
      action: 'shared',
      document: 'Will & Testament',
      recipient: 'Family Lawyer',
      timestamp: '1 week ago'
    }
  ]);

  // Handler for document selection
  const handleDocumentSelect = (documentId) => {
    console.log(`Selected document: ${documentId}`);
    // In a full implementation, this would navigate to the document editor
    // or create a new document if it doesn't exist
  };

  return (
    <div className="estate-planning-dashboard">
      <header className="dashboard-header">
        <h1>Estate Planning</h1>
        <p>Prepare important documents to protect your legacy and support your loved ones.</p>
      </header>

      <section className="planning-progress">
        <h2>Your Planning Progress</h2>
        <div className="progress-overview">
          <div className="progress-circle">
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path className="circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path className="circle"
                strokeDasharray={`${planningProgress.overall}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="20.35" className="percentage">{planningProgress.overall}%</text>
            </svg>
          </div>
          <div className="progress-details">
            <div className="progress-item">
              <span>Will & Testament</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${planningProgress.will}%` }}></div>
              </div>
              <span>{planningProgress.will}%</span>
            </div>
            <div className="progress-item">
              <span>Healthcare Directive</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${planningProgress.healthcareDirective}%` }}></div>
              </div>
              <span>{planningProgress.healthcareDirective}%</span>
            </div>
            <div className="progress-item">
              <span>Power of Attorney</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${planningProgress.powerOfAttorney}%` }}></div>
              </div>
              <span>{planningProgress.powerOfAttorney}%</span>
            </div>
            <div className="progress-item">
              <span>Digital Assets</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${planningProgress.digitalAssets}%` }}></div>
              </div>
              <span>{planningProgress.digitalAssets}%</span>
            </div>
          </div>
        </div>
      </section>

      <section className="document-templates">
        <h2>Document Templates</h2>
        <div className="templates-grid">
          {documentTemplates.map(template => (
            <div 
              key={template.id} 
              className="template-card"
              onClick={() => handleDocumentSelect(template.id)}
            >
              <div className="template-icon">{template.icon}</div>
              <h3>{template.title}</h3>
              <p>{template.description}</p>
              <div className="template-footer">
                <div className="template-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${template.progress}%` }}></div>
                  </div>
                  <span>{template.progress}% complete</span>
                </div>
                <div className="template-updated">Last updated: {template.lastUpdated}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="memory-vault-preview">
        <div className="section-header">
          <h2>Memory Vault</h2>
          <button className="secondary-button">View All</button>
        </div>
        <div className="memory-preview">
          <p>Preserve and share important memories, stories, photos, and videos with your loved ones.</p>
          <div className="memory-actions">
            <button className="primary-button">Create Memory</button>
            <button className="secondary-button">Explore Timeline</button>
          </div>
        </div>
      </section>

      <section className="recent-activity">
        <h2>Recent Activity</h2>
        <ul className="activity-list">
          {recentActivity.map(activity => (
            <li key={activity.id} className="activity-item">
              <div className="activity-icon">
                {activity.action === 'updated' && '✏️'}
                {activity.action === 'created' && '🆕'}
                {activity.action === 'shared' && '🔗'}
              </div>
              <div className="activity-details">
                <p>
                  <strong>{activity.action}</strong> {activity.document}
                  {activity.recipient && <span> with {activity.recipient}</span>}
                </p>
                <span className="activity-time">{activity.timestamp}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button className="action-button">
            <span className="action-icon">📝</span>
            <span>Create New Document</span>
          </button>
          <button className="action-button">
            <span className="action-icon">📤</span>
            <span>Share Documents</span>
          </button>
          <button className="action-button">
            <span className="action-icon">📋</span>
            <span>Document Checklist</span>
          </button>
          <button className="action-button">
            <span className="action-icon">❓</span>
            <span>Get Planning Advice</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default EstatePlanningDashboard;
