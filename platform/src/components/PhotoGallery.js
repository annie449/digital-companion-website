import React, { useContext, useState, useEffect } from 'react';
import { DigitalCompanionContext } from '../context/DigitalCompanionContext';
import { MemoryRepositoryContext } from '../context/MemoryRepositoryContext';
import './PhotoGallery.css';

function PhotoGallery() {
  const { navigateTo } = useContext(DigitalCompanionContext);
  const { photos, albums, getPhotosByAlbum, getPhotosByTag } = useContext(MemoryRepositoryContext);
  
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlbum, setSelectedAlbum] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  
  // Get all unique tags from photos
  const allTags = [...new Set(photos.flatMap(photo => photo.tags || []))];
  
  // Apply filters and search
  useEffect(() => {
    let result = [...photos];
    
    // Filter by album if selected
    if (selectedAlbum) {
      result = getPhotosByAlbum(selectedAlbum);
    }
    
    // Filter by tag if selected
    if (selectedTag) {
      result = getPhotosByTag(selectedTag);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(photo => 
        (photo.title && photo.title.toLowerCase().includes(term)) ||
        (photo.description && photo.description.toLowerCase().includes(term)) ||
        (photo.tags && photo.tags.some(tag => tag.toLowerCase().includes(term)))
      );
    }
    
    // Apply date filter
    if (activeFilter === 'recent') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      result = result.filter(photo => new Date(photo.dateAdded) >= thirtyDaysAgo);
    }
    
    // Sort by date (newest first)
    result.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    
    setFilteredPhotos(result);
  }, [photos, activeFilter, searchTerm, selectedAlbum, selectedTag, getPhotosByAlbum, getPhotosByTag]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Search is already applied via useEffect
  };
  
  const handlePhotoClick = (photoId) => {
    navigateTo(`memories/photos/${photoId}`);
  };
  
  const handleUploadClick = () => {
    navigateTo('memories/photos/upload');
  };
  
  const handleAlbumChange = (e) => {
    const albumName = e.target.value;
    setSelectedAlbum(albumName);
    setSelectedTag(''); // Reset tag filter when album is selected
  };
  
  const handleTagChange = (e) => {
    const tag = e.target.value;
    setSelectedTag(tag);
    setSelectedAlbum(''); // Reset album filter when tag is selected
  };
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  return (
    <div className="photo-gallery">
      <div className="gallery-header">
        <h2>Photo Gallery</h2>
        <button 
          className="upload-btn"
          onClick={handleUploadClick}
        >
          Upload Photos
        </button>
      </div>
      
      <div className="gallery-filters">
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Photos
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'recent' ? 'active' : ''}`}
            onClick={() => setActiveFilter('recent')}
          >
            Recent (30 days)
          </button>
        </div>
        
        <div className="filter-controls">
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search photos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
          
          <select 
            className="album-select"
            value={selectedAlbum}
            onChange={handleAlbumChange}
            disabled={selectedTag !== ''}
          >
            <option value="">All Albums</option>
            {albums.map(album => (
              <option key={album.id} value={album.name}>{album.name}</option>
            ))}
          </select>
          
          <select 
            className="tag-select"
            value={selectedTag}
            onChange={handleTagChange}
            disabled={selectedAlbum !== ''}
          >
            <option value="">All Tags</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>
      
      {filteredPhotos.length > 0 ? (
        <div className="photos-masonry">
          {filteredPhotos.map(photo => (
            <div 
              key={photo.id} 
              className="photo-item"
              onClick={() => handlePhotoClick(photo.id)}
            >
              <div 
                className="photo-image" 
                style={{ backgroundImage: `url(${photo.url})` }}
              >
                {photo.isPrivate && (
                  <div className="private-badge">Private</div>
                )}
              </div>
              <div className="photo-details">
                <h3 className="photo-title">{photo.title}</h3>
                <p className="photo-description">{photo.description}</p>
                <div className="photo-meta">
                  <span className="photo-date">{formatDate(photo.dateTaken || photo.dateAdded)}</span>
                  {photo.albums && photo.albums.length > 0 && (
                    <span className="photo-albums">
                      {photo.albums.slice(0, 2).join(', ')}
                      {photo.albums.length > 2 ? '...' : ''}
                    </span>
                  )}
                </div>
                {photo.tags && photo.tags.length > 0 && (
                  <div className="photo-tags">
                    {photo.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="photo-tag">{tag}</span>
                    ))}
                    {photo.tags.length > 3 && (
                      <span className="more-tags">+{photo.tags.length - 3}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-gallery">
          {searchTerm || selectedAlbum || selectedTag ? (
            <p>No photos match your search criteria.</p>
          ) : (
            <>
              <p>Your photo gallery is empty.</p>
              <button 
                className="upload-btn large"
                onClick={handleUploadClick}
              >
                Upload Your First Photos
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default PhotoGallery;
