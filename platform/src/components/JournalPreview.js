import React, { useContext } from 'react';
import { SelfCareContext } from '../context/SelfCareContext';
import './JournalPreview.css';

function JournalPreview({ entries }) {
  const { navigateTo } = useContext(SelfCareContext);
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };
  
  const truncateContent = (content, maxLength = 120) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };
  
  const handleEntryClick = (entryId) => {
    navigateTo(`wellbeing/journal/${entryId}`);
  };
  
  return (
    <div className="journal-preview">
      {entries.length > 0 ? (
        <div className="journal-entries">
          {entries.map(entry => (
            <div 
              key={entry.id} 
              className="journal-entry-preview"
              onClick={() => handleEntryClick(entry.id)}
            >
              <div className="entry-header">
                <h4 className="entry-title">{entry.title}</h4>
                <span className="entry-date">{formatDate(entry.timestamp)}</span>
              </div>
              <p className="entry-excerpt">{truncateContent(entry.content)}</p>
              <div className="entry-footer">
                {entry.tags.map(tag => (
                  <span key={tag} className="entry-tag">{tag}</span>
                ))}
                {entry.mood && (
                  <span className="entry-mood">{entry.mood}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-journal">
          <p>No journal entries yet</p>
          <button 
            className="new-entry-btn"
            onClick={() => navigateTo('wellbeing/journal/new')}
          >
            Write First Entry
          </button>
        </div>
      )}
      
      <button 
        className="new-entry-btn"
        onClick={() => navigateTo('wellbeing/journal/new')}
      >
        New Entry
      </button>
    </div>
  );
}

export default JournalPreview;
