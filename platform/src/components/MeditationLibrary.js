import React, { useState, useContext, useEffect } from 'react';
import { MeditationContext } from '../context/MeditationContext';
import { SelfCareContext } from '../context/SelfCareContext';
import './MeditationLibrary.css';

/**
 * MeditationLibrary Component
 * 
 * A comprehensive library interface for browsing, searching, and filtering
 * meditation content with category navigation and personalized recommendations.
 */
const MeditationLibrary = ({ onSelectMeditation }) => {
  // State
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMeditations, setFilteredMeditations] = useState([]);
  const [filterDuration, setFilterDuration] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  // Context
  const { 
    meditations, 
    categories, 
    isLoading, 
    error,
    getMeditationsByCategory,
    searchMeditations,
    getRecommendedMeditations,
    getFavoriteMeditations,
    getDownloadedMeditations,
    checkIfFavorite,
    checkIfDownloaded
  } = useContext(MeditationContext);
  
  const { userState } = useContext(SelfCareContext);
  
  // Filter meditations based on active category, search, and duration
  useEffect(() => {
    if (isLoading) return;
    
    let result = [];
    
    // Handle special categories first
    if (activeCategory === 'all') {
      result = [...meditations];
    } else if (activeCategory === 'recommended') {
      result = getRecommendedMeditations(userState);
    } else if (activeCategory === 'favorites') {
      result = getFavoriteMeditations();
    } else if (activeCategory === 'downloaded') {
      result = getDownloadedMeditations();
    } else {
      // Regular category filtering
      result = getMeditationsByCategory(activeCategory);
    }
    
    // Apply search filter if query exists
    if (searchQuery.trim()) {
      result = searchMeditations(searchQuery);
    }
    
    // Apply duration filter
    if (filterDuration !== 'all') {
      result = result.filter(meditation => {
        const durationMinutes = Math.floor(meditation.duration / 60);
        
        switch (filterDuration) {
          case 'short':
            return durationMinutes < 10;
          case 'medium':
            return durationMinutes >= 10 && durationMinutes < 20;
          case 'long':
            return durationMinutes >= 20;
          default:
            return true;
        }
      });
    }
    
    setFilteredMeditations(result);
  }, [
    isLoading, 
    activeCategory, 
    searchQuery, 
    filterDuration, 
    meditations, 
    getMeditationsByCategory, 
    searchMeditations, 
    getRecommendedMeditations,
    getFavoriteMeditations,
    getDownloadedMeditations,
    userState
  ]);
  
  // Format duration from seconds to MM:SS
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Handle meditation selection
  const handleSelectMeditation = (meditation) => {
    if (onSelectMeditation) {
      onSelectMeditation(meditation);
    }
  };
  
  // Handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
  };
  
  // Toggle filters visibility
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  // Render loading state
  if (isLoading) {
    return (
      <div className="meditation-library loading">
        <div className="loading-spinner"></div>
        <p>Loading meditation library...</p>
      </div>
    );
  }
  
  // Render error state
  if (error) {
    return (
      <div className="meditation-library error">
        <p>Error loading meditation library: {error}</p>
        <button className="retry-button">Retry</button>
      </div>
    );
  }
  
  return (
    <div className="meditation-library">
      {/* Header with search and filters */}
      <div className="library-header">
        <h2>Meditation Library</h2>
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Search meditations..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          {searchQuery && (
            <button 
              className="clear-search" 
              onClick={clearSearch}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
        
        <div className="view-controls">
          <button 
            className={`view-mode-button ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            aria-label="Grid view"
          >
            ⊞
          </button>
          <button 
            className={`view-mode-button ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            aria-label="List view"
          >
            ≡
          </button>
          <button 
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={toggleFilters}
            aria-label="Toggle filters"
          >
            ⚙
          </button>
        </div>
      </div>
      
      {/* Filters panel */}
      {showFilters && (
        <div className="filters-panel">
          <div className="filter-group">
            <label>Duration:</label>
            <select 
              value={filterDuration} 
              onChange={(e) => setFilterDuration(e.target.value)}
            >
              <option value="all">All Durations</option>
              <option value="short">Short (&lt; 10 min)</option>
              <option value="medium">Medium (10-20 min)</option>
              <option value="long">Long (&gt; 20 min)</option>
            </select>
          </div>
          
          {/* Additional filters could be added here */}
        </div>
      )}
      
      {/* Category navigation */}
      <div className="category-navigation">
        <button 
          className={`category-button ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          All
        </button>
        <button 
          className={`category-button ${activeCategory === 'recommended' ? 'active' : ''}`}
          onClick={() => setActiveCategory('recommended')}
        >
          Recommended
        </button>
        <button 
          className={`category-button ${activeCategory === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveCategory('favorites')}
        >
          Favorites
        </button>
        <button 
          className={`category-button ${activeCategory === 'downloaded' ? 'active' : ''}`}
          onClick={() => setActiveCategory('downloaded')}
        >
          Downloaded
        </button>
        
        {/* Render category buttons */}
        {categories.map(category => (
          <button 
            key={category.id}
            className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* Results count */}
      <div className="results-count">
        {filteredMeditations.length} {filteredMeditations.length === 1 ? 'meditation' : 'meditations'} found
      </div>
      
      {/* Meditation list */}
      {filteredMeditations.length === 0 ? (
        <div className="no-results">
          <p>No meditations found matching your criteria.</p>
          <button onClick={() => {
            setActiveCategory('all');
            setSearchQuery('');
            setFilterDuration('all');
          }}>
            Reset Filters
          </button>
        </div>
      ) : (
        <div className={`meditations-container ${viewMode}`}>
          {filteredMeditations.map(meditation => (
            <div 
              key={meditation.id}
              className="meditation-item"
              onClick={() => handleSelectMeditation(meditation)}
            >
              <div className="meditation-image-container">
                <img 
                  src={meditation.content.image_url || '/assets/default-meditation.jpg'} 
                  alt={meditation.title}
                  className="meditation-thumbnail"
                />
                <div className="meditation-duration">
                  {formatDuration(meditation.duration)}
                </div>
              </div>
              
              <div className="meditation-details">
                <h3 className="meditation-title">{meditation.title}</h3>
                <p className="meditation-creator">By {meditation.creator.name}</p>
                
                <div className="meditation-tags">
                  {meditation.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                
                <div className="meditation-indicators">
                  {checkIfFavorite(meditation.id) && (
                    <span className="indicator favorite" title="Favorite">★</span>
                  )}
                  {checkIfDownloaded(meditation.id) && (
                    <span className="indicator downloaded" title="Available Offline">↓</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MeditationLibrary;
