import React, { createContext, useState, useEffect } from 'react';

// Create the Memory Repository Context
export const MemoryRepositoryContext = createContext();

// Create the Memory Repository Provider Component
export const MemoryRepositoryProvider = ({ children }) => {
  // Photos state
  const [photos, setPhotos] = useState([
    {
      id: 'photo-001',
      title: 'Family Gathering',
      description: 'Summer reunion at the lake house',
      url: '/images/memories/family-gathering.jpg',
      dateAdded: new Date(2024, 6, 15),
      dateTaken: new Date(2024, 6, 10),
      tags: ['family', 'summer', 'lake house'],
      albums: ['Family', 'Summer 2024'],
      sharedWith: [],
      isPrivate: true
    },
    {
      id: 'photo-002',
      title: 'Dad\'s Birthday',
      description: 'Celebration at his favorite restaurant',
      url: '/images/memories/birthday-celebration.jpg',
      dateAdded: new Date(2024, 3, 22),
      dateTaken: new Date(2024, 3, 20),
      tags: ['birthday', 'celebration', 'dad'],
      albums: ['Family', 'Celebrations'],
      sharedWith: ['user-002', 'user-003'],
      isPrivate: false
    },
    {
      id: 'photo-003',
      title: 'Garden in Bloom',
      description: 'Mom\'s garden at its peak in spring',
      url: '/images/memories/garden-bloom.jpg',
      dateAdded: new Date(2024, 4, 5),
      dateTaken: new Date(2024, 4, 5),
      tags: ['garden', 'spring', 'flowers'],
      albums: ['Home', 'Nature'],
      sharedWith: [],
      isPrivate: true
    }
  ]);
  
  // Documents state
  const [documents, setDocuments] = useState([
    {
      id: 'doc-001',
      title: 'Will and Testament',
      description: 'Final legal document',
      fileType: 'pdf',
      url: '/documents/will-and-testament.pdf',
      dateAdded: new Date(2024, 5, 10),
      category: 'legal',
      tags: ['legal', 'will', 'important'],
      sharedWith: [],
      isPrivate: true,
      isSecure: true
    },
    {
      id: 'doc-002',
      title: 'Life Insurance Policy',
      description: 'Policy details and beneficiary information',
      fileType: 'pdf',
      url: '/documents/life-insurance-policy.pdf',
      dateAdded: new Date(2024, 4, 15),
      category: 'financial',
      tags: ['insurance', 'financial', 'important'],
      sharedWith: ['user-002'],
      isPrivate: true,
      isSecure: true
    },
    {
      id: 'doc-003',
      title: 'Family Recipe Collection',
      description: 'Handwritten recipes passed down through generations',
      fileType: 'pdf',
      url: '/documents/family-recipes.pdf',
      dateAdded: new Date(2024, 2, 20),
      category: 'personal',
      tags: ['recipes', 'family', 'tradition'],
      sharedWith: ['user-002', 'user-003', 'user-004'],
      isPrivate: false,
      isSecure: false
    }
  ]);
  
  // Albums state
  const [albums, setAlbums] = useState([
    {
      id: 'album-001',
      name: 'Family',
      description: 'Family photos and memories',
      coverPhotoId: 'photo-001',
      dateCreated: new Date(2024, 6, 15),
      lastUpdated: new Date(2024, 6, 15),
      photoCount: 2
    },
    {
      id: 'album-002',
      name: 'Celebrations',
      description: 'Special occasions and celebrations',
      coverPhotoId: 'photo-002',
      dateCreated: new Date(2024, 3, 22),
      lastUpdated: new Date(2024, 3, 22),
      photoCount: 1
    },
    {
      id: 'album-003',
      name: 'Home',
      description: 'Memories of home',
      coverPhotoId: 'photo-003',
      dateCreated: new Date(2024, 4, 5),
      lastUpdated: new Date(2024, 4, 5),
      photoCount: 1
    },
    {
      id: 'album-004',
      name: 'Nature',
      description: 'Beautiful natural scenes',
      coverPhotoId: 'photo-003',
      dateCreated: new Date(2024, 4, 5),
      lastUpdated: new Date(2024, 4, 5),
      photoCount: 1
    },
    {
      id: 'album-005',
      name: 'Summer 2024',
      description: 'Summer memories from 2024',
      coverPhotoId: 'photo-001',
      dateCreated: new Date(2024, 6, 15),
      lastUpdated: new Date(2024, 6, 15),
      photoCount: 1
    }
  ]);
  
  // Memory stories state
  const [memoryStories, setMemoryStories] = useState([
    {
      id: 'story-001',
      title: 'Summer at the Lake House',
      content: 'Every summer, our family would gather at the lake house for two weeks of swimming, fishing, and evening bonfires. Dad would always wake up early to make his famous pancakes for everyone...',
      dateCreated: new Date(2024, 6, 20),
      lastUpdated: new Date(2024, 6, 20),
      associatedPhotos: ['photo-001'],
      associatedDocuments: [],
      tags: ['family', 'summer', 'traditions', 'lake house'],
      sharedWith: [],
      isPrivate: true
    },
    {
      id: 'story-002',
      title: 'Mom\'s Garden',
      content: 'Mom spent countless hours in her garden, nurturing every plant with care and attention. She knew the name of every flower and would tell stories about each one as if they were old friends...',
      dateCreated: new Date(2024, 4, 10),
      lastUpdated: new Date(2024, 4, 15),
      associatedPhotos: ['photo-003'],
      associatedDocuments: ['doc-003'],
      tags: ['mom', 'garden', 'flowers', 'memories'],
      sharedWith: ['user-002', 'user-003'],
      isPrivate: false
    }
  ]);
  
  // Add a new photo
  const addPhoto = (photoData) => {
    const newPhoto = {
      id: `photo-${Date.now()}`,
      dateAdded: new Date(),
      ...photoData
    };
    
    setPhotos([newPhoto, ...photos]);
    
    // Update album photo counts
    if (newPhoto.albums && newPhoto.albums.length > 0) {
      updateAlbumPhotoCounts(newPhoto.albums, 1);
    }
    
    return newPhoto;
  };
  
  // Update a photo
  const updatePhoto = (photoId, photoData) => {
    const photoToUpdate = photos.find(photo => photo.id === photoId);
    
    if (!photoToUpdate) return null;
    
    // Check if albums have changed to update counts
    const oldAlbums = photoToUpdate.albums || [];
    const newAlbums = photoData.albums || [];
    
    // Albums to decrement count
    const removedAlbums = oldAlbums.filter(album => !newAlbums.includes(album));
    if (removedAlbums.length > 0) {
      updateAlbumPhotoCounts(removedAlbums, -1);
    }
    
    // Albums to increment count
    const addedAlbums = newAlbums.filter(album => !oldAlbums.includes(album));
    if (addedAlbums.length > 0) {
      updateAlbumPhotoCounts(addedAlbums, 1);
    }
    
    const updatedPhoto = {
      ...photoToUpdate,
      ...photoData,
      lastUpdated: new Date()
    };
    
    setPhotos(photos.map(photo => 
      photo.id === photoId ? updatedPhoto : photo
    ));
    
    return updatedPhoto;
  };
  
  // Delete a photo
  const deletePhoto = (photoId) => {
    const photoToDelete = photos.find(photo => photo.id === photoId);
    
    if (!photoToDelete) return false;
    
    // Update album photo counts
    if (photoToDelete.albums && photoToDelete.albums.length > 0) {
      updateAlbumPhotoCounts(photoToDelete.albums, -1);
    }
    
    // Remove photo from memory stories
    memoryStories.forEach(story => {
      if (story.associatedPhotos.includes(photoId)) {
        const updatedPhotos = story.associatedPhotos.filter(id => id !== photoId);
        updateMemoryStory(story.id, { associatedPhotos: updatedPhotos });
      }
    });
    
    setPhotos(photos.filter(photo => photo.id !== photoId));
    return true;
  };
  
  // Add a new document
  const addDocument = (documentData) => {
    const newDocument = {
      id: `doc-${Date.now()}`,
      dateAdded: new Date(),
      ...documentData
    };
    
    setDocuments([newDocument, ...documents]);
    return newDocument;
  };
  
  // Update a document
  const updateDocument = (documentId, documentData) => {
    const documentToUpdate = documents.find(doc => doc.id === documentId);
    
    if (!documentToUpdate) return null;
    
    const updatedDocument = {
      ...documentToUpdate,
      ...documentData,
      lastUpdated: new Date()
    };
    
    setDocuments(documents.map(doc => 
      doc.id === documentId ? updatedDocument : doc
    ));
    
    return updatedDocument;
  };
  
  // Delete a document
  const deleteDocument = (documentId) => {
    const documentToDelete = documents.find(doc => doc.id === documentId);
    
    if (!documentToDelete) return false;
    
    // Remove document from memory stories
    memoryStories.forEach(story => {
      if (story.associatedDocuments.includes(documentId)) {
        const updatedDocs = story.associatedDocuments.filter(id => id !== documentId);
        updateMemoryStory(story.id, { associatedDocuments: updatedDocs });
      }
    });
    
    setDocuments(documents.filter(doc => doc.id !== documentId));
    return true;
  };
  
  // Create a new album
  const createAlbum = (albumData) => {
    const newAlbum = {
      id: `album-${Date.now()}`,
      dateCreated: new Date(),
      lastUpdated: new Date(),
      photoCount: 0,
      ...albumData
    };
    
    setAlbums([...albums, newAlbum]);
    return newAlbum;
  };
  
  // Update an album
  const updateAlbum = (albumId, albumData) => {
    const albumToUpdate = albums.find(album => album.id === albumId);
    
    if (!albumToUpdate) return null;
    
    const updatedAlbum = {
      ...albumToUpdate,
      ...albumData,
      lastUpdated: new Date()
    };
    
    setAlbums(albums.map(album => 
      album.id === albumId ? updatedAlbum : album
    ));
    
    // If album name changed, update all photos with this album
    if (albumData.name && albumData.name !== albumToUpdate.name) {
      updatePhotosWithAlbumNameChange(albumToUpdate.name, albumData.name);
    }
    
    return updatedAlbum;
  };
  
  // Delete an album
  const deleteAlbum = (albumId) => {
    const albumToDelete = albums.find(album => album.id === albumId);
    
    if (!albumToDelete) return false;
    
    // Remove album from all photos
    removeAlbumFromPhotos(albumToDelete.name);
    
    setAlbums(albums.filter(album => album.id !== albumId));
    return true;
  };
  
  // Update album photo counts
  const updateAlbumPhotoCounts = (albumNames, change) => {
    setAlbums(albums.map(album => {
      if (albumNames.includes(album.name)) {
        return {
          ...album,
          photoCount: Math.max(0, album.photoCount + change),
          lastUpdated: new Date()
        };
      }
      return album;
    }));
  };
  
  // Update photos when album name changes
  const updatePhotosWithAlbumNameChange = (oldName, newName) => {
    setPhotos(photos.map(photo => {
      if (photo.albums && photo.albums.includes(oldName)) {
        const updatedAlbums = photo.albums.map(album => 
          album === oldName ? newName : album
        );
        return { ...photo, albums: updatedAlbums };
      }
      return photo;
    }));
  };
  
  // Remove album from all photos
  const removeAlbumFromPhotos = (albumName) => {
    setPhotos(photos.map(photo => {
      if (photo.albums && photo.albums.includes(albumName)) {
        const updatedAlbums = photo.albums.filter(album => album !== albumName);
        return { ...photo, albums: updatedAlbums };
      }
      return photo;
    }));
  };
  
  // Create a new memory story
  const createMemoryStory = (storyData) => {
    const newStory = {
      id: `story-${Date.now()}`,
      dateCreated: new Date(),
      lastUpdated: new Date(),
      associatedPhotos: [],
      associatedDocuments: [],
      ...storyData
    };
    
    setMemoryStories([...memoryStories, newStory]);
    return newStory;
  };
  
  // Update a memory story
  const updateMemoryStory = (storyId, storyData) => {
    const storyToUpdate = memoryStories.find(story => story.id === storyId);
    
    if (!storyToUpdate) return null;
    
    const updatedStory = {
      ...storyToUpdate,
      ...storyData,
      lastUpdated: new Date()
    };
    
    setMemoryStories(memoryStories.map(story => 
      story.id === storyId ? updatedStory : story
    ));
    
    return updatedStory;
  };
  
  // Delete a memory story
  const deleteMemoryStory = (storyId) => {
    const storyToDelete = memoryStories.find(story => story.id === storyId);
    
    if (!storyToDelete) return false;
    
    setMemoryStories(memoryStories.filter(story => story.id !== storyId));
    return true;
  };
  
  // Get photos by album
  const getPhotosByAlbum = (albumName) => {
    return photos.filter(photo => 
      photo.albums && photo.albums.includes(albumName)
    );
  };
  
  // Get photos by tag
  const getPhotosByTag = (tag) => {
    return photos.filter(photo => 
      photo.tags && photo.tags.includes(tag)
    );
  };
  
  // Get documents by category
  const getDocumentsByCategory = (category) => {
    return documents.filter(doc => doc.category === category);
  };
  
  // Get documents by tag
  const getDocumentsByTag = (tag) => {
    return documents.filter(doc => 
      doc.tags && doc.tags.includes(tag)
    );
  };
  
  // Search all memory items
  const searchMemories = (searchTerm) => {
    const term = searchTerm.toLowerCase();
    
    const matchedPhotos = photos.filter(photo => 
      (photo.title && photo.title.toLowerCase().includes(term)) ||
      (photo.description && photo.description.toLowerCase().includes(term)) ||
      (photo.tags && photo.tags.some(tag => tag.toLowerCase().includes(term)))
    );
    
    const matchedDocuments = documents.filter(doc => 
      (doc.title && doc.title.toLowerCase().includes(term)) ||
      (doc.description && doc.description.toLowerCase().includes(term)) ||
      (doc.tags && doc.tags.some(tag => tag.toLowerCase().includes(term)))
    );
    
    const matchedStories = memoryStories.filter(story => 
      (story.title && story.title.toLowerCase().includes(term)) ||
      (story.content && story.content.toLowerCase().includes(term)) ||
      (story.tags && story.tags.some(tag => tag.toLowerCase().includes(term)))
    );
    
    return {
      photos: matchedPhotos,
      documents: matchedDocuments,
      stories: matchedStories
    };
  };
  
  // Share a memory item
  const shareMemoryItem = (itemType, itemId, userIds) => {
    switch (itemType) {
      case 'photo':
        return updatePhoto(itemId, { 
          sharedWith: userIds,
          isPrivate: userIds.length === 0
        });
      case 'document':
        return updateDocument(itemId, { 
          sharedWith: userIds,
          isPrivate: userIds.length === 0
        });
      case 'story':
        return updateMemoryStory(itemId, { 
          sharedWith: userIds,
          isPrivate: userIds.length === 0
        });
      default:
        return null;
    }
  };
  
  // Context value
  const contextValue = {
    // State
    photos,
    documents,
    albums,
    memoryStories,
    
    // Photo functions
    addPhoto,
    updatePhoto,
    deletePhoto,
    
    // Document functions
    addDocument,
    updateDocument,
    deleteDocument,
    
    // Album functions
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getPhotosByAlbum,
    
    // Memory story functions
    createMemoryStory,
    updateMemoryStory,
    deleteMemoryStory,
    
    // Search and filter functions
    getPhotosByTag,
    getDocumentsByCategory,
    getDocumentsByTag,
    searchMemories,
    
    // Sharing functions
    shareMemoryItem
  };
  
  return (
    <MemoryRepositoryContext.Provider value={contextValue}>
      {children}
    </MemoryRepositoryContext.Provider>
  );
};

export default MemoryRepositoryProvider;
