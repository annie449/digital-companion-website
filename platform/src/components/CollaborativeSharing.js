import React, { useState, useEffect } from 'react';
import { useDigitalCompanionContext } from '../context/DigitalCompanionContext';
import './CollaborativeSharing.css';

/**
 * CollaborativeSharing Component
 * 
 * A feature that allows users to share tasks, documents, and other resources
 * with trusted contacts, enabling collaborative management of affairs.
 */
const CollaborativeSharing = () => {
  const { user, contacts, sharedItems, shareItem, updateSharing, removeSharing } = useDigitalCompanionContext();
  
  // State management
  const [activeTab, setActiveTab] = useState('shared');
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [permissionLevel, setPermissionLevel] = useState('view');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Filter contacts based on search query
  useEffect(() => {
    if (contacts) {
      const filtered = contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredContacts(filtered);
    }
  }, [contacts, searchQuery]);
  
  // Open share modal for an item
  const openShareModal = (item) => {
    setSelectedItem(item);
    
    // Pre-select contacts who already have access
    if (item.shared && item.shared.length > 0) {
      const existingShares = item.shared.map(share => share.contactId);
      setSelectedContacts(existingShares);
      
      // Set permission level to the most permissive existing level
      if (item.shared.some(share => share.permission === 'edit')) {
        setPermissionLevel('edit');
      } else {
        setPermissionLevel('view');
      }
    } else {
      setSelectedContacts([]);
      setPermissionLevel('view');
    }
    
    setMessage('');
    setShowShareModal(true);
  };
  
  // Close share modal
  const closeShareModal = () => {
    setShowShareModal(false);
    setSelectedItem(null);
    setSelectedContacts([]);
    setPermissionLevel('view');
    setMessage('');
    setError(null);
    setSuccess(null);
  };
  
  // Toggle contact selection
  const toggleContactSelection = (contactId) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter(id => id !== contactId));
    } else {
      setSelectedContacts([...selectedContacts, contactId]);
    }
  };
  
  // Handle share submission
  const handleShare = async () => {
    if (selectedContacts.length === 0) {
      setError('Please select at least one contact to share with.');
      return;
    }
    
    try {
      // For each selected contact, share the item
      for (const contactId of selectedContacts) {
        await shareItem({
          itemId: selectedItem.id,
          itemType: selectedItem.type,
          contactId,
          permission: permissionLevel,
          message: message.trim() || null
        });
      }
      
      setSuccess('Item shared successfully!');
      
      // Close modal after a delay
      setTimeout(() => {
        closeShareModal();
      }, 2000);
    } catch (err) {
      setError('Failed to share item. Please try again.');
    }
  };
  
  // Update sharing permissions
  const updatePermission = async (shareId, newPermission) => {
    try {
      await updateSharing(shareId, { permission: newPermission });
      // Success would be handled by context update
    } catch (err) {
      setError('Failed to update permissions. Please try again.');
    }
  };
  
  // Remove sharing
  const removeAccess = async (shareId) => {
    if (window.confirm('Are you sure you want to remove access for this person?')) {
      try {
        await removeSharing(shareId);
        // Success would be handled by context update
      } catch (err) {
        setError('Failed to remove access. Please try again.');
      }
    }
  };
  
  // Get filtered items based on active tab
  const getFilteredItems = () => {
    if (!sharedItems) return [];
    
    if (activeTab === 'shared') {
      // Items I've shared with others
      return sharedItems.filter(item => item.ownerId === user?.id);
    } else {
      // Items shared with me
      return sharedItems.filter(item => item.ownerId !== user?.id);
    }
  };
  
  // Render contact list for sharing
  const renderContactList = () => {
    if (!filteredContacts || filteredContacts.length === 0) {
      return (
        <div className="empty-contacts">
          <p>No contacts found. Add contacts to share items.</p>
        </div>
      );
    }
    
    return (
      <div className="contact-list">
        {filteredContacts.map(contact => (
          <div 
            key={contact.id}
            className={`contact-item ${selectedContacts.includes(contact.id) ? 'selected' : ''}`}
            onClick={() => toggleContactSelection(contact.id)}
          >
            <div className="contact-avatar">
              {contact.name.charAt(0).toUpperCase()}
            </div>
            <div className="contact-info">
              <div className="contact-name">{contact.name}</div>
              <div className="contact-email">{contact.email}</div>
            </div>
            <div className="contact-checkbox">
              {selectedContacts.includes(contact.id) && (
                <div className="checkbox-checked"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  // Render share modal
  const renderShareModal = () => {
    if (!selectedItem) return null;
    
    return (
      <div className="modal-overlay">
        <div className="share-modal">
          <div className="modal-header">
            <h3>Share {selectedItem.type}</h3>
            <button 
              className="close-modal-btn"
              onClick={closeShareModal}
            >
              &times;
            </button>
          </div>
          
          <div className="modal-content">
            <div className="item-preview">
              <div className={`item-icon ${selectedItem.type}-icon`}></div>
              <div className="item-details">
                <div className="item-name">{selectedItem.name}</div>
                <div className="item-type">{selectedItem.type}</div>
              </div>
            </div>
            
            <div className="search-contacts">
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {renderContactList()}
            
            {selectedContacts.length > 0 && (
              <>
                <div className="permission-selector">
                  <h4>Permission Level</h4>
                  <div className="permission-options">
                    <label className={`permission-option ${permissionLevel === 'view' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="permission"
                        value="view"
                        checked={permissionLevel === 'view'}
                        onChange={() => setPermissionLevel('view')}
                      />
                      <div className="permission-icon view-icon"></div>
                      <div className="permission-details">
                        <div className="permission-name">View Only</div>
                        <div className="permission-description">Can view but not edit</div>
                      </div>
                    </label>
                    
                    <label className={`permission-option ${permissionLevel === 'edit' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="permission"
                        value="edit"
                        checked={permissionLevel === 'edit'}
                        onChange={() => setPermissionLevel('edit')}
                      />
                      <div className="permission-icon edit-icon"></div>
                      <div className="permission-details">
                        <div className="permission-name">Can Edit</div>
                        <div className="permission-description">Can view and make changes</div>
                      </div>
                    </label>
                  </div>
                </div>
                
                <div className="share-message">
                  <h4>Add a Message (Optional)</h4>
                  <textarea
                    placeholder="Add a note to recipients..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                  ></textarea>
                </div>
              </>
            )}
            
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
          </div>
          
          <div className="modal-footer">
            <button 
              className="cancel-btn"
              onClick={closeShareModal}
            >
              Cancel
            </button>
            <button 
              className="share-btn"
              onClick={handleShare}
              disabled={selectedContacts.length === 0}
            >
              Share
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // Render shared items list
  const renderSharedItems = () => {
    const items = getFilteredItems();
    
    if (items.length === 0) {
      return (
        <div className="empty-shared-items">
          <div className="empty-icon"></div>
          <p>
            {activeTab === 'shared' 
              ? "You haven't shared any items yet." 
              : "No items have been shared with you."}
          </p>
          {activeTab === 'shared' && (
            <button className="start-sharing-btn">
              Start Sharing
            </button>
          )}
        </div>
      );
    }
    
    return (
      <div className="shared-items-list">
        {items.map(item => (
          <div key={item.id} className="shared-item">
            <div className="item-header">
              <div className="item-title-section">
                <div className={`item-icon ${item.type}-icon`}></div>
                <div className="item-details">
                  <div className="item-name">{item.name}</div>
                  <div className="item-type">{item.type}</div>
                </div>
              </div>
              
              {activeTab === 'shared' && (
                <button 
                  className="manage-sharing-btn"
                  onClick={() => openShareModal(item)}
                >
                  Manage Sharing
                </button>
              )}
            </div>
            
            <div className="shared-with-section">
              <h4>
                {activeTab === 'shared' ? 'Shared with:' : 'Shared by:'}
              </h4>
              
              <div className="shared-contacts">
                {activeTab === 'shared' ? (
                  // People I've shared with
                  item.shared && item.shared.map(share => (
                    <div key={share.id} className="shared-contact">
                      <div className="contact-avatar">
                        {share.contact.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="contact-info">
                        <div className="contact-name">{share.contact.name}</div>
                        <div className="permission-label">
                          {share.permission === 'edit' ? 'Can edit' : 'View only'}
                        </div>
                      </div>
                      <div className="sharing-actions">
                        <select
                          value={share.permission}
                          onChange={(e) => updatePermission(share.id, e.target.value)}
                          aria-label="Change permission"
                        >
                          <option value="view">View only</option>
                          <option value="edit">Can edit</option>
                        </select>
                        <button 
                          className="remove-sharing-btn"
                          onClick={() => removeAccess(share.id)}
                          aria-label="Remove access"
                        >
                          &times;
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  // Shared with me by owner
                  <div className="shared-contact">
                    <div className="contact-avatar">
                      {item.owner.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="contact-info">
                      <div className="contact-name">{item.owner.name}</div>
                      <div className="permission-label">
                        Owner
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="item-actions">
              <button className="view-item-btn">
                View {item.type}
              </button>
              {(activeTab === 'with-me' && item.permission === 'edit') && (
                <button className="edit-item-btn">
                  Edit {item.type}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="collaborative-sharing">
      <div className="sharing-header">
        <h2>Collaborative Sharing</h2>
        <p>Share tasks, documents, and resources with trusted contacts</p>
      </div>
      
      <div className="sharing-tabs">
        <button 
          className={`tab-btn ${activeTab === 'shared' ? 'active' : ''}`}
          onClick={() => setActiveTab('shared')}
        >
          Items I've Shared
        </button>
        <button 
          className={`tab-btn ${activeTab === 'with-me' ? 'active' : ''}`}
          onClick={() => setActiveTab('with-me')}
        >
          Shared with Me
        </button>
      </div>
      
      {renderSharedItems()}
      
      {showShareModal && renderShareModal()}
    </div>
  );
};

export default CollaborativeSharing;
