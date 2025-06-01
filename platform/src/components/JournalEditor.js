import React, { useState, useEffect } from 'react';
import { useDigitalCompanionContext } from '../context/DigitalCompanionContext';
import { useSelfCareContext } from '../context/SelfCareContext';
import './JournalEditor.css';

/**
 * Enhanced JournalEditor Component
 * 
 * An advanced journaling tool with guided prompts, mood tracking,
 * and media integration for therapeutic writing and reflection.
 */
const JournalEditor = ({ entryId, onSave, onCancel }) => {
  const { user } = useDigitalCompanionContext();
  const { journalEntries, saveJournalEntry, getJournalPrompts } = useSelfCareContext();
  
  // State management
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState(3);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [showPrompts, setShowPrompts] = useState(false);
  const [prompts, setPrompts] = useState([]);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [isPrivate, setIsPrivate] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [autoSaveStatus, setAutoSaveStatus] = useState('saved');
  
  // File input reference
  const fileInputRef = React.useRef(null);
  
  // Load existing entry if editing
  useEffect(() => {
    if (entryId) {
      const entry = journalEntries?.find(entry => entry.id === entryId);
      
      if (entry) {
        setTitle(entry.title || '');
        setContent(entry.content || '');
        setMood(entry.mood || 3);
        setTags(entry.tags || []);
        setMediaFiles(entry.media || []);
        setIsPrivate(entry.isPrivate !== false); // Default to private if not specified
      }
    }
  }, [entryId, journalEntries]);
  
  // Load journal prompts
  useEffect(() => {
    const loadPrompts = async () => {
      try {
        const promptsData = await getJournalPrompts();
        setPrompts(promptsData);
      } catch (err) {
        console.error('Failed to load journal prompts:', err);
      }
    };
    
    loadPrompts();
  }, [getJournalPrompts]);
  
  // Update word count when content changes
  useEffect(() => {
    const words = content.trim() ? content.trim().split(/\s+/).length : 0;
    setWordCount(words);
    
    // Set up auto-save
    const autoSaveTimer = setTimeout(() => {
      if (content.trim() || title.trim()) {
        handleAutoSave();
      }
    }, 30000); // Auto-save after 30 seconds of inactivity
    
    return () => clearTimeout(autoSaveTimer);
  }, [content, title]);
  
  // Handle auto-save
  const handleAutoSave = async () => {
    if (!title.trim() && !content.trim()) return;
    
    setAutoSaveStatus('saving');
    
    try {
      const entryData = {
        id: entryId || `draft_${Date.now()}`,
        title: title.trim() || 'Untitled Entry',
        content,
        mood,
        tags,
        media: mediaFiles,
        isPrivate,
        isDraft: true,
        lastUpdated: new Date().toISOString(),
        userId: user?.id
      };
      
      await saveJournalEntry(entryData);
      setAutoSaveStatus('saved');
    } catch (err) {
      setAutoSaveStatus('failed');
      console.error('Auto-save failed:', err);
    }
  };
  
  // Add a new tag
  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };
  
  // Remove a tag
  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  // Handle tag input key press
  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };
  
  // Handle file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 0) {
      const newMediaFiles = files.map(file => ({
        id: `media_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file),
        file // Keep the file object for actual upload
      }));
      
      setMediaFiles([...mediaFiles, ...newMediaFiles]);
    }
  };
  
  // Remove a media file
  const removeMediaFile = (fileId) => {
    setMediaFiles(mediaFiles.filter(file => file.id !== fileId));
  };
  
  // Apply a journal prompt
  const applyPrompt = (prompt) => {
    setSelectedPrompt(prompt);
    setContent(content => {
      const promptText = `\n\n${prompt.text}\n\n`;
      return content + promptText;
    });
    setShowPrompts(false);
  };
  
  // Handle save
  const handleSave = async () => {
    if (!title.trim()) {
      setError('Please provide a title for your journal entry.');
      return;
    }
    
    setIsSaving(true);
    setError(null);
    
    try {
      const entryData = {
        id: entryId || `entry_${Date.now()}`,
        title: title.trim(),
        content,
        mood,
        tags,
        media: mediaFiles,
        isPrivate,
        createdAt: new Date().toISOString(),
        userId: user?.id
      };
      
      await saveJournalEntry(entryData);
      
      if (onSave) {
        onSave(entryData);
      }
    } catch (err) {
      setError('Failed to save journal entry. Please try again.');
      setIsSaving(false);
    }
  };
  
  // Render mood selector
  const renderMoodSelector = () => {
    const moods = [
      { value: 1, label: 'Very Low', icon: 'mood-1-icon' },
      { value: 2, label: 'Low', icon: 'mood-2-icon' },
      { value: 3, label: 'Neutral', icon: 'mood-3-icon' },
      { value: 4, label: 'Good', icon: 'mood-4-icon' },
      { value: 5, label: 'Very Good', icon: 'mood-5-icon' }
    ];
    
    return (
      <div className="mood-selector">
        <label>How are you feeling today?</label>
        <div className="mood-options">
          {moods.map(m => (
            <button
              key={m.value}
              type="button"
              className={`mood-btn ${mood === m.value ? 'selected' : ''}`}
              onClick={() => setMood(m.value)}
              aria-label={m.label}
              title={m.label}
            >
              <div className={`mood-icon ${m.icon}`}></div>
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  // Render media preview
  const renderMediaPreview = () => {
    if (mediaFiles.length === 0) return null;
    
    return (
      <div className="media-preview">
        <h3>Attached Media</h3>
        <div className="media-grid">
          {mediaFiles.map(file => (
            <div key={file.id} className="media-item">
              {file.type.startsWith('image/') ? (
                <img src={file.url} alt={file.name} />
              ) : file.type.startsWith('video/') ? (
                <video src={file.url} controls />
              ) : (
                <div className="file-icon"></div>
              )}
              <div className="media-info">
                <span className="media-name">{file.name}</span>
                <button
                  type="button"
                  className="remove-media-btn"
                  onClick={() => removeMediaFile(file.id)}
                  aria-label="Remove media"
                >
                  &times;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Render prompts panel
  const renderPromptsPanel = () => {
    if (!showPrompts) return null;
    
    return (
      <div className="prompts-panel">
        <div className="prompts-header">
          <h3>Journal Prompts</h3>
          <button
            type="button"
            className="close-prompts-btn"
            onClick={() => setShowPrompts(false)}
            aria-label="Close prompts"
          >
            &times;
          </button>
        </div>
        
        <div className="prompts-categories">
          <button className="category-btn active">All</button>
          <button className="category-btn">Grief</button>
          <button className="category-btn">Reflection</button>
          <button className="category-btn">Gratitude</button>
          <button className="category-btn">Growth</button>
        </div>
        
        <div className="prompts-list">
          {prompts.map(prompt => (
            <div key={prompt.id} className="prompt-item">
              <p>{prompt.text}</p>
              <button
                type="button"
                className="use-prompt-btn"
                onClick={() => applyPrompt(prompt)}
              >
                Use This Prompt
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="journal-editor">
      <div className="editor-header">
        <h2>{entryId ? 'Edit Journal Entry' : 'New Journal Entry'}</h2>
        <div className="editor-status">
          {autoSaveStatus === 'saving' && <span className="autosave-status saving">Saving...</span>}
          {autoSaveStatus === 'saved' && <span className="autosave-status saved">Saved</span>}
          {autoSaveStatus === 'failed' && <span className="autosave-status failed">Save failed</span>}
          <span className="word-count">{wordCount} words</span>
        </div>
      </div>
      
      <div className="editor-content">
        <div className="title-input">
          <input
            type="text"
            placeholder="Entry Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        {renderMoodSelector()}
        
        <div className="writing-tools">
          <button
            type="button"
            className="tool-btn prompts-btn"
            onClick={() => setShowPrompts(!showPrompts)}
          >
            <div className="tool-icon prompts-icon"></div>
            <span>Writing Prompts</span>
          </button>
          
          <button
            type="button"
            className="tool-btn media-btn"
            onClick={() => fileInputRef.current.click()}
          >
            <div className="tool-icon media-icon"></div>
            <span>Add Media</span>
          </button>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            multiple
            accept="image/*,video/*,audio/*"
            style={{ display: 'none' }}
          />
        </div>
        
        {selectedPrompt && (
          <div className="active-prompt">
            <p>{selectedPrompt.text}</p>
          </div>
        )}
        
        <div className="content-textarea">
          <textarea
            placeholder="Start writing here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
          ></textarea>
        </div>
        
        {renderMediaPreview()}
        
        <div className="tags-section">
          <label>Tags</label>
          <div className="tags-input">
            <input
              type="text"
              placeholder="Add tags (press Enter)"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleTagKeyPress}
            />
            <button 
              type="button"
              className="add-tag-btn"
              onClick={addTag}
            >
              Add
            </button>
          </div>
          
          {tags.length > 0 && (
            <div className="tags-list">
              {tags.map(tag => (
                <span key={tag} className="tag">
                  {tag}
                  <button 
                    type="button"
                    className="remove-tag"
                    onClick={() => removeTag(tag)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="privacy-setting">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
            />
            Keep this entry private
          </label>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="editor-actions">
          <button 
            type="button"
            className="cancel-btn"
            onClick={onCancel}
            disabled={isSaving}
          >
            Cancel
          </button>
          <button 
            type="button"
            className="save-btn"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Entry'}
          </button>
        </div>
      </div>
      
      {renderPromptsPanel()}
    </div>
  );
};

export default JournalEditor;
