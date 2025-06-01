import React, { createContext, useState, useEffect, useCallback } from 'react';

// Create the AI Assistant Context
export const AIAssistantContext = createContext();

// Create the AI Assistant Provider Component
export const AIAssistantProvider = ({ children }) => {
  // Chat state
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  
  // User preferences
  const [preferences, setPreferences] = useState({
    proactiveAssistance: true,
    voiceEnabled: false,
    notificationsEnabled: true,
    suggestionFrequency: 'medium' // low, medium, high
  });
  
  // Suggested tasks based on context
  const [suggestedTasks, setSuggestedTasks] = useState([]);
  
  // Wellbeing insights
  const [wellbeingInsights, setWellbeingInsights] = useState([]);
  
  // Memory prompts
  const [memoryPrompts, setMemoryPrompts] = useState([]);
  
  // Send a message to the AI Assistant
  const sendMessage = useCallback((message) => {
    // Add user message to chat history
    const userMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setChatHistory(prevHistory => [...prevHistory, userMessage]);
    setIsTyping(true);
    
    // Simulate AI response (would be an API call in production)
    setTimeout(() => {
      const aiResponse = generateAIResponse(message, chatHistory);
      
      const assistantMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        content: aiResponse.message,
        timestamp: new Date(),
        actions: aiResponse.actions || []
      };
      
      setChatHistory(prevHistory => [...prevHistory, assistantMessage]);
      setIsTyping(false);
      
      if (!isChatOpen) {
        setUnreadMessages(prev => prev + 1);
      }
    }, 1500);
  }, [chatHistory, isChatOpen]);
  
  // Clear chat history
  const clearChat = () => {
    setChatHistory([]);
  };
  
  // Toggle chat open/closed
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen) {
      setUnreadMessages(0);
    }
  };
  
  // Update user preferences
  const updatePreferences = (newPreferences) => {
    setPreferences({
      ...preferences,
      ...newPreferences
    });
  };
  
  // Generate AI response (mock implementation)
  const generateAIResponse = (message, history) => {
    const lowerMessage = message.toLowerCase();
    
    // Simple keyword-based responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return {
        message: "Hello! I'm your Digital Companion assistant. How can I help you today?",
        actions: []
      };
    }
    
    if (lowerMessage.includes('task') || lowerMessage.includes('to do')) {
      return {
        message: "I can help you manage your tasks. Would you like to create a new task, view your current tasks, or get suggestions for prioritizing your tasks?",
        actions: [
          { type: 'navigate', label: 'Create New Task', path: 'tasks/new' },
          { type: 'navigate', label: 'View Tasks', path: 'tasks' }
        ]
      };
    }
    
    if (lowerMessage.includes('journal') || lowerMessage.includes('diary')) {
      return {
        message: "Journaling can be a helpful way to process your thoughts and feelings. Would you like to write a new journal entry or review your past entries?",
        actions: [
          { type: 'navigate', label: 'New Journal Entry', path: 'wellbeing/journal/new' },
          { type: 'navigate', label: 'View Journal', path: 'wellbeing/journal' }
        ]
      };
    }
    
    if (lowerMessage.includes('photo') || lowerMessage.includes('picture') || lowerMessage.includes('image')) {
      return {
        message: "Photos can help preserve precious memories. Would you like to upload new photos or browse your photo collection?",
        actions: [
          { type: 'navigate', label: 'Upload Photos', path: 'memories/photos/upload' },
          { type: 'navigate', label: 'View Photos', path: 'memories/photos' }
        ]
      };
    }
    
    if (lowerMessage.includes('document') || lowerMessage.includes('file')) {
      return {
        message: "I can help you manage important documents. Would you like to upload a new document or browse your document library?",
        actions: [
          { type: 'navigate', label: 'Upload Document', path: 'memories/documents/upload' },
          { type: 'navigate', label: 'View Documents', path: 'memories/documents' }
        ]
      };
    }
    
    if (lowerMessage.includes('feeling') || lowerMessage.includes('mood')) {
      return {
        message: "It's important to check in with yourself. Would you like to log your mood or explore some self-care activities?",
        actions: [
          { type: 'navigate', label: 'Track Mood', path: 'wellbeing/mood' },
          { type: 'navigate', label: 'Self-Care Activities', path: 'wellbeing/activities' }
        ]
      };
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
      return {
        message: "I'm here to support you. You can ask me about managing tasks, journaling, organizing memories, finding support services, or self-care activities. What would you like help with?",
        actions: []
      };
    }
    
    // Default response
    return {
      message: "I'm here to help you with task management, journaling, organizing memories, finding support services, and self-care activities. How can I assist you today?",
      actions: []
    };
  };
  
  // Generate suggested tasks based on context (mock implementation)
  useEffect(() => {
    // In a real implementation, this would analyze user data and context
    const mockSuggestedTasks = [
      {
        id: 'suggestion-001',
        title: 'Review and update your emergency contacts',
        description: 'It\'s good practice to periodically review and update your emergency contacts.',
        priority: 'medium',
        category: 'administrative'
      },
      {
        id: 'suggestion-002',
        title: 'Schedule time for self-care this week',
        description: 'Taking time for yourself is important for wellbeing.',
        priority: 'high',
        category: 'wellbeing'
      },
      {
        id: 'suggestion-003',
        title: 'Organize recent photos into albums',
        description: 'You have several recent photos that could be organized into albums.',
        priority: 'low',
        category: 'memories'
      }
    ];
    
    setSuggestedTasks(mockSuggestedTasks);
  }, []);
  
  // Generate wellbeing insights (mock implementation)
  useEffect(() => {
    const mockInsights = [
      {
        id: 'insight-001',
        type: 'mood',
        content: 'Your mood has been improving over the past week. Keep up the good work!',
        timestamp: new Date()
      },
      {
        id: 'insight-002',
        type: 'journal',
        content: 'Regular journaling can help process emotions and reduce stress.',
        timestamp: new Date()
      }
    ];
    
    setWellbeingInsights(mockInsights);
  }, []);
  
  // Generate memory prompts (mock implementation)
  useEffect(() => {
    const mockPrompts = [
      {
        id: 'prompt-001',
        content: 'Would you like to add more details to your "Summer Vacation" memory story?',
        relatedItemId: 'story-001',
        timestamp: new Date()
      },
      {
        id: 'prompt-002',
        content: 'You have several photos from last month that haven\'t been organized into albums yet.',
        timestamp: new Date()
      }
    ];
    
    setMemoryPrompts(mockPrompts);
  }, []);
  
  // Welcome message on first load
  useEffect(() => {
    if (chatHistory.length === 0 && preferences.proactiveAssistance) {
      const welcomeMessage = {
        id: 'msg-welcome',
        sender: 'assistant',
        content: "Welcome to Digital Companion. I'm here to help you manage tasks, journal your thoughts, organize memories, find support services, and take care of your wellbeing. How can I assist you today?",
        timestamp: new Date(),
        actions: []
      };
      
      setChatHistory([welcomeMessage]);
      setUnreadMessages(1);
    }
  }, [chatHistory.length, preferences.proactiveAssistance]);
  
  // Context value
  const contextValue = {
    // Chat state and functions
    chatHistory,
    isTyping,
    isChatOpen,
    unreadMessages,
    sendMessage,
    clearChat,
    toggleChat,
    
    // User preferences
    preferences,
    updatePreferences,
    
    // Suggestions and insights
    suggestedTasks,
    wellbeingInsights,
    memoryPrompts
  };
  
  return (
    <AIAssistantContext.Provider value={contextValue}>
      {children}
    </AIAssistantContext.Provider>
  );
};

export default AIAssistantProvider;
