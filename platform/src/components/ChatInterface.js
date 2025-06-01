import React, { useContext, useState, useRef, useEffect } from 'react';
import { AIAssistantContext } from '../context/AIAssistantContext';
import { DigitalCompanionContext } from '../context/DigitalCompanionContext';
import './ChatInterface.css';

function ChatInterface() {
  const { 
    chatHistory, 
    isTyping, 
    isChatOpen, 
    unreadMessages,
    sendMessage, 
    clearChat, 
    toggleChat 
  } = useContext(AIAssistantContext);
  
  const { navigateTo } = useContext(DigitalCompanionContext);
  
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (inputMessage.trim() === '') return;
    
    sendMessage(inputMessage);
    setInputMessage('');
  };
  
  const handleActionClick = (action) => {
    if (action.type === 'navigate') {
      navigateTo(action.path);
      if (window.innerWidth < 768) {
        toggleChat(); // Close chat on mobile after navigation
      }
    }
  };
  
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  if (!isChatOpen) {
    return (
      <div className="chat-button-container">
        <button 
          className="chat-toggle-button"
          onClick={toggleChat}
        >
          <span className="chat-icon">💬</span>
          {unreadMessages > 0 && (
            <span className="unread-badge">{unreadMessages}</span>
          )}
        </button>
      </div>
    );
  }
  
  return (
    <div className="chat-interface">
      <div className="chat-header">
        <h3>Digital Companion Assistant</h3>
        <div className="chat-controls">
          <button 
            className="clear-chat-button"
            onClick={clearChat}
            title="Clear chat history"
          >
            🗑️
          </button>
          <button 
            className="close-chat-button"
            onClick={toggleChat}
            title="Close chat"
          >
            ✕
          </button>
        </div>
      </div>
      
      <div className="chat-messages">
        {chatHistory.map(message => (
          <div 
            key={message.id} 
            className={`message ${message.sender === 'user' ? 'user-message' : 'assistant-message'}`}
          >
            <div className="message-content">
              <p>{message.content}</p>
              
              {message.actions && message.actions.length > 0 && (
                <div className="message-actions">
                  {message.actions.map((action, index) => (
                    <button 
                      key={index}
                      className="action-button"
                      onClick={() => handleActionClick(action)}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
              
              <span className="message-time">{formatTime(message.timestamp)}</span>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message assistant-message">
            <div className="message-content typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button type="submit" disabled={inputMessage.trim() === ''}>
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatInterface;
