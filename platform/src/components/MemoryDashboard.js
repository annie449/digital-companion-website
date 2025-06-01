import React, { useContext, useState } from 'react';
import { DigitalCompanionContext } from '../context/DigitalCompanionContext';
import { MemoryRepositoryContext } from '../context/MemoryRepositoryContext';
import './MemoryDashboard.css';

function MemoryDashboard() {
  const { navigateTo } = useContext(DigitalCompanionContext);
  const { photos, documents, albums, memoryStories } = useContext(MemoryRepositoryContext);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get recent photos (up to 4)
  const recentPhotos = [...photos].sort((a, b) => 
    new Date(b.dateAdded) - new Date(a.dateAdded)
  ).slice(0, 4);
  
  // Get recent documents (up to 3)
  const recentDocuments = [...documents].sort((a, b) => 
    new Date(b.dateAdded) - new Date(a.dateAdded)
  ).slice(0, 3);
  
  // Get recent memory stories (up to 2)
  const recentStories = [...memoryStories].sort((a, b) => 
    new Date(b.dateCreated) - new Date(a.dateCreated)
  ).slice(0, 2);
  
  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigateTo(`memories/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  const handlePhotoClick = (photoId) => {
    navigateTo(`memories/photos/${photoId}`);
  };
  
  const handleDocumentClick = (documentId) => {
    navigateTo(`memories/documents/${documentId}`);
  };
  
  const handleStoryClick = (storyId) => {
    navigateTo(`memories/stories/${storyId}`);
  };
  
  const handleAlbumClick = (albumId) => {
    navigateTo(`memories/albums/${albumId}`);
  };
  
  const getDocumentIcon = (fileType) => {
    switch(fileType.toLowerCase()) {
      case 'pdf': return '📄';
      case 'doc':
      case 'docx': return '📝';
      case 'xls':
      case 'xlsx': return '📊';
      case 'jpg':
      case 'jpeg':
      case 'png': return '🖼️';
      default: return '📁';
    }
  };
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  return (
    <div className="memory-dashboard">
      <div className="memory-header">
        <h2>Memory Repository</h2>
        <div className="memory-search">
          <input
            type="text"
            placeholder="Search memories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="search-btn" onClick={handleSearch}>Search</button>
        </div>
      </div>
      
      <div className="memory-quick-actions">
        <button 
          className="action-btn photo-btn"
          onClick={() => navigateTo('memories/photos/upload')}
        >
          Upload Photos
        </button>
        <button 
          className="action-btn document-btn"
          onClick={() => navigateTo('memories/documents/upload')}
        >
          Upload Document
        </button>
        <button 
          className="action-btn story-btn"
          onClick={() => navigateTo('memories/stories/new')}
        >
          Write Memory
        </button>
        <button 
          className="action-btn album-btn"
          onClick={() => navigateTo('memories/albums/new')}
        >
          Create Album
        </button>
      </div>
      
      <div className="memory-sections">
        <div className="memory-section photos-section">
          <div className="section-header">
            <h3>Recent Photos</h3>
            <button 
              className="view-all-btn"
              onClick={() => navigateTo('memories/photos')}
            >
              View All
            </button>
          </div>
          
          {recentPhotos.length > 0 ? (
            <div className="photos-grid">
              {recentPhotos.map(photo => (
                <div 
                  key={photo.id} 
                  className="photo-thumbnail"
                  onClick={() => handlePhotoClick(photo.id)}
                >
                  <div 
                    className="photo-image" 
                    style={{ backgroundImage: `url(${photo.url})` }}
                  ></div>
                  <div className="photo-info">
                    <div className="photo-title">{photo.title}</div>
                    <div className="photo-date">{formatDate(photo.dateTaken || photo.dateAdded)}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-section">
              <p>No photos added yet</p>
              <button 
                className="add-btn"
                onClick={() => navigateTo('memories/photos/upload')}
              >
                Add Photos
              </button>
            </div>
          )}
        </div>
        
        <div className="memory-section documents-section">
          <div className="section-header">
            <h3>Important Documents</h3>
            <button 
              className="view-all-btn"
              onClick={() => navigateTo('memories/documents')}
            >
              View All
            </button>
          </div>
          
          {recentDocuments.length > 0 ? (
            <div className="documents-list">
              {recentDocuments.map(document => (
                <div 
                  key={document.id} 
                  className="document-item"
                  onClick={() => handleDocumentClick(document.id)}
                >
                  <div className="document-icon">
                    {getDocumentIcon(document.fileType)}
                  </div>
                  <div className="document-info">
                    <div className="document-title">{document.title}</div>
                    <div className="document-description">{truncateText(document.description, 60)}</div>
                    <div className="document-meta">
                      <span className="document-type">{document.fileType.toUpperCase()}</span>
                      <span className="document-date">{formatDate(document.dateAdded)}</span>
                    </div>
                  </div>
                  {document.isSecure && (
                    <div className="secure-badge">🔒</div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-section">
              <p>No documents added yet</p>
              <button 
                className="add-btn"
                onClick={() => navigateTo('memories/documents/upload')}
              >
                Add Documents
              </button>
            </div>
          )}
        </div>
        
        <div className="memory-section stories-section">
          <div className="section-header">
            <h3>Memory Stories</h3>
            <button 
              className="view-all-btn"
              onClick={() => navigateTo('memories/stories')}
            >
              View All
            </button>
          </div>
          
          {recentStories.length > 0 ? (
            <div className="stories-list">
              {recentStories.map(story => (
                <div 
                  key={story.id} 
                  className="story-card"
                  onClick={() => handleStoryClick(story.id)}
                >
                  <h4 className="story-title">{story.title}</h4>
                  <p className="story-excerpt">{truncateText(story.content, 150)}</p>
                  <div className="story-meta">
                    <span className="story-date">{formatDate(story.dateCreated)}</span>
                    {story.associatedPhotos.length > 0 && (
                      <span className="photo-count">{story.associatedPhotos.length} photo{story.associatedPhotos.length !== 1 ? 's' : ''}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-section">
              <p>No memory stories added yet</p>
              <button 
                className="add-btn"
                onClick={() => navigateTo('memories/stories/new')}
              >
                Write Memory
              </button>
            </div>
          )}
        </div>
        
        <div className="memory-section albums-section">
          <div className="section-header">
            <h3>Photo Albums</h3>
            <button 
              className="view-all-btn"
              onClick={() => navigateTo('memories/albums')}
            >
              View All
            </button>
          </div>
          
          {albums.length > 0 ? (
            <div className="albums-grid">
              {albums.slice(0, 4).map(album => {
                const coverPhoto = photos.find(photo => photo.id === album.coverPhotoId);
                return (
                  <div 
                    key={album.id} 
                    className="album-card"
                    onClick={() => handleAlbumClick(album.id)}
                  >
                    <div 
                      className="album-cover" 
                      style={{ backgroundImage: coverPhoto ? `url(${coverPhoto.url})` : 'none' }}
                    >
                      {!coverPhoto && <div className="no-cover">No Cover</div>}
                      <div className="album-photo-count">{album.photoCount} photo{album.photoCount !== 1 ? 's' : ''}</div>
                    </div>
                    <div className="album-info">
                      <div className="album-name">{album.name}</div>
                      <div className="album-description">{truncateText(album.description, 60)}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-section">
              <p>No albums created yet</p>
              <button 
                className="add-btn"
                onClick={() => navigateTo('memories/albums/new')}
              >
                Create Album
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MemoryDashboard;
