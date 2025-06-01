import React, { useContext, useState } from 'react';
import { DigitalCompanionContext } from '../context/DigitalCompanionContext';
import { MemoryRepositoryContext } from '../context/MemoryRepositoryContext';
import './DocumentLibrary.css';

function DocumentLibrary() {
  const { navigateTo } = useContext(DigitalCompanionContext);
  const { documents, getDocumentsByCategory, getDocumentsByTag } = useContext(MemoryRepositoryContext);
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDocuments, setFilteredDocuments] = useState(documents);
  const [selectedTag, setSelectedTag] = useState('');
  
  // Document categories
  const categories = [
    { id: 'all', label: 'All Documents' },
    { id: 'legal', label: 'Legal' },
    { id: 'financial', label: 'Financial' },
    { id: 'personal', label: 'Personal' },
    { id: 'medical', label: 'Medical' },
    { id: 'other', label: 'Other' }
  ];
  
  // Get all unique tags from documents
  const allTags = [...new Set(documents.flatMap(doc => doc.tags || []))];
  
  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setSelectedTag('');
    
    if (category === 'all') {
      filterDocuments(documents, searchTerm);
    } else {
      const categoryDocs = getDocumentsByCategory(category);
      filterDocuments(categoryDocs, searchTerm);
    }
  };
  
  // Handle tag selection
  const handleTagChange = (e) => {
    const tag = e.target.value;
    setSelectedTag(tag);
    
    if (!tag) {
      handleCategoryChange(activeCategory);
    } else {
      const tagDocs = getDocumentsByTag(tag);
      filterDocuments(tagDocs, searchTerm);
    }
  };
  
  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    
    let docsToFilter;
    if (selectedTag) {
      docsToFilter = getDocumentsByTag(selectedTag);
    } else if (activeCategory !== 'all') {
      docsToFilter = getDocumentsByCategory(activeCategory);
    } else {
      docsToFilter = documents;
    }
    
    filterDocuments(docsToFilter, searchTerm);
  };
  
  // Filter documents based on search term
  const filterDocuments = (docs, term) => {
    if (!term) {
      setFilteredDocuments(docs);
      return;
    }
    
    const lowerTerm = term.toLowerCase();
    const filtered = docs.filter(doc => 
      (doc.title && doc.title.toLowerCase().includes(lowerTerm)) ||
      (doc.description && doc.description.toLowerCase().includes(lowerTerm)) ||
      (doc.tags && doc.tags.some(tag => tag.toLowerCase().includes(lowerTerm)))
    );
    
    setFilteredDocuments(filtered);
  };
  
  const handleDocumentClick = (documentId) => {
    navigateTo(`memories/documents/${documentId}`);
  };
  
  const handleUploadClick = () => {
    navigateTo('memories/documents/upload');
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
  
  return (
    <div className="document-library">
      <div className="library-header">
        <h2>Document Library</h2>
        <button 
          className="upload-btn"
          onClick={handleUploadClick}
        >
          Upload Document
        </button>
      </div>
      
      <div className="library-filters">
        <div className="category-tabs">
          {categories.map(category => (
            <button 
              key={category.id}
              className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        <div className="filter-controls">
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-btn">Search</button>
          </form>
          
          <select 
            className="tag-select"
            value={selectedTag}
            onChange={handleTagChange}
          >
            <option value="">Filter by Tag</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>
      
      {filteredDocuments.length > 0 ? (
        <div className="documents-grid">
          {filteredDocuments.map(document => (
            <div 
              key={document.id} 
              className="document-card"
              onClick={() => handleDocumentClick(document.id)}
            >
              <div className="document-header">
                <div className="document-icon">
                  {getDocumentIcon(document.fileType)}
                </div>
                <div className="document-type">{document.fileType.toUpperCase()}</div>
                {document.isSecure && (
                  <div className="secure-badge">🔒</div>
                )}
              </div>
              
              <div className="document-info">
                <h3 className="document-title">{document.title}</h3>
                <p className="document-description">{document.description}</p>
                
                <div className="document-meta">
                  <span className="document-date">Added: {formatDate(document.dateAdded)}</span>
                  <span className="document-category">{document.category}</span>
                </div>
                
                {document.tags && document.tags.length > 0 && (
                  <div className="document-tags">
                    {document.tags.map(tag => (
                      <span key={tag} className="document-tag">{tag}</span>
                    ))}
                  </div>
                )}
                
                {document.isPrivate && (
                  <div className="privacy-indicator">Private Document</div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-library">
          {searchTerm || selectedTag || activeCategory !== 'all' ? (
            <p>No documents match your search criteria.</p>
          ) : (
            <>
              <p>Your document library is empty.</p>
              <button 
                className="upload-btn large"
                onClick={handleUploadClick}
              >
                Upload Your First Document
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default DocumentLibrary;
