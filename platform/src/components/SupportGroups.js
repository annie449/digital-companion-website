import React, { useState, useEffect } from 'react';
import { useSelfCareContext } from '../context/SelfCareContext';
import './SupportGroups.js.css';

/**
 * SupportGroups Component
 * 
 * A comprehensive tool for finding, joining, and participating in
 * grief support groups, both virtual and in-person.
 */
const SupportGroups = () => {
  const { supportGroups, userGroups, joinGroup, leaveGroup } = useSelfCareContext();
  
  // State management
  const [activeTab, setActiveTab] = useState('discover');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showGroupDetails, setShowGroupDetails] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [filterLocation, setFilterLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinMessage, setJoinMessage] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Get filtered groups
  const getFilteredGroups = () => {
    if (!supportGroups) return [];
    
    let filtered = [...supportGroups];
    
    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(group => group.type === filterType);
    }
    
    // Filter by location
    if (filterLocation) {
      filtered = filtered.filter(group => 
        group.location?.toLowerCase().includes(filterLocation.toLowerCase())
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(group => 
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };
  
  // Get user's joined groups
  const getMyGroups = () => {
    if (!userGroups) return [];
    return userGroups;
  };
  
  // View group details
  const viewGroupDetails = (group) => {
    setSelectedGroup(group);
    setShowGroupDetails(true);
  };
  
  // Close group details
  const closeGroupDetails = () => {
    setShowGroupDetails(false);
    setSelectedGroup(null);
  };
  
  // Open join modal
  const openJoinModal = (group) => {
    setSelectedGroup(group);
    setJoinMessage('');
    setShowJoinModal(true);
  };
  
  // Close join modal
  const closeJoinModal = () => {
    setShowJoinModal(false);
    setSelectedGroup(null);
    setJoinMessage('');
    setError(null);
  };
  
  // Handle join group
  const handleJoinGroup = async () => {
    try {
      await joinGroup({
        groupId: selectedGroup.id,
        message: joinMessage.trim() || null
      });
      
      setSuccess(`You've successfully joined ${selectedGroup.name}!`);
      
      // Close modal after a delay
      setTimeout(() => {
        closeJoinModal();
        setSuccess(null);
      }, 2000);
    } catch (err) {
      setError('Failed to join group. Please try again.');
    }
  };
  
  // Handle leave group
  const handleLeaveGroup = async (groupId) => {
    if (window.confirm('Are you sure you want to leave this group?')) {
      try {
        await leaveGroup(groupId);
        // Success would be handled by context update
      } catch (err) {
        setError('Failed to leave group. Please try again.');
      }
    }
  };
  
  // Format next meeting time
  const formatNextMeeting = (nextMeeting) => {
    if (!nextMeeting) return 'No upcoming meetings';
    
    const date = new Date(nextMeeting);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };
  
  // Render group list
  const renderGroupList = () => {
    const groups = activeTab === 'discover' ? getFilteredGroups() : getMyGroups();
    
    if (groups.length === 0) {
      return (
        <div className="empty-groups">
          <div className="empty-icon"></div>
          <p>
            {activeTab === 'discover' 
              ? "No support groups match your filters." 
              : "You haven't joined any support groups yet."}
          </p>
          {activeTab === 'my-groups' && (
            <button 
              className="discover-groups-btn"
              onClick={() => setActiveTab('discover')}
            >
              Discover Groups
            </button>
          )}
        </div>
      );
    }
    
    return (
      <div className="groups-list">
        {groups.map(group => (
          <div key={group.id} className="group-card">
            <div className="group-header">
              <div className={`group-type-badge ${group.type}`}>
                {group.type === 'virtual' ? 'Virtual' : 'In-Person'}
              </div>
              <h3 className="group-name">{group.name}</h3>
            </div>
            
            <div className="group-info">
              {group.location && (
                <div className="group-location">
                  <div className="location-icon"></div>
                  <span>{group.location}</span>
                </div>
              )}
              
              <div className="group-members">
                <div className="members-icon"></div>
                <span>{group.memberCount} members</span>
              </div>
              
              <div className="group-schedule">
                <div className="schedule-icon"></div>
                <span>{group.schedule}</span>
              </div>
            </div>
            
            <p className="group-description">{group.description}</p>
            
            <div className="next-meeting">
              <strong>Next meeting:</strong> {formatNextMeeting(group.nextMeeting)}
            </div>
            
            <div className="group-actions">
              <button 
                className="view-details-btn"
                onClick={() => viewGroupDetails(group)}
              >
                View Details
              </button>
              
              {activeTab === 'discover' ? (
                <button 
                  className="join-group-btn"
                  onClick={() => openJoinModal(group)}
                >
                  Join Group
                </button>
              ) : (
                <button 
                  className="leave-group-btn"
                  onClick={() => handleLeaveGroup(group.id)}
                >
                  Leave Group
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  // Render group details
  const renderGroupDetails = () => {
    if (!selectedGroup || !showGroupDetails) return null;
    
    return (
      <div className="modal-overlay">
        <div className="group-details-modal">
          <div className="modal-header">
            <h3>{selectedGroup.name}</h3>
            <button 
              className="close-modal-btn"
              onClick={closeGroupDetails}
            >
              &times;
            </button>
          </div>
          
          <div className="modal-content">
            <div className="group-type-section">
              <div className={`group-type-badge large ${selectedGroup.type}`}>
                {selectedGroup.type === 'virtual' ? 'Virtual' : 'In-Person'}
              </div>
            </div>
            
            <div className="group-detail-section">
              <h4>About This Group</h4>
              <p>{selectedGroup.description}</p>
            </div>
            
            {selectedGroup.location && (
              <div className="group-detail-section">
                <h4>Location</h4>
                <div className="detail-with-icon">
                  <div className="location-icon"></div>
                  <p>{selectedGroup.location}</p>
                </div>
                {selectedGroup.type === 'in-person' && selectedGroup.address && (
                  <p className="address">{selectedGroup.address}</p>
                )}
                {selectedGroup.type === 'virtual' && selectedGroup.platform && (
                  <p className="platform">Platform: {selectedGroup.platform}</p>
                )}
              </div>
            )}
            
            <div className="group-detail-section">
              <h4>Schedule</h4>
              <div className="detail-with-icon">
                <div className="schedule-icon"></div>
                <p>{selectedGroup.schedule}</p>
              </div>
              <div className="next-meeting-detail">
                <strong>Next meeting:</strong> {formatNextMeeting(selectedGroup.nextMeeting)}
              </div>
            </div>
            
            <div className="group-detail-section">
              <h4>Facilitator</h4>
              <div className="facilitator-info">
                <div className="facilitator-avatar">
                  {selectedGroup.facilitator.name.charAt(0).toUpperCase()}
                </div>
                <div className="facilitator-details">
                  <div className="facilitator-name">{selectedGroup.facilitator.name}</div>
                  <div className="facilitator-title">{selectedGroup.facilitator.title}</div>
                </div>
              </div>
              {selectedGroup.facilitator.bio && (
                <p className="facilitator-bio">{selectedGroup.facilitator.bio}</p>
              )}
            </div>
            
            {selectedGroup.topics && selectedGroup.topics.length > 0 && (
              <div className="group-detail-section">
                <h4>Discussion Topics</h4>
                <ul className="topics-list">
                  {selectedGroup.topics.map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="group-detail-section">
              <h4>Group Size</h4>
              <p>{selectedGroup.memberCount} members</p>
            </div>
          </div>
          
          <div className="modal-footer">
            <button 
              className="close-btn"
              onClick={closeGroupDetails}
            >
              Close
            </button>
            
            {!userGroups?.some(g => g.id === selectedGroup.id) ? (
              <button 
                className="join-group-btn"
                onClick={() => {
                  closeGroupDetails();
                  openJoinModal(selectedGroup);
                }}
              >
                Join Group
              </button>
            ) : (
              <button 
                className="leave-group-btn"
                onClick={() => {
                  closeGroupDetails();
                  handleLeaveGroup(selectedGroup.id);
                }}
              >
                Leave Group
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  // Render join modal
  const renderJoinModal = () => {
    if (!selectedGroup || !showJoinModal) return null;
    
    return (
      <div className="modal-overlay">
        <div className="join-group-modal">
          <div className="modal-header">
            <h3>Join {selectedGroup.name}</h3>
            <button 
              className="close-modal-btn"
              onClick={closeJoinModal}
            >
              &times;
            </button>
          </div>
          
          <div className="modal-content">
            <p className="join-instructions">
              {selectedGroup.type === 'virtual' 
                ? "You're about to join a virtual support group. After joining, you'll receive details about how to participate in the next meeting."
                : "You're about to join an in-person support group. After joining, you'll receive details about the meeting location and any preparation needed."}
            </p>
            
            <div className="message-section">
              <h4>Message to Facilitator (Optional)</h4>
              <textarea
                placeholder="Share why you're interested in joining this group..."
                value={joinMessage}
                onChange={(e) => setJoinMessage(e.target.value)}
                rows={4}
              ></textarea>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
          </div>
          
          <div className="modal-footer">
            <button 
              className="cancel-btn"
              onClick={closeJoinModal}
            >
              Cancel
            </button>
            <button 
              className="confirm-join-btn"
              onClick={handleJoinGroup}
            >
              Join Group
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="support-groups">
      <div className="groups-header">
        <h2>Support Groups</h2>
        <p>Connect with others on similar journeys through grief and healing</p>
      </div>
      
      <div className="groups-tabs">
        <button 
          className={`tab-btn ${activeTab === 'discover' ? 'active' : ''}`}
          onClick={() => setActiveTab('discover')}
        >
          Discover Groups
        </button>
        <button 
          className={`tab-btn ${activeTab === 'my-groups' ? 'active' : ''}`}
          onClick={() => setActiveTab('my-groups')}
        >
          My Groups
        </button>
      </div>
      
      {activeTab === 'discover' && (
        <div className="groups-filters">
          <div className="filter-row">
            <div className="filter-group">
              <label>Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="virtual">Virtual</option>
                <option value="in-person">In-Person</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Location</label>
              <input
                type="text"
                placeholder="City or region..."
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
              />
            </div>
          </div>
          
          <div className="search-row">
            <input
              type="text"
              placeholder="Search by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      )}
      
      {renderGroupList()}
      {renderGroupDetails()}
      {renderJoinModal()}
    </div>
  );
};

export default SupportGroups;
