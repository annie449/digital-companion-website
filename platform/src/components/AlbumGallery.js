import React, { useContext, useState, useEffect } from 'react';
import { DigitalCompanionContext } from '../context/DigitalCompanionContext';
import { MemoryRepositoryContext } from '../context/MemoryRepositoryContext';
import './AlbumGallery.css';

function AlbumGallery() {
  const { navigateTo } = useContext(DigitalCompanionContext);
  const { albums, photos } = useContext(MemoryRepositoryContext);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAlbums, setFilteredAlbums] = useState(albums);
  
  // Apply search filter
  useEffect(() => {
    if (!searchTerm) {
      setFilteredAlbums(albums);
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const filtered = albums.filter(album => 
      (album.name && album.name.toLowerCase().includes(term)) ||
      (album.description && album.description.toLowerCase().includes(term))
    );
    
    setFilteredAlbums(filtered);
  }, [albums, searchTerm]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Search is already applied via useEffect
  };
  
  const handleAlbumClick = (albumId) => {
    navigateTo(`memories/albums/${albumId}`);
  };
  
  const handleCreateAlbumClick = () => {
    navigateTo('memories/albums/new');
  };
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  return (
    <div className="album-gallery">
      <div className="gallery-header">
        <h2>Photo Albums</h2>
        <button 
          className="create-album-btn"
          onClick={handleCreateAlbumClick}
        >
          Create New Album
        </button>
      </div>
      
      <div className="gallery-search">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search albums..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>
      
      {filteredAlbums.length > 0 ? (
        <div className="albums-grid">
          {filteredAlbums.map(album => {
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
                  <h3 className="album-name">{album.name}</h3>
                  <p className="album-description">{album.description}</p>
                  <div className="album-meta">
                    <span className="album-created">Created: {formatDate(album.dateCreated)}</span>
                    <span className="album-updated">Updated: {formatDate(album.lastUpdated)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="empty-albums">
          {searchTerm ? (
            <p>No albums match your search criteria.</p>
          ) : (
            <>
              <p>You haven't created any albums yet.</p>
              <button 
                className="create-album-btn large"
                onClick={handleCreateAlbumClick}
              >
                Create Your First Album
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default AlbumGallery;
