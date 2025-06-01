import React from 'react';
import './ServicesDashboard.css';

/**
 * Services Dashboard Component
 * 
 * This component displays available services and resources
 * to help users during their grief journey.
 */
const ServicesDashboard = () => {
  // Sample services data - in a real app, this would come from a context or API
  const services = [
    {
      id: 1,
      title: 'Grief Counseling',
      description: 'Connect with licensed therapists specializing in grief and loss.',
      icon: '🧠',
      category: 'Mental Health',
      featured: true
    },
    {
      id: 2,
      title: 'Legal Assistance',
      description: 'Find attorneys who can help with estate matters and legal documentation.',
      icon: '⚖️',
      category: 'Legal',
      featured: true
    },
    {
      id: 3,
      title: 'Financial Advisory',
      description: 'Get guidance on managing finances, insurance claims, and benefits.',
      icon: '💰',
      category: 'Financial',
      featured: true
    },
    {
      id: 4,
      title: 'Support Groups',
      description: 'Join virtual or in-person support groups with others experiencing similar loss.',
      icon: '👥',
      category: 'Support',
      featured: false
    },
    {
      id: 5,
      title: 'Meal Delivery',
      description: 'Local services that can provide meals during difficult times.',
      icon: '🍲',
      category: 'Daily Living',
      featured: false
    },
    {
      id: 6,
      title: 'Childcare Services',
      description: 'Temporary childcare options to help during the adjustment period.',
      icon: '👶',
      category: 'Family',
      featured: false
    }
  ];

  // Filter services
  const featuredServices = services.filter(service => service.featured);
  
  // Group services by category
  const serviceCategories = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {});

  return (
    <div className="services-dashboard">
      <header className="dashboard-header">
        <h1>Services</h1>
        <p>Find support services and resources to help you during this difficult time.</p>
      </header>

      <section className="search-section">
        <div className="search-container">
          <input type="text" placeholder="Search for services..." className="search-input" />
          <button className="search-button">🔍</button>
        </div>
        <div className="filter-options">
          <select className="filter-select">
            <option value="">All Categories</option>
            <option value="Mental Health">Mental Health</option>
            <option value="Legal">Legal</option>
            <option value="Financial">Financial</option>
            <option value="Support">Support</option>
            <option value="Daily Living">Daily Living</option>
            <option value="Family">Family</option>
          </select>
          <select className="filter-select">
            <option value="">All Locations</option>
            <option value="local">Local Services</option>
            <option value="remote">Remote Services</option>
          </select>
        </div>
      </section>

      <section className="featured-services">
        <h2>Featured Services</h2>
        <div className="services-grid">
          {featuredServices.map(service => (
            <div key={service.id} className="service-card featured">
              <div className="service-icon">{service.icon}</div>
              <div className="service-content">
                <h3>{service.title}</h3>
                <div className="service-category">{service.category}</div>
                <p>{service.description}</p>
                <button className="primary-button">Learn More</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="service-categories">
        <h2>Browse by Category</h2>
        <div className="categories-grid">
          {Object.entries(serviceCategories).map(([category, services]) => (
            <div key={category} className="category-card">
              <h3>{category}</h3>
              <div className="category-count">{services.length} services</div>
              <button className="secondary-button">View All</button>
            </div>
          ))}
        </div>
      </section>

      <section className="local-services">
        <div className="section-header">
          <h2>Local Services</h2>
          <button className="text-button">View Map</button>
        </div>
        <p>Services available in your area based on your location.</p>
        <div className="location-info">
          <div className="location-icon">📍</div>
          <div className="location-text">London, UK</div>
          <button className="text-button">Change</button>
        </div>
        <div className="local-services-list">
          <div className="local-service-item">
            <div className="service-details">
              <h3>Grief Support Center</h3>
              <p>123 Main Street, London</p>
              <div className="service-meta">
                <span>2.3 miles away</span>
                <span>•</span>
                <span>⭐⭐⭐⭐⭐ (24 reviews)</span>
              </div>
            </div>
            <div className="service-actions">
              <button className="icon-button">📞</button>
              <button className="icon-button">📍</button>
            </div>
          </div>
          <div className="local-service-item">
            <div className="service-details">
              <h3>Family Legal Services</h3>
              <p>456 High Street, London</p>
              <div className="service-meta">
                <span>3.1 miles away</span>
                <span>•</span>
                <span>⭐⭐⭐⭐ (18 reviews)</span>
              </div>
            </div>
            <div className="service-actions">
              <button className="icon-button">📞</button>
              <button className="icon-button">📍</button>
            </div>
          </div>
        </div>
      </section>

      <section className="request-service">
        <div className="request-card">
          <h2>Can't Find What You Need?</h2>
          <p>Let us help you find specific services or resources tailored to your situation.</p>
          <button className="primary-button">Request Assistance</button>
        </div>
      </section>
    </div>
  );
};

export default ServicesDashboard;
