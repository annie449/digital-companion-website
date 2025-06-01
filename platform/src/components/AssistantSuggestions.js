import React, { useContext, useState, useEffect } from 'react';
import { AIAssistantContext } from '../context/AIAssistantContext';
import './AssistantSuggestions.css';

function AssistantSuggestions() {
  const { 
    suggestedTasks, 
    wellbeingInsights, 
    memoryPrompts,
    preferences,
    sendMessage
  } = useContext(AIAssistantContext);
  
  const [activeSuggestionType, setActiveSuggestionType] = useState('tasks');
  const [showSuggestions, setShowSuggestions] = useState(true);
  
  // Hide suggestions if proactive assistance is disabled
  useEffect(() => {
    setShowSuggestions(preferences.proactiveAssistance);
  }, [preferences.proactiveAssistance]);
  
  // Handle suggestion click
  const handleSuggestionClick = (suggestion, type) => {
    let message = '';
    
    switch(type) {
      case 'tasks':
        message = `Tell me more about the task: ${suggestion.title}`;
        break;
      case 'insights':
        message = `Tell me more about this insight: ${suggestion.content}`;
        break;
      case 'memories':
        message = `Tell me more about this memory prompt: ${suggestion.content}`;
        break;
      default:
        message = 'Can you tell me more about this suggestion?';
    }
    
    sendMessage(message);
  };
  
  // Toggle suggestion visibility
  const toggleSuggestions = () => {
    setShowSuggestions(!showSuggestions);
  };
  
  if (!preferences.proactiveAssistance) {
    return null;
  }
  
  return (
    <div className={`assistant-suggestions ${showSuggestions ? 'expanded' : 'collapsed'}`}>
      <div className="suggestions-header" onClick={toggleSuggestions}>
        <h3>Assistant Suggestions</h3>
        <button className="toggle-suggestions-btn">
          {showSuggestions ? '−' : '+'}
        </button>
      </div>
      
      {showSuggestions && (
        <>
          <div className="suggestion-tabs">
            <button 
              className={`tab ${activeSuggestionType === 'tasks' ? 'active' : ''}`}
              onClick={() => setActiveSuggestionType('tasks')}
            >
              Tasks
            </button>
            <button 
              className={`tab ${activeSuggestionType === 'insights' ? 'active' : ''}`}
              onClick={() => setActiveSuggestionType('insights')}
            >
              Insights
            </button>
            <button 
              className={`tab ${activeSuggestionType === 'memories' ? 'active' : ''}`}
              onClick={() => setActiveSuggestionType('memories')}
            >
              Memories
            </button>
          </div>
          
          <div className="suggestions-content">
            {activeSuggestionType === 'tasks' && (
              <div className="suggestion-list">
                {suggestedTasks.length > 0 ? (
                  suggestedTasks.map(task => (
                    <div 
                      key={task.id} 
                      className="suggestion-item"
                      onClick={() => handleSuggestionClick(task, 'tasks')}
                    >
                      <div className="suggestion-icon task-icon">📋</div>
                      <div className="suggestion-details">
                        <h4>{task.title}</h4>
                        <p>{task.description}</p>
                        <div className="suggestion-meta">
                          <span className={`priority priority-${task.priority}`}>
                            {task.priority}
                          </span>
                          <span className="category">{task.category}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-suggestions">
                    <p>No task suggestions available at the moment.</p>
                  </div>
                )}
              </div>
            )}
            
            {activeSuggestionType === 'insights' && (
              <div className="suggestion-list">
                {wellbeingInsights.length > 0 ? (
                  wellbeingInsights.map(insight => (
                    <div 
                      key={insight.id} 
                      className="suggestion-item"
                      onClick={() => handleSuggestionClick(insight, 'insights')}
                    >
                      <div className="suggestion-icon insight-icon">
                        {insight.type === 'mood' ? '😊' : '📔'}
                      </div>
                      <div className="suggestion-details">
                        <p>{insight.content}</p>
                        <div className="suggestion-meta">
                          <span className="insight-type">{insight.type}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-suggestions">
                    <p>No wellbeing insights available at the moment.</p>
                  </div>
                )}
              </div>
            )}
            
            {activeSuggestionType === 'memories' && (
              <div className="suggestion-list">
                {memoryPrompts.length > 0 ? (
                  memoryPrompts.map(prompt => (
                    <div 
                      key={prompt.id} 
                      className="suggestion-item"
                      onClick={() => handleSuggestionClick(prompt, 'memories')}
                    >
                      <div className="suggestion-icon memory-icon">🖼️</div>
                      <div className="suggestion-details">
                        <p>{prompt.content}</p>
                        <div className="suggestion-meta">
                          <span className="prompt-time">
                            {new Date(prompt.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-suggestions">
                    <p>No memory prompts available at the moment.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default AssistantSuggestions;
