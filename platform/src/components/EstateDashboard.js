import React from 'react';
import './EstateDashboard.css';

/**
 * Estate Dashboard Component
 * 
 * This component displays the user's estate information, including property,
 * financial assets, and provides access to estate planning and memory vault features.
 */
const EstateDashboard = () => {
  // Sample estate data - in a real app, this would come from a context or API
  const estateData = {
    totalValue: 535000,
    categories: [
      {
        name: 'Property',
        value: 450000,
        percentage: 84,
        items: 1,
        icon: '🏠'
      },
      {
        name: 'Financial',
        value: 85000,
        percentage: 16,
        items: 1,
        icon: '💰'
      }
    ]
  };

  return (
    <div className="estate-dashboard">
      <header className="dashboard-header">
        <h1>Estate</h1>
        <p>Manage and track all estate-related information in one place.</p>
      </header>

      <div className="dashboard-actions">
        <button className="primary-button">
          <span className="button-icon">📊</span>
          Estate Overview
        </button>
        <button className="secondary-button">
          <span className="button-icon">📝</span>
          Estate Planning
        </button>
        <button className="secondary-button">
          <span className="button-icon">🖼️</span>
          Memory Vault
        </button>
      </div>

      <section className="estate-overview">
        <h2>Estate Overview</h2>
        <div className="total-value-card">
          <h3>Total Estate Value</h3>
          <div className="value">£{estateData.totalValue.toLocaleString()}</div>
        </div>

        <div className="categories-list">
          {estateData.categories.map((category, index) => (
            <div key={index} className="category-card">
              <div className="category-icon">{category.icon}</div>
              <div className="category-details">
                <h3>{category.name}</h3>
                <div className="category-meta">
                  <span>{category.items} item{category.items !== 1 ? 's' : ''}</span>
                  <span className="category-value">£{category.value.toLocaleString()}</span>
                </div>
                <div className="category-percentage">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${category.percentage}%` }}></div>
                  </div>
                  <span>{category.percentage}% of estate</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="estate-planning-preview">
        <div className="section-header">
          <h2>Estate Planning</h2>
          <button className="text-button">View All</button>
        </div>
        <p>Prepare important documents to protect your legacy and support your loved ones.</p>
        <div className="planning-progress">
          <div className="progress-overview">
            <div className="progress-circle">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path className="circle-bg"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path className="circle"
                  strokeDasharray="10, 100"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" className="percentage">10%</text>
              </svg>
            </div>
            <div className="planning-actions">
              <button className="primary-button">Continue Planning</button>
            </div>
          </div>
        </div>
      </section>

      <section className="memory-vault-preview">
        <div className="section-header">
          <h2>Memory Vault</h2>
          <button className="text-button">View All</button>
        </div>
        <p>Preserve and share important memories, stories, photos, and videos with your loved ones.</p>
        <div className="memories-preview">
          <div className="memory-card-small">
            <div className="memory-thumbnail">
              <img src="https://via.placeholder.com/150x100?text=Memory" alt="Memory" />
            </div>
            <h3>Family Vacation</h3>
          </div>
          <div className="memory-card-small">
            <div className="memory-thumbnail">
              <img src="https://via.placeholder.com/150x100?text=Memory" alt="Memory" />
            </div>
            <h3>Wedding Day</h3>
          </div>
          <div className="memory-card-small">
            <div className="memory-thumbnail">
              <img src="https://via.placeholder.com/150x100?text=Memory" alt="Memory" />
            </div>
            <h3>Birthday Party</h3>
          </div>
          <div className="memory-actions">
            <button className="secondary-button">Create Memory</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EstateDashboard;
