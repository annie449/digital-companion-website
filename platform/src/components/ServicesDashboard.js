import React from 'react';
import './ServicesDashboard.css';

function ServicesDashboard() {
  return (
    <div className="services-dashboard">
      <h1>Services Dashboard</h1>
      <p className="dashboard-description">Find professional support services to help during difficult times.</p>
      
      <div className="services-search">
        <div className="search-container">
          <input type="text" placeholder="Search for services..." className="search-input" />
          <button className="search-button">Search</button>
        </div>
        <div className="filter-container">
          <select className="filter-select">
            <option value="">All Categories</option>
            <option value="grief-counseling">Grief Counseling</option>
            <option value="legal-services">Legal Services</option>
            <option value="financial-advice">Financial Advice</option>
            <option value="support-groups">Support Groups</option>
          </select>
          <select className="filter-select">
            <option value="">All Locations</option>
            <option value="online">Online</option>
            <option value="in-person">In-Person</option>
          </select>
        </div>
      </div>
      
      <div className="featured-services">
        <h2>Featured Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-header grief-counseling">
              <span className="service-category">Grief Counseling</span>
            </div>
            <div className="service-content">
              <h3>Compassionate Grief Support</h3>
              <p className="service-description">Professional counseling services specializing in grief and loss support.</p>
              <div className="service-details">
                <span className="service-location">Online & In-Person</span>
                <span className="service-rating">★★★★★ (48 reviews)</span>
              </div>
              <button className="service-button">View Details</button>
            </div>
          </div>
          
          <div className="service-card">
            <div className="service-header legal-services">
              <span className="service-category">Legal Services</span>
            </div>
            <div className="service-content">
              <h3>Estate Planning Attorneys</h3>
              <p className="service-description">Legal assistance with wills, trusts, and estate administration.</p>
              <div className="service-details">
                <span className="service-location">Online & In-Person</span>
                <span className="service-rating">★★★★☆ (36 reviews)</span>
              </div>
              <button className="service-button">View Details</button>
            </div>
          </div>
          
          <div className="service-card">
            <div className="service-header financial-advice">
              <span className="service-category">Financial Advice</span>
            </div>
            <div className="service-content">
              <h3>Financial Transition Planning</h3>
              <p className="service-description">Financial guidance during major life transitions and estate management.</p>
              <div className="service-details">
                <span className="service-location">Online</span>
                <span className="service-rating">★★★★★ (29 reviews)</span>
              </div>
              <button className="service-button">View Details</button>
            </div>
          </div>
          
          <div className="service-card">
            <div className="service-header support-groups">
              <span className="service-category">Support Groups</span>
            </div>
            <div className="service-content">
              <h3>Grief Share Community</h3>
              <p className="service-description">Weekly support group meetings for people experiencing grief and loss.</p>
              <div className="service-details">
                <span className="service-location">Online & In-Person</span>
                <span className="service-rating">★★★★★ (52 reviews)</span>
              </div>
              <button className="service-button">View Details</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="service-resources">
        <h2>Finding the Right Support</h2>
        <div className="resources-grid">
          <div className="resource-card">
            <h3>Choosing a Grief Counselor</h3>
            <p>Tips for finding the right grief counselor for your needs.</p>
            <a href="#" className="resource-link">Read Guide</a>
          </div>
          
          <div className="resource-card">
            <h3>Questions to Ask an Estate Attorney</h3>
            <p>Important questions to ask when selecting an estate planning attorney.</p>
            <a href="#" className="resource-link">View Checklist</a>
          </div>
          
          <div className="resource-card">
            <h3>Support Group Benefits</h3>
            <p>How support groups can help during the grieving process.</p>
            <a href="#" className="resource-link">Read Article</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesDashboard;
