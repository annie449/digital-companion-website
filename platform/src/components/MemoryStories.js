import React, { useContext, useState } from 'react';
import { DigitalCompanionContext } from '../context/DigitalCompanionContext';
import { MemoryRepositoryContext } from '../context/MemoryRepositoryContext';
import './MemoryStories.css';

function MemoryStories() {
  const { navigateTo } = useContext(DigitalCompanionContext);
  const { memoryStories, photos } = useContext(MemoryRepositoryContext);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStories, setFilteredStories] = useState(memoryStories);
  
  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      setFilteredStories(memoryStories);
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const filtered = memoryStories.filter(story => 
      (story.title && story.title.toLowerCase().includes(term)) ||
      (story.content && story.content.toLowerCase().includes(term)) ||
      (story.tags && story.tags.some(tag => tag.toLowerCase().includes(term)))
    );
    
    setFilteredStories(filtered);
  };
  
  const handleStoryClick = (storyId) => {
    navigateTo(`memories/stories/${storyId}`);
  };
  
  const handleCreateStoryClick = () => {
    navigateTo('memories/stories/new');
  };
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  const truncateText = (text, maxLength = 200) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  return (
    <div className="memory-stories">
      <div className="stories-header">
        <h2>Memory Stories</h2>
        <button 
          className="create-story-btn"
          onClick={handleCreateStoryClick}
        >
          Write New Memory
        </button>
      </div>
      
      <div className="stories-search">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search memories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-btn">Search</button>
        </form>
      </div>
      
      {filteredStories.length > 0 ? (
        <div className="stories-grid">
          {filteredStories.map(story => {
            // Find cover photo if available
            const coverPhoto = story.associatedPhotos.length > 0 
              ? photos.find(photo => photo.id === story.associatedPhotos[0])
              : null;
              
            return (
              <div 
                key={story.id} 
                className="story-card"
                onClick={() => handleStoryClick(story.id)}
              >
                {coverPhoto && (
                  <div 
                    className="story-cover" 
                    style={{ backgroundImage: `url(${coverPhoto.url})` }}
                  ></div>
                )}
                
                <div className="story-content">
                  <h3 className="story-title">{story.title}</h3>
                  <div className="story-date">{formatDate(story.dateCreated)}</div>
                  <p className="story-excerpt">{truncateText(story.content)}</p>
                  
                  <div className="story-meta">
                    {story.associatedPhotos.length > 0 && (
                      <span className="photo-count">
                        {story.associatedPhotos.length} photo{story.associatedPhotos.length !== 1 ? 's' : ''}
                      </span>
                    )}
                    
                    {story.associatedDocuments.length > 0 && (
                      <span className="document-count">
                        {story.associatedDocuments.length} document{story.associatedDocuments.length !== 1 ? 's' : ''}
                      </span>
                    )}
                    
                    {story.isPrivate && (
                      <span className="privacy-indicator">Private</span>
                    )}
                  </div>
                  
                  {story.tags && story.tags.length > 0 && (
                    <div className="story-tags">
                      {story.tags.map(tag => (
                        <span key={tag} className="story-tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="empty-stories">
          {searchTerm ? (
            <p>No memory stories match your search criteria.</p>
          ) : (
            <>
              <p>You haven't created any memory stories yet.</p>
              <button 
                className="create-story-btn large"
                onClick={handleCreateStoryClick}
              >
                Write Your First Memory
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default MemoryStories;
