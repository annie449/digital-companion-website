import React, { useContext, useState } from 'react';
import { SelfCareContext } from '../context/SelfCareContext';
import './JournalDashboard.css';

function JournalDashboard() {
  const { journalEntries, navigateTo } = useContext(SelfCareContext);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter options
  const filters = [
    { id: 'all', label: 'All Entries' },
    { id: 'recent', label: 'Recent' },
    { id: 'memories', label: 'Memories' },
    { id: 'reflections', label: 'Reflections' }
  ];
  
  // Filter entries based on active filter and search term
  const filteredEntries = journalEntries.filter(entry => {
    // Apply tag filter
    if (activeFilter !== 'all' && activeFilter !== 'recent') {
      if (!entry.tags.includes(activeFilter)) {
        return false;
      }
    }
    
    // Apply search filter if search term exists
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        entry.title.toLowerCase().includes(searchLower) ||
        entry.content.toLowerCase().includes(searchLower) ||
        entry.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    return true;
  });
  
  // Sort entries by date (most recent first)
  const sortedEntries = [...filteredEntries].sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  );
  
  // If recent filter is active, only show entries from the last 7 days
  const displayedEntries = activeFilter === 'recent'
    ? sortedEntries.filter(entry => {
        const entryDate = new Date(entry.timestamp);
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return entryDate >= sevenDaysAgo;
      })
    : sortedEntries;
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  const handleEntryClick = (entryId) => {
    navigateTo(`wellbeing/journal/${entryId}`);
  };
  
  return (
    <div className="journal-dashboard">
      <div className="journal-header">
        <h2>Journal</h2>
        <button 
          className="new-entry-btn"
          onClick={() => navigateTo('wellbeing/journal/new')}
        >
          New Entry
        </button>
      </div>
      
      <div className="journal-controls">
        <div className="journal-filters">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        <div className="journal-search">
          <input
            type="text"
            placeholder="Search entries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="journal-entries-list">
        {displayedEntries.length > 0 ? (
          displayedEntries.map(entry => (
            <div 
              key={entry.id} 
              className="journal-entry-card"
              onClick={() => handleEntryClick(entry.id)}
            >
              <div className="entry-date">{formatDate(entry.timestamp)}</div>
              <h3 className="entry-title">{entry.title}</h3>
              <p className="entry-excerpt">
                {entry.content.length > 150 
                  ? `${entry.content.substring(0, 150)}...` 
                  : entry.content}
              </p>
              <div className="entry-footer">
                {entry.tags.map(tag => (
                  <span key={tag} className="entry-tag">{tag}</span>
                ))}
                {entry.mood && (
                  <span className="entry-mood">{entry.mood}</span>
                )}
                {entry.isPrivate && (
                  <span className="entry-privacy">Private</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-entries">
            <p>No journal entries found.</p>
            {searchTerm && (
              <p>Try adjusting your search or filter criteria.</p>
            )}
            {!journalEntries.length && (
              <button 
                className="start-journal-btn"
                onClick={() => navigateTo('wellbeing/journal/new')}
              >
                Start Your Journal
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default JournalDashboard;
