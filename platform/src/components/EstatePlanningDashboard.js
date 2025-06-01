import React from 'react';
import './EstatePlanningDashboard.css';

function EstatePlanningDashboard() {
  return (
    <div className="estate-planning-dashboard">
      <h1>Estate Planning Dashboard</h1>
      <p className="dashboard-description">Organize important documents and make critical decisions for the future.</p>
      
      <div className="planning-progress">
        <h2>Your Progress</h2>
        <div className="progress-container">
          <div className="progress-label">
            <span>Overall Completion</span>
            <span>35%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '35%' }}></div>
          </div>
        </div>
        
        <div className="progress-categories">
          <div className="progress-category">
            <div className="category-header">
              <h3>Important Documents</h3>
              <span>40%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '40%' }}></div>
            </div>
          </div>
          
          <div className="progress-category">
            <div className="category-header">
              <h3>Financial Planning</h3>
              <span>25%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '25%' }}></div>
            </div>
          </div>
          
          <div className="progress-category">
            <div className="category-header">
              <h3>Healthcare Directives</h3>
              <span>50%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '50%' }}></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="document-templates">
        <h2>Document Templates</h2>
        <div className="templates-grid">
          <div className="template-card">
            <h3>Last Will and Testament</h3>
            <p>Create a legally binding document that outlines how you want your assets distributed.</p>
            <button className="template-button">Start Template</button>
          </div>
          
          <div className="template-card">
            <h3>Power of Attorney</h3>
            <p>Designate someone to make financial decisions on your behalf if you're unable to do so.</p>
            <button className="template-button">Start Template</button>
          </div>
          
          <div className="template-card">
            <h3>Healthcare Directive</h3>
            <p>Document your wishes for medical care if you're unable to communicate.</p>
            <button className="template-button">Start Template</button>
          </div>
          
          <div className="template-card">
            <h3>Digital Asset Inventory</h3>
            <p>Create a comprehensive list of your digital accounts and assets.</p>
            <button className="template-button">Start Template</button>
          </div>
        </div>
      </div>
      
      <div className="planning-resources">
        <h2>Helpful Resources</h2>
        <div className="resources-list">
          <div className="resource-item">
            <h3>Estate Planning Basics Guide</h3>
            <p>Learn the fundamentals of estate planning and why it's important.</p>
            <a href="#" className="resource-link">Read Guide</a>
          </div>
          
          <div className="resource-item">
            <h3>Finding an Estate Attorney</h3>
            <p>Tips for finding and working with an estate planning attorney.</p>
            <a href="#" className="resource-link">Read Article</a>
          </div>
          
          <div className="resource-item">
            <h3>Digital Legacy Planning</h3>
            <p>How to manage your digital assets and accounts as part of your estate plan.</p>
            <a href="#" className="resource-link">Read Article</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EstatePlanningDashboard;
