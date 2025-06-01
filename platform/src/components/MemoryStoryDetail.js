import React, { useContext, useState, useEffect } from 'react';
import { DigitalCompanionContext } from '../context/DigitalCompanionContext';
import { MemoryRepositoryContext } from '../context/MemoryRepositoryContext';
import './MemoryStoryDetail.js.css';

function MemoryStoryDetail({ storyId }) {
  const { navigateTo } = useContext(DigitalCompanionContext);
  const { 
    memoryStories, 
    photos, 
    documents, 
    updateMemoryStory, 
    deleteMemoryStory,
    shareMemoryItem
  } = useContext(MemoryRepositoryContext);
  
  const [story, setStory] = useState(null);
  const [storyPhotos, setStoryPhotos] = useState([]);
  const [storyDocuments, setStoryDocuments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedStory, setEditedStory] = useState(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  
  // Find story and related items
  useEffect(() => {
    const foundStory = memoryStories.find(s => s.id === storyId);
    
    if (foundStory) {
      setStory(foundStory);
      
      // Get associated photos
      if (foundStory.associatedPhotos && foundStory.associatedPhotos.length > 0) {
        const relatedPhotos = photos.filter(photo => 
          foundStory.associatedPhotos.includes(photo.id)
        );
        setStoryPhotos(relatedPhotos);
      }
      
      // Get associated documents
      if (foundStory.associatedDocuments && foundStory.associatedDocuments.length > 0) {
        const relatedDocs = documents.filter(doc => 
          foundStory.associatedDocuments.includes(doc.id)
        );
        setStoryDocuments(relatedDocs);
      }
    }
  }, [storyId, memoryStories, photos, documents]);
  
  // Initialize edit form when editing
  useEffect(() => {
    if (isEditing && story) {
      setEditedStory({
        title: story.title,
        content: story.content,
        tags: [...story.tags],
        isPrivate: story.isPrivate
      });
    }
  }, [isEditing, story]);
  
  const handleBack = () => {
    navigateTo('memories/stories');
  };
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedStory(null);
  };
  
  const handleSaveEdit = () => {
    if (!editedStory || !editedStory.title || !editedStory.content) return;
    
    updateMemoryStory(storyId, editedStory);
    setIsEditing(false);
    
    // Update local state to reflect changes
    setStory({
      ...story,
      ...editedStory
    });
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedStory({
      ...editedStory,
      [name]: value
    });
  };
  
  const handlePrivacyChange = (e) => {
    setEditedStory({
      ...editedStory,
      isPrivate: e.target.checked
    });
  };
  
  const handleTagsChange = (e) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString.split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    
    setEditedStory({
      ...editedStory,
      tags: tagsArray
    });
  };
  
  const handleShare = () => {
    setShareModalOpen(true);
  };
  
  const handleCloseShareModal = () => {
    setShareModalOpen(false);
  };
  
  const handleDelete = () => {
    setDeleteConfirmOpen(true);
  };
  
  const handleConfirmDelete = () => {
    deleteMemoryStory(storyId);
    navigateTo('memories/stories');
  };
  
  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false);
  };
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  if (!story) {
    return <div className="loading-story">Loading memory story...</div>;
  }
  
  return (
    <div className="memory-story-detail">
      <div className="story-actions">
        <button className="back-btn" onClick={handleBack}>
          ← Back to Stories
        </button>
        
        <div className="action-buttons">
          {!isEditing && (
            <>
              <button className="edit-btn" onClick={handleEdit}>
                Edit Story
              </button>
              <button className="share-btn" onClick={handleShare}>
                Share Story
              </button>
              <button className="delete-btn" onClick={handleDelete}>
                Delete
              </button>
            </>
          )}
        </div>
      </div>
      
      {isEditing ? (
        <div className="story-edit-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={editedStory.title}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="content">Story</label>
            <textarea
              id="content"
              name="content"
              value={editedStory.content}
              onChange={handleInputChange}
              rows="12"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="tags">Tags (comma separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={editedStory.tags.join(', ')}
              onChange={handleTagsChange}
            />
          </div>
          
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="isPrivate"
              name="isPrivate"
              checked={editedStory.isPrivate}
              onChange={handlePrivacyChange}
            />
            <label htmlFor="isPrivate">Private Story (only visible to you)</label>
          </div>
          
          <div className="form-actions">
            <button className="cancel-btn" onClick={handleCancelEdit}>
              Cancel
            </button>
            <button className="save-btn" onClick={handleSaveEdit}>
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <div className="story-content">
          <h1 className="story-title">{story.title}</h1>
          
          <div className="story-meta">
            <div className="story-date">
              Created: {formatDate(story.dateCreated)}
              {story.lastUpdated > story.dateCreated && 
                ` (Updated: ${formatDate(story.lastUpdated)})`}
            </div>
            
            {story.isPrivate && (
              <div className="privacy-badge">Private</div>
            )}
          </div>
          
          <div className="story-text">
            {story.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          
          {story.tags && story.tags.length > 0 && (
            <div className="story-tags">
              <h3>Tags</h3>
              <div className="tags-list">
                {story.tags.map(tag => (
                  <span key={tag} className="story-tag">{tag}</span>
                ))}
              </div>
            </div>
          )}
          
          {storyPhotos.length > 0 && (
            <div className="story-photos">
              <h3>Photos</h3>
              <div className="photos-grid">
                {storyPhotos.map(photo => (
                  <div 
                    key={photo.id} 
                    className="photo-thumbnail"
                    onClick={() => navigateTo(`memories/photos/${photo.id}`)}
                  >
                    <div 
                      className="photo-image" 
                      style={{ backgroundImage: `url(${photo.url})` }}
                    ></div>
                    <div className="photo-info">
                      <div className="photo-title">{photo.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {storyDocuments.length > 0 && (
            <div className="story-documents">
              <h3>Documents</h3>
              <div className="documents-list">
                {storyDocuments.map(document => (
                  <div 
                    key={document.id} 
                    className="document-item"
                    onClick={() => navigateTo(`memories/documents/${document.id}`)}
                  >
                    <div className="document-icon">
                      {document.fileType.toUpperCase()}
                    </div>
                    <div className="document-info">
                      <div className="document-title">{document.title}</div>
                      <div className="document-description">{document.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Share Modal */}
      {shareModalOpen && (
        <div className="modal-overlay">
          <div className="share-modal">
            <h3>Share Memory Story</h3>
            <p>This feature will allow you to share this memory with family members or trusted contacts.</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={handleCloseShareModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {deleteConfirmOpen && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <h3>Delete Memory Story</h3>
            <p>Are you sure you want to delete this memory story? This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={handleCancelDelete}>
                Cancel
              </button>
              <button className="delete-confirm-btn" onClick={handleConfirmDelete}>
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MemoryStoryDetail;
