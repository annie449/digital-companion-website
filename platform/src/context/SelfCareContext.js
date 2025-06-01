import React, { createContext, useState, useEffect, useContext } from 'react';
import { DigitalCompanionContext } from './DigitalCompanionContext';

// Create the Self-Care Context
export const SelfCareContext = createContext();

// Create the Self-Care Provider Component
export const SelfCareProvider = ({ children }) => {
  const { user, addActivity, addNotification } = useContext(DigitalCompanionContext);
  
  // Mood tracking state
  const [moodEntries, setMoodEntries] = useState([
    {
      id: 'mood-001',
      timestamp: new Date(Date.now() - 86400000), // yesterday
      mood: 'sad',
      intensity: 7,
      notes: 'Feeling overwhelmed with paperwork today',
      triggers: ['paperwork', 'legal tasks'],
      associatedTasks: ['task-002'],
      associatedAssets: []
    },
    {
      id: 'mood-002',
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      mood: 'anxious',
      intensity: 6,
      notes: 'Worried about upcoming meetings with solicitor',
      triggers: ['upcoming meeting', 'legal concerns'],
      associatedTasks: ['task-003'],
      associatedAssets: []
    }
  ]);
  
  const [currentMood, setCurrentMood] = useState(null);
  
  // Journal entries state
  const [journalEntries, setJournalEntries] = useState([
    {
      id: 'journal-001',
      title: 'Reflecting on memories',
      content: 'Today I found some old photographs that brought back wonderful memories...',
      timestamp: new Date(Date.now() - 259200000), // 3 days ago
      tags: ['memories', 'reflection', 'photos'],
      mood: 'nostalgic',
      isPrivate: true,
      sharedWith: [],
      attachments: [],
      linkedItems: {
        tasks: [],
        assets: [],
        memories: ['memory-001']
      }
    }
  ]);
  
  // Meditation and mindfulness state
  const [meditationSessions, setMeditationSessions] = useState([
    {
      id: 'meditation-001',
      title: 'Calm in the Storm',
      category: 'grief',
      duration: 10,
      audioUrl: '/meditations/calm-in-storm.mp3',
      imageUrl: '/images/meditation/calm-beach.jpg',
      description: 'A gentle meditation to help find moments of calm during difficult times.',
      tags: ['beginner', 'grief', 'calming'],
      favorited: false,
      completedSessions: []
    },
    {
      id: 'meditation-002',
      title: 'Peaceful Sleep',
      category: 'sleep',
      duration: 15,
      audioUrl: '/meditations/peaceful-sleep.mp3',
      imageUrl: '/images/meditation/night-sky.jpg',
      description: 'A soothing meditation to help you fall asleep peacefully.',
      tags: ['sleep', 'evening', 'relaxation'],
      favorited: true,
      completedSessions: [new Date(Date.now() - 86400000)]
    },
    {
      id: 'meditation-003',
      title: 'Letting Go',
      category: 'grief',
      duration: 20,
      audioUrl: '/meditations/letting-go.mp3',
      imageUrl: '/images/meditation/autumn-leaves.jpg',
      description: 'A meditation focused on the process of letting go and finding peace.',
      tags: ['intermediate', 'grief', 'release'],
      favorited: false,
      completedSessions: []
    }
  ]);
  
  const [favoriteGuidedMeditations, setFavoriteGuidedMeditations] = useState(['meditation-002']);
  
  // Self-care activities state
  const [selfCareActivities, setSelfCareActivities] = useState([
    {
      id: 'activity-001',
      title: 'Gentle Walk Outside',
      description: 'Take a 15-minute walk outdoors, focusing on the sensations around you.',
      category: 'physical',
      duration: 15,
      benefits: ['Reduces stress', 'Improves mood', 'Increases energy'],
      steps: [
        'Find a peaceful area to walk',
        'Leave your phone behind or on silent',
        'Notice the sensations as you walk',
        'Focus on your breathing'
      ],
      resources: [],
      completedInstances: [],
      scheduledFor: null
    },
    {
      id: 'activity-002',
      title: 'Gratitude Journaling',
      description: 'Write down three things you feel grateful for today, no matter how small.',
      category: 'emotional',
      duration: 10,
      benefits: ['Shifts perspective', 'Increases positive emotions', 'Builds resilience'],
      steps: [
        'Find a quiet moment',
        'Reflect on your day',
        'Write down three things you appreciate',
        'Add details about why they matter to you'
      ],
      resources: ['journal-guide-001'],
      completedInstances: [new Date(Date.now() - 172800000)],
      scheduledFor: null
    },
    {
      id: 'activity-003',
      title: 'Connect with a Friend',
      description: 'Reach out to someone who supports you for a brief chat or message.',
      category: 'social',
      duration: 20,
      benefits: ['Reduces isolation', 'Provides emotional support', 'Strengthens relationships'],
      steps: [
        'Identify someone you feel comfortable with',
        'Send a message or make a call',
        'Share honestly about how you're doing',
        'Express appreciation for their support'
      ],
      resources: [],
      completedInstances: [],
      scheduledFor: new Date(Date.now() + 86400000)
    }
  ]);
  
  const [completedActivities, setCompletedActivities] = useState([
    {
      activityId: 'activity-002',
      completedAt: new Date(Date.now() - 172800000),
      notes: 'Felt better after focusing on the positive things in my life',
      moodBefore: 'low',
      moodAfter: 'calm'
    }
  ]);
  
  // Wellbeing metrics state
  const [wellbeingScores, setWellbeingScores] = useState({
    overall: 65,
    emotional: 60,
    physical: 70,
    social: 65,
    spiritual: 60,
    history: [
      { date: new Date(Date.now() - 604800000), score: 55 }, // 7 days ago
      { date: new Date(Date.now() - 432000000), score: 58 }, // 5 days ago
      { date: new Date(Date.now() - 259200000), score: 62 }, // 3 days ago
      { date: new Date(Date.now() - 86400000), score: 65 }  // 1 day ago
    ]
  });
  
  const [sleepData, setSleepData] = useState([
    { date: new Date(Date.now() - 345600000), hours: 6, quality: 'poor' },    // 4 days ago
    { date: new Date(Date.now() - 259200000), hours: 6.5, quality: 'fair' },  // 3 days ago
    { date: new Date(Date.now() - 172800000), hours: 7, quality: 'good' },    // 2 days ago
    { date: new Date(Date.now() - 86400000), hours: 7.5, quality: 'good' }    // 1 day ago
  ]);
  
  // Resource library state
  const [resources, setResources] = useState([
    {
      id: 'resource-001',
      title: 'Understanding Grief',
      type: 'article',
      content: 'Grief is a natural response to loss. It's the emotional suffering you feel when something or someone you love is taken away...',
      tags: ['grief', 'education', 'emotional'],
      author: 'Dr. Sarah Johnson',
      datePublished: new Date(2024, 2, 15),
      readTime: 8, // minutes
      url: '/resources/understanding-grief'
    },
    {
      id: 'resource-002',
      title: 'Self-Care During Difficult Times',
      type: 'video',
      content: '',
      tags: ['self-care', 'wellbeing', 'practical'],
      author: 'Mindful Living Center',
      datePublished: new Date(2024, 4, 10),
      duration: 12, // minutes
      url: '/resources/self-care-video'
    },
    {
      id: 'resource-003',
      title: 'Sleep and Grief',
      type: 'article',
      content: 'Sleep disturbances are common during grief. This article explores strategies to improve sleep quality during difficult times...',
      tags: ['sleep', 'physical', 'wellbeing'],
      author: 'Sleep Foundation',
      datePublished: new Date(2024, 1, 22),
      readTime: 6, // minutes
      url: '/resources/sleep-and-grief'
    }
  ]);
  
  const [savedResources, setSavedResources] = useState(['resource-001']);
  
  // Add a new mood entry
  const addMoodEntry = (moodData) => {
    const newMoodEntry = {
      id: `mood-${Date.now()}`,
      timestamp: new Date(),
      ...moodData
    };
    
    setMoodEntries([newMoodEntry, ...moodEntries]);
    setCurrentMood(newMoodEntry);
    
    // Add to activity feed
    addActivity('wellbeing', 'recorded', 'mood');
    
    // Update wellbeing metrics
    updateWellbeingMetrics();
    
    return newMoodEntry;
  };
  
  // Add a new journal entry
  const addJournalEntry = (entryData) => {
    const newJournalEntry = {
      id: `journal-${Date.now()}`,
      timestamp: new Date(),
      ...entryData
    };
    
    setJournalEntries([newJournalEntry, ...journalEntries]);
    
    // Add to activity feed
    addActivity('wellbeing', 'created', 'journal entry');
    
    // Update wellbeing metrics
    updateWellbeingMetrics();
    
    return newJournalEntry;
  };
  
  // Complete a meditation session
  const completeMeditationSession = (meditationId, sessionData = {}) => {
    setMeditationSessions(meditationSessions.map(meditation => {
      if (meditation.id === meditationId) {
        return {
          ...meditation,
          completedSessions: [
            ...meditation.completedSessions,
            {
              timestamp: new Date(),
              duration: meditation.duration,
              ...sessionData
            }
          ]
        };
      }
      return meditation;
    }));
    
    // Add to activity feed
    addActivity('wellbeing', 'completed', 'meditation session');
    
    // Update wellbeing metrics
    updateWellbeingMetrics();
  };
  
  // Toggle favorite status for a meditation
  const toggleFavoriteMeditation = (meditationId) => {
    setMeditationSessions(meditationSessions.map(meditation => {
      if (meditation.id === meditationId) {
        return {
          ...meditation,
          favorited: !meditation.favorited
        };
      }
      return meditation;
    }));
    
    // Update favorites list
    const meditation = meditationSessions.find(m => m.id === meditationId);
    if (meditation) {
      if (meditation.favorited) {
        setFavoriteGuidedMeditations(favoriteGuidedMeditations.filter(id => id !== meditationId));
      } else {
        setFavoriteGuidedMeditations([...favoriteGuidedMeditations, meditationId]);
      }
    }
  };
  
  // Complete a self-care activity
  const completeActivity = (activityId, completionData) => {
    const newCompletion = {
      activityId,
      completedAt: new Date(),
      ...completionData
    };
    
    setCompletedActivities([newCompletion, ...completedActivities]);
    
    // Add to activity feed
    const activity = selfCareActivities.find(a => a.id === activityId);
    if (activity) {
      addActivity('wellbeing', 'completed', `self-care activity: ${activity.title}`);
    }
    
    // Update wellbeing metrics
    updateWellbeingMetrics();
    
    return newCompletion;
  };
  
  // Schedule a self-care activity
  const scheduleActivity = (activityId, scheduledDate) => {
    setSelfCareActivities(selfCareActivities.map(activity => {
      if (activity.id === activityId) {
        return {
          ...activity,
          scheduledFor: scheduledDate
        };
      }
      return activity;
    }));
    
    // Add notification for scheduled activity
    const activity = selfCareActivities.find(a => a.id === activityId);
    if (activity) {
      addNotification({
        type: 'wellbeing',
        message: `Reminder: ${activity.title} scheduled for ${scheduledDate.toLocaleString()}`,
        timestamp: scheduledDate
      });
    }
  };
  
  // Save a resource
  const saveResource = (resourceId) => {
    if (!savedResources.includes(resourceId)) {
      setSavedResources([...savedResources, resourceId]);
      
      // Add to activity feed
      const resource = resources.find(r => r.id === resourceId);
      if (resource) {
        addActivity('wellbeing', 'saved', `resource: ${resource.title}`);
      }
    }
  };
  
  // Remove a saved resource
  const removeSavedResource = (resourceId) => {
    setSavedResources(savedResources.filter(id => id !== resourceId));
  };
  
  // Update wellbeing metrics based on recent activities
  const updateWellbeingMetrics = () => {
    // This would contain logic to calculate wellbeing scores
    // based on mood entries, completed activities, etc.
    // For now, we'll use a simple placeholder implementation
    
    const recentMoods = moodEntries.slice(0, 5);
    const avgMoodIntensity = recentMoods.length > 0
      ? recentMoods.reduce((sum, entry) => sum + entry.intensity, 0) / recentMoods.length
      : 5;
    
    const moodScore = Math.max(0, 100 - (avgMoodIntensity * 10));
    
    const activityScore = Math.min(100, completedActivities.length * 5 + 60);
    
    const newOverallScore = Math.round((moodScore * 0.4) + (activityScore * 0.6));
    
    setWellbeingScores({
      ...wellbeingScores,
      overall: newOverallScore,
      emotional: moodScore,
      physical: activityScore,
      history: [
        ...wellbeingScores.history,
        { date: new Date(), score: newOverallScore }
      ].slice(-10) // Keep last 10 entries
    });
  };
  
  // Get suggested activities based on current mood
  const getSuggestedActivities = () => {
    if (!currentMood) return selfCareActivities.slice(0, 3);
    
    // Logic to suggest activities based on mood
    // For now, a simple implementation
    if (currentMood.mood === 'sad' || currentMood.mood === 'depressed') {
      return selfCareActivities.filter(a => 
        a.category === 'emotional' || a.category === 'social'
      ).slice(0, 3);
    }
    
    if (currentMood.mood === 'anxious' || currentMood.mood === 'stressed') {
      return selfCareActivities.filter(a => 
        a.category === 'physical' || a.category === 'spiritual'
      ).slice(0, 3);
    }
    
    // Default suggestions
    return selfCareActivities.slice(0, 3);
  };
  
  // Get journal prompts based on current state
  const getJournalPrompts = () => {
    const defaultPrompts = [
      'What emotions have you experienced today?',
      'What are three things you're grateful for right now?',
      'What has been challenging for you recently?',
      'What has brought you comfort during this time?'
    ];
    
    // If we have mood data, add mood-specific prompts
    if (currentMood) {
      if (currentMood.mood === 'sad') {
        return [
          'What memories are bringing you comfort today?',
          'What small thing made you smile recently?',
          ...defaultPrompts
        ];
      }
      
      if (currentMood.mood === 'anxious') {
        return [
          'What specific concerns are on your mind today?',
          'What has helped you feel calm in the past?',
          ...defaultPrompts
        ];
      }
    }
    
    return defaultPrompts;
  };
  
  // Context value
  const contextValue = {
    // State
    moodEntries,
    currentMood,
    journalEntries,
    meditationSessions,
    favoriteGuidedMeditations,
    selfCareActivities,
    completedActivities,
    wellbeingScores,
    sleepData,
    resources,
    savedResources,
    
    // Functions
    addMoodEntry,
    addJournalEntry,
    completeMeditationSession,
    toggleFavoriteMeditation,
    completeActivity,
    scheduleActivity,
    saveResource,
    removeSavedResource,
    getSuggestedActivities,
    getJournalPrompts
  };
  
  return (
    <SelfCareContext.Provider value={contextValue}>
      {children}
    </SelfCareContext.Provider>
  );
};
