import React, { useState } from 'react';
import './MemoryVaultDashboard.css';

/**
 * Memory Vault Dashboard Component
 * 
 * This component serves as the main interface for the memory preservation feature,
 * allowing users to create, organize, and share memories with family members.
 */
const MemoryVaultDashboard = () => {
  // State for featured memories
  const [featuredMemories, setFeaturedMemories] = useState([
    {
      id: 1,
      title: 'Family Vacation to Scotland',
      description: 'Our trip to the Scottish Highlands in summer 2019.',
      type: 'photo',
      thumbnail: 'https://via.placeholder.com/300x200?text=Scotland+Vacation',
      date: 'June 15, 2019',
      tags: ['vacation', 'family', 'scotland']
    },
    {
      id: 2,
      title: 'Dad\'s 70th Birthday',
      description: 'Surprise party we organized at the lake house.',
      type: 'photo',
      thumbnail: 'https://via.placeholder.com/300x200?text=Birthday+Party',
      date: 'March 22, 2020',
      tags: ['birthday', 'celebration', 'family']
    },
    {
      id: 3,
      title: 'Wedding Day',
      description: 'Our special day surrounded by loved ones.',
      type: 'photo',
      thumbnail: 'https://via.placeholder.com/300x200?text=Wedding+Day',
      date: 'September 5, 2015',
      tags: ['wedding', 'celebration', 'love']
    }
  ]);

  // State for memory collections
  const [collections, setCollections] = useState([
    {
      id: 1,
      title: 'Family Vacations',
      count: 24,
      thumbnail: 'https://via.placeholder.com/100x100?text=Vacations'
    },
    {
      id: 2,
      title: 'Childhood Memories',
      count: 18,
      thumbnail: 'https://via.placeholder.com/100x100?text=Childhood'
    },
    {
      id: 3,
      title: 'Special Occasions',
      count: 32,
      thumbnail: 'https://via.placeholder.com/100x100?text=Occasions'
    },
    {
      id: 4,
      title: 'Life Stories',
      count: 7,
      thumbnail: 'https://via.placeholder.com/100x100?text=Stories'
    }
  ]);

  // State for collaborators
  const [collaborators, setCollaborators] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      relationship: 'Daughter',
      avatar: 'https://via.placeholder.com/40x40?text=SJ',
      status: 'active'
    },
    {
      id: 2,
      name: 'Michael Johnson',
      relationship: 'Son',
      avatar: 'https://via.placeholder.com/40x40?text=MJ',
      status: 'pending'
    }
  ]);

  // State for recent activity
  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      user: 'Sarah Johnson',
      action: 'added',
      item: 'photo',
      title: 'Christmas 2022',
      timestamp: '2 days ago'
    },
    {
      id: 2,
      user: 'You',
      action: 'created',
      item: 'story',
      title: 'How We Met',
      timestamp: '1 week ago'
    },
    {
      id: 3,
      user: 'Sarah Johnson',
      action: 'commented',
      item: 'photo',
      title: 'Dad\'s 70th Birthday',
      timestamp: '2 weeks ago'
    }
  ]);

  // Handler for memory selection
  const handleMemorySelect = (memoryId) => {
    console.log(`Selected memory: ${memoryId}`);
    // In a full implementation, this would navigate to the memory detail view
  };

  // Handler for creating a new memory
  const handleCreateMemory = () => {
    console.log('Creating new memory');
    // In a full implementation, this would open the memory creation form
  };

  // Handler for inviting collaborators
  const handleInviteCollaborator = () => {
    console.log('Inviting collaborator');
    // In a full implementation, this would open the invitation form
  };

  return (
    <div className="memory-vault-dashboard">
      <header className="dashboard-header">
        <h1>Memory Vault</h1>
        <p>Preserve and share your most treasured memories with loved ones.</p>
      </header>

      <section className="memory-actions">
        <button className="primary-button" onClick={handleCreateMemory}>
          <span className="button-icon">➕</span>
          Create New Memory
        </button>
        <button className="secondary-button">
          <span className="button-icon">🔍</span>
          Browse Timeline
        </button>
        <button className="secondary-button" onClick={handleInviteCollaborator}>
          <span className="button-icon">👥</span>
          Invite Family
        </button>
      </section>

      <section className="featured-memories">
        <h2>Featured Memories</h2>
        <div className="memories-grid">
          {featuredMemories.map(memory => (
            <div 
              key={memory.id} 
              className="memory-card"
              onClick={() => handleMemorySelect(memory.id)}
            >
              <div className="memory-thumbnail">
                <img src={memory.thumbnail} alt={memory.title} />
                <div className="memory-type-badge">
                  {memory.type === 'photo' && '📷'}
                  {memory.type === 'video' && '🎬'}
                  {memory.type === 'audio' && '🎙️'}
                  {memory.type === 'story' && '📝'}
                </div>
              </div>
              <div className="memory-content">
                <h3>{memory.title}</h3>
                <p>{memory.description}</p>
                <div className="memory-meta">
                  <span className="memory-date">{memory.date}</span>
                  <div className="memory-tags">
                    {memory.tags.map((tag, index) => (
                      <span key={index} className="memory-tag">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="dashboard-columns">
        <section className="collections-section">
          <div className="section-header">
            <h2>Collections</h2>
            <button className="text-button">View All</button>
          </div>
          <div className="collections-list">
            {collections.map(collection => (
              <div key={collection.id} className="collection-item">
                <div className="collection-thumbnail">
                  <img src={collection.thumbnail} alt={collection.title} />
                </div>
                <div className="collection-details">
                  <h3>{collection.title}</h3>
                  <span>{collection.count} items</span>
                </div>
              </div>
            ))}
          </div>
          <button className="secondary-button full-width">Create New Collection</button>
        </section>

        <section className="activity-section">
          <div className="section-header">
            <h2>Recent Activity</h2>
            <button className="text-button">View All</button>
          </div>
          <ul className="activity-list">
            {recentActivity.map(activity => (
              <li key={activity.id} className="activity-item">
                <div className="activity-icon">
                  {activity.action === 'added' && '➕'}
                  {activity.action === 'created' && '✏️'}
                  {activity.action === 'commented' && '💬'}
                </div>
                <div className="activity-details">
                  <p>
                    <strong>{activity.user}</strong> {activity.action} a {activity.item}: "{activity.title}"
                  </p>
                  <span className="activity-time">{activity.timestamp}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="collaborators-section">
        <div className="section-header">
          <h2>Family Collaborators</h2>
          <button className="primary-button" onClick={handleInviteCollaborator}>Invite</button>
        </div>
        <div className="collaborators-list">
          {collaborators.map(collaborator => (
            <div key={collaborator.id} className="collaborator-card">
              <div className="collaborator-avatar">
                <img src={collaborator.avatar} alt={collaborator.name} />
                <span className={`status-indicator ${collaborator.status}`}></span>
              </div>
              <div className="collaborator-details">
                <h3>{collaborator.name}</h3>
                <p>{collaborator.relationship}</p>
                {collaborator.status === 'pending' && (
                  <span className="pending-badge">Invitation Pending</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="memory-prompts">
        <h2>Memory Prompts</h2>
        <p>Answer these prompts to help preserve your stories for future generations.</p>
        <div className="prompts-list">
          <div className="prompt-card">
            <h3>What was your childhood home like?</h3>
            <p>Describe the place where you grew up and your favorite memories there.</p>
            <button className="secondary-button">Answer</button>
          </div>
          <div className="prompt-card">
            <h3>What traditions were important in your family?</h3>
            <p>Share special customs, celebrations, or routines that defined your family.</p>
            <button className="secondary-button">Answer</button>
          </div>
          <div className="prompt-card">
            <h3>What was your first job?</h3>
            <p>Tell us about your first work experience and what you learned from it.</p>
            <button className="secondary-button">Answer</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MemoryVaultDashboard;
