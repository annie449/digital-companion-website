import React, { useContext, useState } from 'react';
import { DigitalCompanionContext } from '../context/DigitalCompanionContext';
import './SavedProvidersView.css';

function SavedProvidersView() {
  const { navigateTo } = useContext(DigitalCompanionContext);
  const [savedProviders, setSavedProviders] = useState([
    {
      id: 'service-001',
      name: 'Smith & Partners Legal Services',
      category: 'legal',
      description: 'Specializing in probate and estate administration with compassionate service.',
      location: 'London',
      rating: 4.8,
      reviewCount: 124,
      verified: true
    },
    {
      id: 'service-002',
      name: 'Grief Support Network',
      category: 'grief',
      description: 'Professional counseling and support groups for those experiencing loss.',
      location: 'London',
      rating: 4.9,
      reviewCount: 89,
      verified: true
    }
  ]);
  
  // Service categories
  const categoryLabels = {
    'legal': 'Legal Services',
    'financial': 'Financial Advisors',
    'grief': 'Grief Support',
    'funeral': 'Funeral Services',
    'estate': 'Estate Administration'
  };
  
  const handleProviderClick = (providerId) => {
    navigateTo(`services/provider/${providerId}`);
  };
  
  const handleRemoveProvider = (e, providerId) => {
    e.stopPropagation(); // Prevent triggering the parent click
    setSavedProviders(savedProviders.filter(provider => provider.id !== providerId));
  };
  
  const handleFindServices = () => {
    navigateTo('services');
  };
  
  return (
    <div className="saved-providers-view">
      <div className="saved-providers-header">
        <h2>Saved Service Providers</h2>
        <button 
          className="find-services-btn"
          onClick={handleFindServices}
        >
          Find More Services
        </button>
      </div>
      
      {savedProviders.length > 0 ? (
        <div className="saved-providers-list">
          {savedProviders.map(provider => (
            <div 
              key={provider.id} 
              className="saved-provider-card"
              onClick={() => handleProviderClick(provider.id)}
            >
              <div className="provider-header">
                <h3 className="provider-name">{provider.name}</h3>
                <button 
                  className="remove-provider-btn"
                  onClick={(e) => handleRemoveProvider(e, provider.id)}
                >
                  Remove
                </button>
              </div>
              
              <div className="provider-category">{categoryLabels[provider.category]}</div>
              
              <p className="provider-description">{provider.description}</p>
              
              <div className="provider-meta">
                <div className="provider-location">{provider.location}</div>
                <div className="provider-rating">
                  <span className="rating-stars">{'★'.repeat(Math.floor(provider.rating))}</span>
                  <span className="rating-value">{provider.rating}</span>
                  <span className="review-count">({provider.reviewCount} reviews)</span>
                </div>
              </div>
              
              {provider.verified && (
                <div className="verified-badge">✓ Verified Provider</div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="no-saved-providers">
          <p>You haven't saved any service providers yet.</p>
          <button 
            className="find-services-btn large"
            onClick={handleFindServices}
          >
            Find Services
          </button>
        </div>
      )}
    </div>
  );
}

export default SavedProvidersView;
