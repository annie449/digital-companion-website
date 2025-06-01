import React, { useContext, useState } from 'react';
import { DigitalCompanionContext } from '../context/DigitalCompanionContext';
import { SelfCareContext } from '../context/SelfCareContext';
import './ServiceFinder.css';

function ServiceFinder() {
  const { navigateTo } = useContext(DigitalCompanionContext);
  const { saveResource } = useContext(SelfCareContext);
  
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('all');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Service categories
  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'legal', label: 'Legal Services' },
    { id: 'financial', label: 'Financial Advisors' },
    { id: 'grief', label: 'Grief Support' },
    { id: 'funeral', label: 'Funeral Services' },
    { id: 'estate', label: 'Estate Administration' }
  ];
  
  // Mock service providers data (would be fetched from API in production)
  const mockServiceProviders = [
    {
      id: 'service-001',
      name: 'Smith & Partners Legal Services',
      category: 'legal',
      description: 'Specializing in probate and estate administration with compassionate service.',
      location: 'London',
      rating: 4.8,
      reviewCount: 124,
      verified: true,
      contact: {
        phone: '020-1234-5678',
        email: 'info@smithpartners.co.uk',
        website: 'https://www.smithpartners.co.uk'
      }
    },
    {
      id: 'service-002',
      name: 'Grief Support Network',
      category: 'grief',
      description: 'Professional counseling and support groups for those experiencing loss.',
      location: 'London',
      rating: 4.9,
      reviewCount: 89,
      verified: true,
      contact: {
        phone: '020-2345-6789',
        email: 'support@griefsupport.org',
        website: 'https://www.griefsupport.org'
      }
    },
    {
      id: 'service-003',
      name: 'Financial Futures Advisory',
      category: 'financial',
      description: 'Specialized financial planning and advice for estate management and inheritance.',
      location: 'Manchester',
      rating: 4.7,
      reviewCount: 56,
      verified: true,
      contact: {
        phone: '0161-345-6789',
        email: 'info@financialfutures.co.uk',
        website: 'https://www.financialfutures.co.uk'
      }
    },
    {
      id: 'service-004',
      name: 'Peaceful Transitions Funeral Services',
      category: 'funeral',
      description: 'Compassionate funeral planning and services with personalized options.',
      location: 'Birmingham',
      rating: 4.9,
      reviewCount: 112,
      verified: true,
      contact: {
        phone: '0121-456-7890',
        email: 'care@peacefultransitions.co.uk',
        website: 'https://www.peacefultransitions.co.uk'
      }
    },
    {
      id: 'service-005',
      name: 'Estate Solutions',
      category: 'estate',
      description: 'Comprehensive estate administration and property management services.',
      location: 'London',
      rating: 4.6,
      reviewCount: 78,
      verified: false,
      contact: {
        phone: '020-3456-7891',
        email: 'info@estatesolutions.co.uk',
        website: 'https://www.estatesolutions.co.uk'
      }
    },
    {
      id: 'service-006',
      name: 'Compassionate Legal Aid',
      category: 'legal',
      description: 'Affordable legal assistance for probate and inheritance matters.',
      location: 'Manchester',
      rating: 4.5,
      reviewCount: 42,
      verified: true,
      contact: {
        phone: '0161-567-8901',
        email: 'help@compassionatelegal.org',
        website: 'https://www.compassionatelegal.org'
      }
    }
  ];
  
  const handleSearch = () => {
    setIsSearching(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      let results = [...mockServiceProviders];
      
      // Filter by location if provided
      if (location) {
        results = results.filter(provider => 
          provider.location.toLowerCase().includes(location.toLowerCase())
        );
      }
      
      // Filter by category if not 'all'
      if (category !== 'all') {
        results = results.filter(provider => provider.category === category);
      }
      
      setSearchResults(results);
      setIsSearching(false);
    }, 1000);
  };
  
  const handleProviderClick = (providerId) => {
    navigateTo(`services/provider/${providerId}`);
  };
  
  const handleSaveProvider = (e, provider) => {
    e.stopPropagation(); // Prevent triggering the parent click
    saveResource(provider.id);
    // Show confirmation toast or message
  };
  
  return (
    <div className="service-finder">
      <h2>Service Finder</h2>
      
      <div className="search-container">
        <div className="search-form">
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              placeholder="Enter city or postcode"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Service Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>
          
          <button 
            className="search-btn"
            onClick={handleSearch}
            disabled={isSearching}
          >
            {isSearching ? 'Searching...' : 'Find Services'}
          </button>
        </div>
      </div>
      
      <div className="search-results">
        {isSearching ? (
          <div className="loading-results">Searching for services...</div>
        ) : searchResults.length > 0 ? (
          <div className="results-list">
            {searchResults.map(provider => (
              <div 
                key={provider.id} 
                className="provider-card"
                onClick={() => handleProviderClick(provider.id)}
              >
                <div className="provider-header">
                  <h3 className="provider-name">{provider.name}</h3>
                  <button 
                    className="save-provider-btn"
                    onClick={(e) => handleSaveProvider(e, provider)}
                  >
                    Save
                  </button>
                </div>
                
                <div className="provider-category">{categories.find(c => c.id === provider.category)?.label}</div>
                
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
        ) : location || category !== 'all' ? (
          <div className="no-results">
            <p>No service providers found matching your criteria.</p>
            <p>Try adjusting your search filters or location.</p>
          </div>
        ) : (
          <div className="search-prompt">
            <p>Enter a location and/or select a service category to find providers in your area.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ServiceFinder;
