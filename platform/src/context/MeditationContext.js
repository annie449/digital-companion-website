import React, { createContext, useState, useEffect, useCallback } from 'react';

// Create the Meditation Context
export const MeditationContext = createContext();

/**
 * MeditationProvider Component
 * 
 * Provides meditation content management functionality including:
 * - Meditation library management
 * - Favorites and history tracking
 * - Download management for offline use
 * - Session logging and analytics
 * - Content attribution handling
 */
export const MeditationProvider = ({ children }) => {
  // State for meditation library
  const [meditations, setMeditations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // User-specific state
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);
  const [downloads, setDownloads] = useState([]);
  
  // Fetch meditation library on component mount
  useEffect(() => {
    const fetchMeditations = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, this would be an API call
        // For now, we'll simulate with local data
        const response = await fetch('/api/meditations');
        
        if (!response.ok) {
          throw new Error('Failed to fetch meditation library');
        }
        
        const data = await response.json();
        setMeditations(data.meditations);
        setCategories(data.categories);
        
        // Load user-specific data from localStorage
        loadUserData();
      } catch (err) {
        setError(err.message);
        console.error('Error fetching meditation library:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Simulate API with mock data for development
    const mockMeditationData = () => {
      // This would be replaced with actual API calls in production
      const mockMeditations = [
        {
          id: "grief-healing-journey",
          title: "Healing Through Grief Meditation",
          creator: {
            name: "Michael Sealey",
            url: "https://michael-sealey.com"
          },
          duration: 1800, // 30 minutes
          category: ["grief-specific", "healing-journey"],
          tags: ["grief", "healing", "compassion"],
          source: {
            type: "youtube",
            url: "https://www.youtube.com/watch?v=lw8n-55ciYY",
            license: "Standard YouTube License"
          },
          attribution: {
            text: "Created by Michael Sealey. Used with permission.",
            display: ["player", "library", "download"]
          },
          content: {
            audio_url: "/assets/meditations/audio/healing-grief-guided-meditation.mp3",
            image_url: "/assets/meditations/images/healing-journey.jpg",
            transcript: "/assets/meditations/transcripts/healing-grief-transcript.txt"
          },
          recommendations: {
            grief_stage: ["early", "middle"],
            time_of_day: ["evening"],
            emotional_state: ["overwhelmed", "sad"]
          }
        },
        {
          id: "letting-go-grief",
          title: "Letting Go of Grief",
          creator: {
            name: "Great Meditation",
            url: "https://greatmeditation.com"
          },
          duration: 903, // 15:03 minutes
          category: ["grief-specific", "coping-with-loss"],
          tags: ["letting go", "acceptance", "healing"],
          source: {
            type: "youtube",
            url: "https://www.youtube.com/watch?v=PaYimwTNA3E",
            license: "Standard YouTube License"
          },
          attribution: {
            text: "Created by Great Meditation. Used with permission.",
            display: ["player", "library", "download"]
          },
          content: {
            audio_url: "/assets/meditations/audio/letting-go-grief.mp3",
            image_url: "/assets/meditations/images/letting-go.jpg",
            transcript: null
          },
          recommendations: {
            grief_stage: ["middle", "ongoing"],
            time_of_day: ["any"],
            emotional_state: ["stuck", "reflective"]
          }
        },
        {
          id: "grief-loss-meditation",
          title: "Grief & Loss Meditation",
          creator: {
            name: "The Honest Guys",
            url: "https://thehonestguys.co.uk"
          },
          duration: 621, // 10:21 minutes
          category: ["grief-specific", "coping-with-loss"],
          tags: ["grief", "loss", "comfort"],
          source: {
            type: "youtube",
            url: "https://www.youtube.com/watch?v=Zu3PSyn5MSI",
            license: "Standard YouTube License"
          },
          attribution: {
            text: "Created by The Honest Guys. Used with permission.",
            display: ["player", "library", "download"]
          },
          content: {
            audio_url: "/assets/meditations/audio/grief-loss-meditation.mp3",
            image_url: "/assets/meditations/images/grief-loss.jpg",
            transcript: null
          },
          recommendations: {
            grief_stage: ["early", "middle", "ongoing"],
            time_of_day: ["evening", "night"],
            emotional_state: ["anxious", "sad", "overwhelmed"]
          }
        },
        {
          id: "compassionate-breathing",
          title: "Compassionate Breathing",
          creator: {
            name: "VA Mindfulness Coach",
            url: "https://mobile.va.gov/app/mindfulness-coach"
          },
          duration: 312, // 5:12 minutes
          category: ["mindfulness", "breathing-exercises"],
          tags: ["breathing", "compassion", "short"],
          source: {
            type: "public-domain",
            url: "https://mobile.va.gov/app/mindfulness-coach",
            license: "Public Domain"
          },
          attribution: {
            text: "Produced by the VA Mindfulness Coach program. Public domain.",
            display: ["player", "library"]
          },
          content: {
            audio_url: "/assets/meditations/audio/compassionate-breathing.mp3",
            image_url: "/assets/meditations/images/breathing.jpg",
            transcript: "/assets/meditations/transcripts/compassionate-breathing.txt"
          },
          recommendations: {
            grief_stage: ["any"],
            time_of_day: ["morning", "any"],
            emotional_state: ["anxious", "overwhelmed"]
          }
        },
        {
          id: "self-compassion-grief",
          title: "Self-Compassion in Grief",
          creator: {
            name: "Sean Fargo",
            url: "https://mindfulnessexercises.com"
          },
          duration: 585, // 9:45 minutes
          category: ["grief-specific", "emotional-support"],
          tags: ["self-compassion", "kindness", "healing"],
          source: {
            type: "creative-commons",
            url: "https://mindfulnessexercises.com/free-resources",
            license: "CC BY-NC-ND 4.0"
          },
          attribution: {
            text: "Created by Sean Fargo. Licensed under CC BY-NC-ND 4.0.",
            display: ["player", "library", "download"]
          },
          content: {
            audio_url: "/assets/meditations/audio/self-compassion-grief.mp3",
            image_url: "/assets/meditations/images/self-compassion.jpg",
            transcript: "/assets/meditations/transcripts/self-compassion-grief.txt"
          },
          recommendations: {
            grief_stage: ["any"],
            time_of_day: ["any"],
            emotional_state: ["self-critical", "sad", "overwhelmed"]
          }
        }
      ];
      
      const mockCategories = [
        {
          id: "grief-specific",
          name: "Grief & Loss",
          description: "Meditations specifically designed for grief and loss",
          subcategories: ["coping-with-loss", "healing-journey", "remembrance"]
        },
        {
          id: "emotional-support",
          name: "Emotional Support",
          description: "Support for difficult emotions",
          subcategories: ["anxiety-relief", "sleep-support", "stress-reduction"]
        },
        {
          id: "mindfulness",
          name: "Mindfulness",
          description: "Present moment awareness practices",
          subcategories: ["breathing-exercises", "body-scan", "present-moment"]
        }
      ];
      
      setTimeout(() => {
        setMeditations(mockMeditations);
        setCategories(mockCategories);
        setIsLoading(false);
      }, 1000); // Simulate network delay
    };
    
    // Use mock data for now
    mockMeditationData();
    
    // In production, use this:
    // fetchMeditations();
  }, []);
  
  // Load user data from localStorage
  const loadUserData = useCallback(() => {
    try {
      const storedFavorites = localStorage.getItem('meditation_favorites');
      const storedHistory = localStorage.getItem('meditation_history');
      const storedDownloads = localStorage.getItem('meditation_downloads');
      
      if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
      if (storedHistory) setHistory(JSON.parse(storedHistory));
      if (storedDownloads) setDownloads(JSON.parse(storedDownloads));
    } catch (err) {
      console.error('Error loading user meditation data:', err);
    }
  }, []);
  
  // Save user data to localStorage
  const saveUserData = useCallback(() => {
    try {
      localStorage.setItem('meditation_favorites', JSON.stringify(favorites));
      localStorage.setItem('meditation_history', JSON.stringify(history));
      localStorage.setItem('meditation_downloads', JSON.stringify(downloads));
    } catch (err) {
      console.error('Error saving user meditation data:', err);
    }
  }, [favorites, history, downloads]);
  
  // Update localStorage when user data changes
  useEffect(() => {
    saveUserData();
  }, [favorites, history, downloads, saveUserData]);
  
  // Get meditation by ID
  const getMeditationById = useCallback((id) => {
    return meditations.find(meditation => meditation.id === id) || null;
  }, [meditations]);
  
  // Get meditations by category
  const getMeditationsByCategory = useCallback((categoryId) => {
    return meditations.filter(meditation => 
      meditation.category.includes(categoryId)
    );
  }, [meditations]);
  
  // Get meditations by tag
  const getMeditationsByTag = useCallback((tag) => {
    return meditations.filter(meditation => 
      meditation.tags.includes(tag)
    );
  }, [meditations]);
  
  // Search meditations
  const searchMeditations = useCallback((query) => {
    const searchTerm = query.toLowerCase();
    return meditations.filter(meditation => 
      meditation.title.toLowerCase().includes(searchTerm) ||
      meditation.creator.name.toLowerCase().includes(searchTerm) ||
      meditation.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }, [meditations]);
  
  // Get recommended meditations based on user state
  const getRecommendedMeditations = useCallback((userState = {}) => {
    const { grief_stage, time_of_day, emotional_state } = userState;
    
    // Filter meditations that match user state
    let recommended = meditations;
    
    if (grief_stage) {
      recommended = recommended.filter(meditation => 
        meditation.recommendations.grief_stage.includes(grief_stage) ||
        meditation.recommendations.grief_stage.includes('any')
      );
    }
    
    if (time_of_day) {
      recommended = recommended.filter(meditation => 
        meditation.recommendations.time_of_day.includes(time_of_day) ||
        meditation.recommendations.time_of_day.includes('any')
      );
    }
    
    if (emotional_state) {
      recommended = recommended.filter(meditation => 
        meditation.recommendations.emotional_state.includes(emotional_state) ||
        meditation.recommendations.emotional_state.includes('any')
      );
    }
    
    // If no specific recommendations, return popular meditations
    if (recommended.length === 0) {
      // Sort by most played (from history)
      const playCountMap = {};
      history.forEach(session => {
        playCountMap[session.meditationId] = (playCountMap[session.meditationId] || 0) + 1;
      });
      
      return meditations
        .slice(0, 5)
        .sort((a, b) => (playCountMap[b.id] || 0) - (playCountMap[a.id] || 0));
    }
    
    return recommended;
  }, [meditations, history]);
  
  // Add to favorites
  const addToFavorites = useCallback((meditationId) => {
    if (!favorites.includes(meditationId)) {
      setFavorites(prev => [...prev, meditationId]);
    }
  }, [favorites]);
  
  // Remove from favorites
  const removeFromFavorite = useCallback((meditationId) => {
    setFavorites(prev => prev.filter(id => id !== meditationId));
  }, []);
  
  // Check if meditation is favorited
  const checkIfFavorite = useCallback((meditationId) => {
    return favorites.includes(meditationId);
  }, [favorites]);
  
  // Get favorite meditations
  const getFavoriteMeditations = useCallback(() => {
    return meditations.filter(meditation => favorites.includes(meditation.id));
  }, [meditations, favorites]);
  
  // Download meditation for offline use
  const downloadMeditation = useCallback(async (meditationId) => {
    // In a real implementation, this would download the audio file
    // For now, we'll just mark it as downloaded
    if (!downloads.includes(meditationId)) {
      setDownloads(prev => [...prev, meditationId]);
    }
    
    // Simulate download success
    return Promise.resolve({ success: true });
  }, [downloads]);
  
  // Check if meditation is downloaded
  const checkIfDownloaded = useCallback((meditationId) => {
    return downloads.includes(meditationId);
  }, [downloads]);
  
  // Get downloaded meditations
  const getDownloadedMeditations = useCallback(() => {
    return meditations.filter(meditation => downloads.includes(meditation.id));
  }, [meditations, downloads]);
  
  // Log meditation session
  const logMeditationSession = useCallback((sessionData) => {
    const newSession = {
      ...sessionData,
      id: `session-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    
    setHistory(prev => [newSession, ...prev]);
    
    // In a real implementation, this would also send analytics data
    // to the server for tracking user engagement
  }, []);
  
  // Get user meditation history
  const getMeditationHistory = useCallback(() => {
    // Map history sessions to include full meditation data
    return history.map(session => {
      const meditation = getMeditationById(session.meditationId);
      return {
        ...session,
        meditation
      };
    });
  }, [history, getMeditationById]);
  
  // Get meditation stats
  const getMeditationStats = useCallback(() => {
    const completedSessions = history.filter(session => session.completed);
    
    const totalMinutes = completedSessions.reduce(
      (total, session) => total + (session.duration / 60), 
      0
    );
    
    const sessionsThisWeek = completedSessions.filter(session => {
      const sessionDate = new Date(session.timestamp);
      const now = new Date();
      const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
      return sessionDate >= oneWeekAgo;
    });
    
    const minutesThisWeek = sessionsThisWeek.reduce(
      (total, session) => total + (session.duration / 60), 
      0
    );
    
    return {
      totalSessions: completedSessions.length,
      totalMinutes: Math.round(totalMinutes),
      sessionsThisWeek: sessionsThisWeek.length,
      minutesThisWeek: Math.round(minutesThisWeek),
      favoriteCount: favorites.length,
      downloadCount: downloads.length
    };
  }, [history, favorites, downloads]);
  
  // Context value
  const contextValue = {
    // Library data
    meditations,
    categories,
    isLoading,
    error,
    
    // Getters
    getMeditationById,
    getMeditationsByCategory,
    getMeditationsByTag,
    searchMeditations,
    getRecommendedMeditations,
    
    // Favorites
    addToFavorites,
    removeFromFavorite,
    checkIfFavorite,
    getFavoriteMeditations,
    
    // Downloads
    downloadMeditation,
    checkIfDownloaded,
    getDownloadedMeditations,
    
    // History and stats
    logMeditationSession,
    getMeditationHistory,
    getMeditationStats
  };
  
  return (
    <MeditationContext.Provider value={contextValue}>
      {children}
    </MeditationContext.Provider>
  );
};

export default MeditationProvider;
