import React, { useContext } from 'react';
import { DigitalCompanionContext } from '../context/DigitalCompanionContext';
import { SelfCareContext } from '../context/SelfCareContext';
import './JournalTimeline.css';

function JournalTimeline() {
  const { navigateTo } = useContext(DigitalCompanionContext);
  const { journalEntries } = useContext(SelfCareContext);
  
  // Group entries by month and year
  const groupedEntries = journalEntries.reduce((groups, entry) => {
    const date = new Date(entry.timestamp);
    const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    
    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    
    groups[monthYear].push(entry);
    return groups;
  }, {});
  
  // Sort groups by date (most recent first)
  const sortedGroups = Object.keys(groupedEntries).sort((a, b) => {
    const dateA = new Date(groupedEntries[a][0].timestamp);
    const dateB = new Date(groupedEntries[b][0].timestamp);
    return dateB - dateA;
  });
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      weekday: 'short'
    });
  };
  
  const handleEntryClick = (entryId) => {
    navigateTo(`wellbeing/journal/${entryId}`);
  };
  
  return (
    <div className="journal-timeline">
      <div className="timeline-header">
        <h2>Journal Timeline</h2>
        <button 
          className="new-entry-btn"
          onClick={() => navigateTo('wellbeing/journal/new')}
        >
          New Entry
        </button>
      </div>
      
      {sortedGroups.length > 0 ? (
        <div className="timeline-content">
          {sortedGroups.map(monthYear => (
            <div key={monthYear} className="timeline-month">
              <h3 className="month-heading">{monthYear}</h3>
              
              <div className="month-entries">
                {groupedEntries[monthYear]
                  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                  .map(entry => (
                    <div 
                      key={entry.id} 
                      className="timeline-entry"
                      onClick={() => handleEntryClick(entry.id)}
                    >
                      <div className="entry-date-marker">
                        <div className="date-bubble">{formatDate(entry.timestamp)}</div>
                        <div className="timeline-line"></div>
                      </div>
                      
                      <div className="timeline-entry-content">
                        <h4 className="entry-title">{entry.title}</h4>
                        <p className="entry-excerpt">
                          {entry.content.length > 120 
                            ? `${entry.content.substring(0, 120)}...` 
                            : entry.content}
                        </p>
                        <div className="entry-footer">
                          {entry.tags.map(tag => (
                            <span key={tag} className="entry-tag">{tag}</span>
                          ))}
                          {entry.mood && (
                            <span className="entry-mood">{entry.mood}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-timeline">
          <p>Your journal timeline is empty.</p>
          <button 
            className="start-journal-btn"
            onClick={() => navigateTo('wellbeing/journal/new')}
          >
            Start Your Journal
          </button>
        </div>
      )}
    </div>
  );
}

export default JournalTimeline;
