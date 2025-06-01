import React, { useState, useEffect } from 'react';
import { useDigitalCompanionContext } from '../context/DigitalCompanionContext';
import { useSelfCareContext } from '../context/SelfCareContext';
import './ResourceLibrary.css';

/**
 * ResourceLibrary Component
 * 
 * A comprehensive collection of grief support resources including articles,
 * videos, books, podcasts, and downloadable materials.
 */
const ResourceLibrary = () => {
  const { user } = useDigitalCompanionContext();
  const { resources, saveResource, removeResource } = useSelfCareContext();
  
  // State management
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeFormat, setActiveFormat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState(null);
  const [showResourceDetail, setShowResourceDetail] = useState(false);
  const [savedResources, setSavedResources] = useState([]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  
  // Load saved resources
  useEffect(() => {
    if (user && user.savedResources) {
      setSavedResources(user.savedResources);
    }
  }, [user]);
  
  // Get filtered resources
  const getFilteredResources = () => {
    if (!resources) return [];
    
    let filtered = [...resources];
    
    // Filter by saved resources if enabled
    if (showSavedOnly) {
      filtered = filtered.filter(resource => 
        savedResources.includes(resource.id)
      );
    }
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(resource => 
        resource.category === activeCategory
      );
    }
    
    // Filter by format
    if (activeFormat !== 'all') {
      filtered = filtered.filter(resource => 
        resource.format === activeFormat
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
        resource.author?.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };
  
  // View resource details
  const viewResourceDetail = (resource) => {
    setSelectedResource(resource);
    setShowResourceDetail(true);
  };
  
  // Close resource details
  const closeResourceDetail = () => {
    setShowResourceDetail(false);
    setSelectedResource(null);
  };
  
  // Toggle save resource
  const toggleSaveResource = async (resourceId) => {
    try {
      const isSaved = savedResources.includes(resourceId);
      
      if (isSaved) {
        await removeResource(resourceId);
        setSavedResources(savedResources.filter(id => id !== resourceId));
      } else {
        await saveResource(resourceId);
        setSavedResources([...savedResources, resourceId]);
      }
    } catch (err) {
      console.error('Failed to update saved resource:', err);
    }
  };
  
  // Format publication date
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Get resource format icon
  const getFormatIcon = (format) => {
    switch (format) {
      case 'article':
        return 'article-icon';
      case 'video':
        return 'video-icon';
      case 'podcast':
        return 'podcast-icon';
      case 'book':
        return 'book-icon';
      case 'worksheet':
        return 'worksheet-icon';
      default:
        return 'resource-icon';
    }
  };
  
  // Render resource categories
  const renderCategories = () => {
    const categories = [
      { id: 'all', name: 'All Resources' },
      { id: 'grief-basics', name: 'Grief Basics' },
      { id: 'coping-strategies', name: 'Coping Strategies' },
      { id: 'self-care', name: 'Self-Care' },
      { id: 'supporting-others', name: 'Supporting Others' },
      { id: 'practical-matters', name: 'Practical Matters' },
      { id: 'special-circumstances', name: 'Special Circumstances' }
    ];
    
    return (
      <div className="resource-categories">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    );
  };
  
  // Render format filters
  const renderFormatFilters = () => {
    const formats = [
      { id: 'all', name: 'All Formats' },
      { id: 'article', name: 'Articles' },
      { id: 'video', name: 'Videos' },
      { id: 'podcast', name: 'Podcasts' },
      { id: 'book', name: 'Books' },
      { id: 'worksheet', name: 'Worksheets' }
    ];
    
    return (
      <div className="format-filters">
        {formats.map(format => (
          <button
            key={format.id}
            className={`format-btn ${activeFormat === format.id ? 'active' : ''}`}
            onClick={() => setActiveFormat(format.id)}
          >
            <div className={`format-icon ${format.id}-icon`}></div>
            <span>{format.name}</span>
          </button>
        ))}
      </div>
    );
  };
  
  // Render resource list
  const renderResourceList = () => {
    const filteredResources = getFilteredResources();
    
    if (filteredResources.length === 0) {
      return (
        <div className="empty-resources">
          <div className="empty-icon"></div>
          <p>No resources match your current filters.</p>
          <button 
            className="reset-filters-btn"
            onClick={() => {
              setActiveCategory('all');
              setActiveFormat('all');
              setSearchQuery('');
              setShowSavedOnly(false);
            }}
          >
            Reset Filters
          </button>
        </div>
      );
    }
    
    return (
      <div className="resources-grid">
        {filteredResources.map(resource => (
          <div key={resource.id} className="resource-card">
            <div className="resource-format">
              <div className={`format-icon ${getFormatIcon(resource.format)}`}></div>
              <span>{resource.format}</span>
            </div>
            
            <h3 className="resource-title">{resource.title}</h3>
            
            {resource.author && (
              <div className="resource-author">By {resource.author}</div>
            )}
            
            <p className="resource-description">{resource.description}</p>
            
            <div className="resource-meta">
              {resource.publicationDate && (
                <div className="resource-date">
                  <div className="date-icon"></div>
                  <span>{formatDate(resource.publicationDate)}</span>
                </div>
              )}
              
              {resource.duration && (
                <div className="resource-duration">
                  <div className="duration-icon"></div>
                  <span>{resource.duration}</span>
                </div>
              )}
            </div>
            
            <div className="resource-actions">
              <button 
                className="view-resource-btn"
                onClick={() => viewResourceDetail(resource)}
              >
                View Details
              </button>
              
              <button 
                className={`save-resource-btn ${savedResources.includes(resource.id) ? 'saved' : ''}`}
                onClick={() => toggleSaveResource(resource.id)}
              >
                <div className={`save-icon ${savedResources.includes(resource.id) ? 'saved' : ''}`}></div>
                <span>{savedResources.includes(resource.id) ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  // Render resource detail
  const renderResourceDetail = () => {
    if (!selectedResource || !showResourceDetail) return null;
    
    return (
      <div className="modal-overlay">
        <div className="resource-detail-modal">
          <div className="modal-header">
            <h3>{selectedResource.title}</h3>
            <button 
              className="close-modal-btn"
              onClick={closeResourceDetail}
            >
              &times;
            </button>
          </div>
          
          <div className="modal-content">
            <div className="resource-detail-format">
              <div className={`format-icon large ${getFormatIcon(selectedResource.format)}`}></div>
              <span>{selectedResource.format}</span>
            </div>
            
            {selectedResource.author && (
              <div className="resource-detail-section">
                <h4>Author</h4>
                <p>{selectedResource.author}</p>
              </div>
            )}
            
            <div className="resource-detail-section">
              <h4>Description</h4>
              <p>{selectedResource.description}</p>
            </div>
            
            {selectedResource.content && (
              <div className="resource-detail-section">
                <h4>Content Preview</h4>
                <div className="content-preview">
                  {selectedResource.content}
                </div>
              </div>
            )}
            
            <div className="resource-detail-meta">
              {selectedResource.publicationDate && (
                <div className="detail-meta-item">
                  <h4>Published</h4>
                  <p>{formatDate(selectedResource.publicationDate)}</p>
                </div>
              )}
              
              {selectedResource.duration && (
                <div className="detail-meta-item">
                  <h4>Duration</h4>
                  <p>{selectedResource.duration}</p>
                </div>
              )}
              
              {selectedResource.source && (
                <div className="detail-meta-item">
                  <h4>Source</h4>
                  <p>{selectedResource.source}</p>
                </div>
              )}
            </div>
            
            {selectedResource.tags && selectedResource.tags.length > 0 && (
              <div className="resource-detail-section">
                <h4>Tags</h4>
                <div className="resource-tags">
                  {selectedResource.tags.map((tag, index) => (
                    <span key={index} className="resource-tag">{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="modal-footer">
            <button 
              className={`save-resource-btn large ${savedResources.includes(selectedResource.id) ? 'saved' : ''}`}
              onClick={() => toggleSaveResource(selectedResource.id)}
            >
              <div className={`save-icon ${savedResources.includes(selectedResource.id) ? 'saved' : ''}`}></div>
              <span>{savedResources.includes(selectedResource.id) ? 'Saved' : 'Save Resource'}</span>
            </button>
            
            {selectedResource.url && (
              <a 
                href={selectedResource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="access-resource-btn"
              >
                Access Resource
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="resource-library">
      <div className="library-header">
        <h2>Resource Library</h2>
        <p>Explore our collection of grief support resources</p>
      </div>
      
      <div className="library-filters">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button 
            className="search-btn"
            onClick={() => {/* Search is already reactive */}}
          >
            <div className="search-icon"></div>
          </button>
        </div>
        
        <div className="saved-filter">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={showSavedOnly}
              onChange={(e) => setShowSavedOnly(e.target.checked)}
            />
            Show saved resources only
          </label>
        </div>
      </div>
      
      {renderCategories()}
      {renderFormatFilters()}
      {renderResourceList()}
      {renderResourceDetail()}
    </div>
  );
};

export default ResourceLibrary;
