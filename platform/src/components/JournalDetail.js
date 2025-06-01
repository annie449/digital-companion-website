import React, { useContext, useState, useEffect } from 'react';
import { SelfCareContext } from '../context/SelfCareContext';
import './JournalDetail.css';

function JournalDetail({ entryId }) {
  const { journalEntries, navigateTo } = useContext(SelfCareContext);
  const [entry, setEntry] = useState(null);
  
  useEffect(() => {
    // Find the entry with the matching ID
    const foundEntry = journalEntries.find(e => e.id === entryId);
    setEntry(foundEntry);
    
    // If entry not found, redirect to journal dashboard
    if (!foundEntry) {
      navigateTo('wellbeing/journal');
    }
  }, [entryId, journalEntries, navigateTo]);
  
  if (!entry) {
    return <div className="loading-entry">Loading entry...</div>;
  }
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const handleEdit = () => {
    navigateTo(`wellbeing/journal/edit/${entryId}`);
  };
  
  const handleBack = () => {
    navigateTo('wellbeing/journal');
  };
  
  return (
    <div className="journal-detail">
      <div className="journal-detail-header">
        <button className="back-btn" onClick={handleBack}>
          ← Back to Journal
        </button>
        <button className="edit-btn" onClick={handleEdit}>
          Edit Entry
        </button>
      </div>
      
      <div className="journal-detail-content">
        <div className="entry-metadata">
          <div className="entry-date">{formatDate(entry.timestamp)}</div>
          {entry.isPrivate && (
            <div className="entry-privacy-badge">Private</div>
          )}
        </div>
        
        <h1 className="entry-title">{entry.title}</h1>
        
        {entry.mood && (
          <div className="entry-mood-display">
            Mood: <span className="mood-value">{entry.mood}</span>
          </div>
        )}
        
        <div className="entry-content">
          {entry.content.split('\n').map((paragraph, index) => (
            paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />
          ))}
        </div>
        
        {entry.tags.length > 0 && (
          <div className="entry-tags">
            <h3>Tags</h3>
            <div className="tags-list">
              {entry.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        )}
        
        {entry.linkedItems && (
          Object.values(entry.linkedItems).some(arr => arr.length > 0) && (
            <div className="linked-items">
              <h3>Linked Items</h3>
              
              {entry.linkedItems.tasks.length > 0 && (
                <div className="linked-tasks">
                  <h4>Tasks</h4>
                  <ul>
                    {entry.linkedItems.tasks.map(taskId => (
                      <li key={taskId} className="linked-task">
                        Task ID: {taskId}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {entry.linkedItems.assets.length > 0 && (
                <div className="linked-assets">
                  <h4>Assets</h4>
                  <ul>
                    {entry.linkedItems.assets.map(assetId => (
                      <li key={assetId} className="linked-asset">
                        Asset ID: {assetId}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {entry.linkedItems.memories.length > 0 && (
                <div className="linked-memories">
                  <h4>Memories</h4>
                  <ul>
                    {entry.linkedItems.memories.map(memoryId => (
                      <li key={memoryId} className="linked-memory">
                        Memory ID: {memoryId}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default JournalDetail;
