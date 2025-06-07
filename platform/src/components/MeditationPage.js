import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';
import './MeditationPage.css';

const MeditationPage = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('featured');
  const [currentMeditation, setCurrentMeditation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sound, setSound] = useState(null);
  const [progressInterval, setProgressInterval] = useState(null);
  
  const meditations = [
    {
      id: '1',
      title: 'Grief & Loss Meditation',
      description: 'A gentle meditation to help process feelings of grief and loss.',
      duration: '15 min',
      category: 'Grief',
      image: require('../assets/images/meditation_grief.jpg'),
      audioFile: 'meditation_grief.mp3',
      featured: true,
    },
    {
      id: '2',
      title: 'Finding Peace',
      description: 'Cultivate inner peace and acceptance during difficult times.',
      duration: '10 min',
      category: 'Peace',
      image: require('../assets/images/meditation_peace.jpg'),
      audioFile: 'meditation_peace.mp3',
      featured: true,
    },
    {
      id: '3',
      title: 'Healing Meditation',
      description: 'Support emotional healing through guided visualization.',
      duration: '20 min',
      category: 'Healing',
      image: require('../assets/images/meditation_healing.jpg'),
      audioFile: 'meditation_healing.mp3',
      featured: false,
    },
    {
      id: '4',
      title: 'Sleep & Rest',
      description: 'Find restful sleep during times of emotional distress.',
      duration: '30 min',
      category: 'Sleep',
      image: require('../assets/images/meditation_sleep.jpg'),
      audioFile: 'meditation_sleep.mp3',
      featured: true,
    },
    {
      id: '5',
      title: 'Morning Reflection',
      description: 'Start your day with mindfulness and intention.',
      duration: '8 min',
      category: 'Mindfulness',
      image: require('../assets/images/meditation_morning.jpg'),
      audioFile: 'meditation_morning.mp3',
      featured: false,
    },
    {
      id: '6',
      title: 'Anxiety Relief',
      description: 'Calm anxious thoughts and find emotional stability.',
      duration: '12 min',
      category: 'Anxiety',
      image: require('../assets/images/meditation_anxiety.jpg'),
      audioFile: 'meditation_anxiety.mp3',
      featured: false,
    },
    {
      id: '7',
      title: 'Gratitude Practice',
      description: 'Cultivate gratitude even during difficult times.',
      duration: '10 min',
      category: 'Gratitude',
      image: require('../assets/images/meditation_gratitude.jpg'),
      audioFile: 'meditation_gratitude.mp3',
      featured: false,
    },
    {
      id: '8',
      title: 'Remembrance',
      description: 'Honor and connect with the memory of loved ones.',
      duration: '15 min',
      category: 'Memory',
      image: require('../assets/images/meditation_remembrance.jpg'),
      audioFile: 'meditation_remembrance.mp3',
      featured: true,
    },
  ];

  // Load user data on component mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('meditationFavorites');
        const storedRecent = await AsyncStorage.getItem('meditationRecent');
        
        if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
        if (storedRecent) setRecentlyPlayed(JSON.parse(storedRecent));
      } catch (error) {
        console.error('Error loading meditation data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUserData();
    
    // Cleanup function
    return () => {
      if (sound) {
        sound.release();
      }
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, []);

  // Save user data when it changes
  useEffect(() => {
    const saveUserData = async () => {
      if (!loading) {
        try {
          await AsyncStorage.setItem('meditationFavorites', JSON.stringify(favorites));
          await AsyncStorage.setItem('meditationRecent', JSON.stringify(recentlyPlayed));
        } catch (error) {
          console.error('Error saving meditation data:', error);
        }
      }
    };
    
    saveUserData();
  }, [favorites, recentlyPlayed, loading]);

  const handlePlayMeditation = (meditation) => {
    // In a real app, this would load and play the actual audio file
    // For this example, we'll simulate the audio playback
    
    // Stop current audio if playing
    if (sound) {
      sound.stop();
      sound.release();
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    }
    
    setCurrentMeditation(meditation);
    
    // Simulate loading audio
    setLoading(true);
    setTimeout(() => {
      // Create new sound instance (in a real app)
      // const newSound = new Sound(meditation.audioFile, Sound.MAIN_BUNDLE, (error) => {
      //   if (error) {
      //     console.error('Failed to load sound', error);
      //     Alert.alert('Error', 'Failed to load meditation audio. Please try again.');
      //     setLoading(false);
      //     return;
      //   }
      //   
      //   setSound(newSound);
      //   setDuration(newSound.getDuration());
      //   newSound.play((success) => {
      //     if (!success) {
      //       Alert.alert('Playback Error', 'There was an error playing this meditation.');
      //     }
      //     setIsPlaying(false);
      //   });
      //   setIsPlaying(true);
      //   
      //   // Update progress
      //   const interval = setInterval(() => {
      //     newSound.getCurrentTime((seconds) => {
      //       setProgress(seconds);
      //     });
      //   }, 1000);
      //   setProgressInterval(interval);
      // });
      
      // For simulation purposes
      const meditationDuration = parseInt(meditation.duration.split(' ')[0]) * 60; // Convert minutes to seconds
      setDuration(meditationDuration);
      setProgress(0);
      setIsPlaying(true);
      
      // Simulate progress updates
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= meditationDuration) {
            clearInterval(interval);
            setIsPlaying(false);
            return meditationDuration;
          }
          return prev + 1;
        });
      }, 1000);
      setProgressInterval(interval);
      
      setLoading(false);
      
      // Add to recently played
      const updatedRecent = [meditation.id, ...recentlyPlayed.filter(id => id !== meditation.id)].slice(0, 5);
      setRecentlyPlayed(updatedRecent);
    }, 1500);
  };

  const handleTogglePlayPause = () => {
    if (!currentMeditation) return;
    
    if (isPlaying) {
      // In a real app: sound.pause();
      clearInterval(progressInterval);
    } else {
      // In a real app: sound.play();
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= duration) {
            clearInterval(interval);
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
      setProgressInterval(interval);
    }
    
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value) => {
    setProgress(value);
    // In a real app: sound.setCurrentTime(value);
  };

  const handleToggleFavorite = (meditationId) => {
    if (favorites.includes(meditationId)) {
      setFavorites(favorites.filter(id => id !== meditationId));
    } else {
      setFavorites([...favorites, meditationId]);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const renderFeaturedTab = () => {
    const featuredMeditations = meditations.filter(m => m.featured);
    
    return (
      <View style={styles.tabContent}>
        <Text style={styles.sectionTitle}>Featured Meditations</Text>
        <Text style={styles.sectionSubtitle}>Curated meditations to support your grief journey</Text>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredScrollContent}
        >
          {featuredMeditations.map((meditation) => (
            <TouchableOpacity 
              key={meditation.id}
              style={styles.featuredCard}
              onPress={() => handlePlayMeditation(meditation)}
            >
              <Image source={meditation.image} style={styles.featuredImage} />
              <View style={styles.featuredContent}>
                <Text style={styles.featuredTitle}>{meditation.title}</Text>
                <Text style={styles.featuredDuration}>{meditation.duration}</Text>
              </View>
              <TouchableOpacity 
                style={styles.favoriteButton}
                onPress={() => handleToggleFavorite(meditation.id)}
              >
                <Icon 
                  name={favorites.includes(meditation.id) ? "heart" : "heart-outline"} 
                  size={24} 
                  color={favorites.includes(meditation.id) ? "#e91e63" : "#6B5B95"} 
                />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoriesGrid}>
          {['Grief', 'Peace', 'Healing', 'Sleep', 'Mindfulness', 'Anxiety'].map((category) => (
            <TouchableOpacity 
              key={category}
              style={styles.categoryCard}
              onPress={() => setActiveTab('all')}
            >
              <Text style={styles.categoryTitle}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {recentlyPlayed.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Recently Played</Text>
            <View style={styles.recentList}>
              {recentlyPlayed.map((id) => {
                const meditation = meditations.find(m => m.id === id);
                if (!meditation) return null;
                
                return (
                  <TouchableOpacity 
                    key={meditation.id}
                    style={styles.recentItem}
                    onPress={() => handlePlayMeditation(meditation)}
                  >
                    <Image source={meditation.image} style={styles.recentImage} />
                    <View style={styles.recentContent}>
                      <Text style={styles.recentTitle}>{meditation.title}</Text>
                      <Text style={styles.recentCategory}>{meditation.category} • {meditation.duration}</Text>
                    </View>
                    <TouchableOpacity 
                      style={styles.recentPlayButton}
                      onPress={() => handlePlayMeditation(meditation)}
                    >
                      <Icon name="play" size={24} color="#6B5B95" />
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}
      </View>
    );
  };

  const renderAllTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={24} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search meditations..."
          placeholderTextColor="#888"
        />
      </View>
      
      <View style={styles.filterContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}
        >
          <TouchableOpacity style={[styles.filterChip, styles.activeFilterChip]}>
            <Text style={styles.activeFilterText}>All</Text>
          </TouchableOpacity>
          {['Grief', 'Peace', 'Healing', 'Sleep', 'Mindfulness', 'Anxiety', 'Gratitude', 'Memory'].map((category) => (
            <TouchableOpacity key={category} style={styles.filterChip}>
              <Text style={styles.filterText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <View style={styles.meditationGrid}>
        {meditations.map((meditation) => (
          <TouchableOpacity 
            key={meditation.id}
            style={styles.meditationCard}
            onPress={() => handlePlayMeditation(meditation)}
          >
            <Image source={meditation.image} style={styles.meditationImage} />
            <View style={styles.meditationContent}>
              <Text style={styles.meditationTitle}>{meditation.title}</Text>
              <Text style={styles.meditationCategory}>{meditation.category}</Text>
              <Text style={styles.meditationDuration}>{meditation.duration}</Text>
            </View>
            <TouchableOpacity 
              style={styles.favoriteButton}
              onPress={() => handleToggleFavorite(meditation.id)}
            >
              <Icon 
                name={favorites.includes(meditation.id) ? "heart" : "heart-outline"} 
                size={20} 
                color={favorites.includes(meditation.id) ? "#e91e63" : "#6B5B95"} 
              />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderFavoritesTab = () => (
    <View style={styles.tabContent}>
      {favorites.length > 0 ? (
        <View style={styles.meditationGrid}>
          {meditations
            .filter(meditation => favorites.includes(meditation.id))
            .map((meditation) => (
              <TouchableOpacity 
                key={meditation.id}
                style={styles.meditationCard}
                onPress={() => handlePlayMeditation(meditation)}
              >
                <Image source={meditation.image} style={styles.meditationImage} />
                <View style={styles.meditationContent}>
                  <Text style={styles.meditationTitle}>{meditation.title}</Text>
                  <Text style={styles.meditationCategory}>{meditation.category}</Text>
                  <Text style={styles.meditationDuration}>{meditation.duration}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.favoriteButton}
                  onPress={() => handleToggleFavorite(meditation.id)}
                >
                  <Icon name="heart" size={20} color="#e91e63" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Icon name="heart-outline" size={60} color="#6B5B95" style={styles.emptyStateIcon} />
          <Text style={styles.emptyStateText}>No favorites yet</Text>
          <Text style={styles.emptyStateSubtext}>
            Add meditations to your favorites for quick access
          </Text>
          <TouchableOpacity 
            style={styles.emptyStateButton}
            onPress={() => setActiveTab('featured')}
          >
            <Text style={styles.emptyStateButtonText}>Browse Meditations</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderDownloadsTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.emptyState}>
        <Icon name="download-outline" size={60} color="#6B5B95" style={styles.emptyStateIcon} />
        <Text style={styles.emptyStateText}>No downloads yet</Text>
        <Text style={styles.emptyStateSubtext}>
          Download meditations to listen offline
        </Text>
        <TouchableOpacity 
          style={styles.emptyStateButton}
          onPress={() => setActiveTab('featured')}
        >
          <Text style={styles.emptyStateButtonText}>Browse Meditations</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="#6B5B95" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meditation</Text>
        <TouchableOpacity style={styles.helpButton}>
          <Icon name="help-circle-outline" size={24} color="#6B5B95" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'featured' && styles.activeTabButton]}
          onPress={() => setActiveTab('featured')}
        >
          <Icon 
            name="star-outline" 
            size={24} 
            color={activeTab === 'featured' ? '#6B5B95' : '#888'} 
          />
          <Text style={[styles.tabText, activeTab === 'featured' && styles.activeTabText]}>
            Featured
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'all' && styles.activeTabButton]}
          onPress={() => setActiveTab('all')}
        >
          <Icon 
            name="format-list-bulleted" 
            size={24} 
            color={activeTab === 'all' ? '#6B5B95' : '#888'} 
          />
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
            All
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'favorites' && styles.activeTabButton]}
          onPress={() => setActiveTab('favorites')}
        >
          <Icon 
            name="heart-outline" 
            size={24} 
            color={activeTab === 'favorites' ? '#6B5B95' : '#888'} 
          />
          <Text style={[styles.tabText, activeTab === 'favorites' && styles.activeTabText]}>
            Favorites
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'downloads' && styles.activeTabButton]}
          onPress={() => setActiveTab('downloads')}
        >
          <Icon 
            name="download-outline" 
            size={24} 
            color={activeTab === 'downloads' ? '#6B5B95' : '#888'} 
          />
          <Text style={[styles.tabText, activeTab === 'downloads' && styles.activeTabText]}>
            Downloads
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {loading && !currentMeditation ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading meditations...</Text>
          </View>
        ) : (
          <>
            {activeTab === 'featured' && renderFeaturedTab()}
            {activeTab === 'all' && renderAllTab()}
            {activeTab === 'favorites' && renderFavoritesTab()}
            {activeTab === 'downloads' && renderDownloadsTab()}
          </>
        )}
      </ScrollView>
      
      {currentMeditation && (
        <View style={styles.playerContainer}>
          <View style={styles.playerContent}>
            <Image source={currentMeditation.image} style={styles.playerImage} />
            <View style={styles.playerInfo}>
              <Text style={styles.playerTitle}>{currentMeditation.title}</Text>
              <Text style={styles.playerCategory}>{currentMeditation.category}</Text>
            </View>
            <TouchableOpacity 
              style={styles.playerFavoriteButton}
              onPress={() => handleToggleFavorite(currentMeditation.id)}
            >
              <Icon 
                name={favorites.includes(currentMeditation.id) ? "heart" : "heart-outline"} 
                size={24} 
                color={favorites.includes(currentMeditation.id) ? "#e91e63" : "#6B5B95"} 
              />
            </TouchableOpacity>
          </View>
          
          <View style={styles.playerControls}>
            <View style={styles.progressContainer}>
              <Slider
                style={styles.progressSlider}
                minimumValue={0}
                maximumValue={duration}
                value={progress}
                onSlidingComplete={handleSeek}
                minimumTrackTintColor="#6B5B95"
                maximumTrackTintColor="#ddd"
                thumbTintColor="#6B5B95"
              />
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{formatTime(progress)}</Text>
                <Text style={styles.timeText}>{formatTime(duration)}</Text>
              </View>
            </View>
            
            <View style={styles.controlButtons}>
              <TouchableOpacity style={styles.controlButton}>
                <Icon name="rewind-10" size={32} color="#6B5B95" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.playPauseButton}
                onPress={handleTogglePlayPause}
              >
                <Icon 
                  name={isPlaying ? "pause" : "play"} 
                  size={32} 
                  color="#fff" 
                />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.controlButton}>
                <Icon name="fast-forward-10" size={32} color="#6B5B95" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  helpButton: {
    padding: 8,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: '#6B5B95',
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    color: '#888',
  },
  activeTabText: {
    color: '#6B5B95',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  tabContent: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  
  // Featured Tab Styles
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  featuredScrollContent: {
    paddingBottom: 16,
  },
  featuredCard: {
    width: 280,
    height: 160,
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  featuredContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  featuredDuration: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  categoryCard: {
    width: '48%',
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B5B95',
  },
  recentList: {
    marginBottom: 24,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recentImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  recentContent: {
    flex: 1,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  recentCategory: {
    fontSize: 14,
    color: '#666',
  },
  recentPlayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0edf6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // All Tab Styles
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterScrollContent: {
    paddingBottom: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0edf6',
    marginRight: 8,
  },
  activeFilterChip: {
    backgroundColor: '#6B5B95',
  },
  filterText: {
    fontSize: 14,
    color: '#6B5B95',
  },
  activeFilterText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  meditationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  meditationCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  meditationImage: {
    width: '100%',
    height: 120,
  },
  meditationContent: {
    padding: 12,
  },
  meditationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  meditationCategory: {
    fontSize: 14,
    color: '#6B5B95',
    marginBottom: 4,
  },
  meditationDuration: {
    fontSize: 14,
    color: '#666',
  },
  
  // Empty State Styles
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 16,
  },
  emptyStateIcon: {
    marginBottom: 16,
    opacity: 0.6,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyStateButton: {
    backgroundColor: '#6B5B95',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  
  // Player Styles
  playerContainer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  playerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  playerImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  playerInfo: {
    flex: 1,
  },
  playerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  playerCategory: {
    fontSize: 14,
    color: '#666',
  },
  playerFavoriteButton: {
    padding: 8,
  },
  playerControls: {
    alignItems: 'center',
  },
  progressContainer: {
    width: '100%',
    marginBottom: 16,
  },
  progressSlider: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: -12,
  },
  timeText: {
    fontSize: 12,
    color: '#666',
  },
  controlButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButton: {
    padding: 12,
  },
  playPauseButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#6B5B95',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 24,
  },
});

export default MeditationPage;
