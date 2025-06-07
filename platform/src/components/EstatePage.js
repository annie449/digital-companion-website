import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import './EstatePage.css';

const EstatePage = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('overview');
  const [assets, setAssets] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newAsset, setNewAsset] = useState({ name: '', type: '', value: '', notes: '' });
  const [showAddAssetForm, setShowAddAssetForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch estate data on component mount
  useEffect(() => {
    const fetchEstateData = async () => {
      try {
        // In a real app, this would fetch from an API
        // For now, we'll simulate with AsyncStorage
        const storedAssets = await AsyncStorage.getItem('estateAssets');
        const storedDocuments = await AsyncStorage.getItem('estateDocuments');
        const storedTasks = await AsyncStorage.getItem('estateTasks');
        
        if (storedAssets) setAssets(JSON.parse(storedAssets));
        if (storedDocuments) setDocuments(JSON.parse(storedDocuments));
        if (storedTasks) setTasks(JSON.parse(storedTasks));
        
        // If no data exists, populate with sample data
        if (!storedAssets) {
          const sampleAssets = [
            { id: '1', name: 'Primary Residence', type: 'Property', value: '£350,000', notes: 'Joint ownership with spouse' },
            { id: '2', name: 'Savings Account', type: 'Financial', value: '£45,000', notes: 'Barclays Account #****1234' },
            { id: '3', name: 'Investment Portfolio', type: 'Financial', value: '£120,000', notes: 'Managed by Fidelity' },
          ];
          setAssets(sampleAssets);
          await AsyncStorage.setItem('estateAssets', JSON.stringify(sampleAssets));
        }
        
        if (!storedDocuments) {
          const sampleDocuments = [
            { id: '1', name: 'Will', dateAdded: '2024-03-15', status: 'Verified' },
            { id: '2', name: 'Property Deed', dateAdded: '2024-03-20', status: 'Pending Review' },
            { id: '3', name: 'Life Insurance Policy', dateAdded: '2024-04-02', status: 'Verified' },
          ];
          setDocuments(sampleDocuments);
          await AsyncStorage.setItem('estateDocuments', JSON.stringify(sampleDocuments));
        }
        
        if (!storedTasks) {
          const sampleTasks = [
            { id: '1', title: 'Locate original will', completed: true, dueDate: '2024-03-10' },
            { id: '2', title: 'Contact pension provider', completed: false, dueDate: '2024-06-15' },
            { id: '3', title: 'Update beneficiary information', completed: false, dueDate: '2024-06-30' },
          ];
          setTasks(sampleTasks);
          await AsyncStorage.setItem('estateTasks', JSON.stringify(sampleTasks));
        }
      } catch (error) {
        console.error('Error fetching estate data:', error);
        Alert.alert('Error', 'Failed to load estate information. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEstateData();
  }, []);

  // Save data when it changes
  useEffect(() => {
    const saveData = async () => {
      if (!loading) {
        try {
          await AsyncStorage.setItem('estateAssets', JSON.stringify(assets));
          await AsyncStorage.setItem('estateDocuments', JSON.stringify(documents));
          await AsyncStorage.setItem('estateTasks', JSON.stringify(tasks));
        } catch (error) {
          console.error('Error saving estate data:', error);
        }
      }
    };
    
    saveData();
  }, [assets, documents, tasks, loading]);

  const handleAddAsset = () => {
    if (!newAsset.name || !newAsset.type) {
      Alert.alert('Missing Information', 'Please provide at least a name and type for the asset.');
      return;
    }
    
    const asset = {
      id: Date.now().toString(),
      ...newAsset
    };
    
    setAssets([...assets, asset]);
    setNewAsset({ name: '', type: '', value: '', notes: '' });
    setShowAddAssetForm(false);
    
    Alert.alert('Success', 'Asset added successfully.');
  };

  const handleToggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDocumentUpload = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      
      const newDocument = {
        id: Date.now().toString(),
        name: result[0].name,
        dateAdded: new Date().toISOString().split('T')[0],
        status: 'Pending Review',
        uri: result[0].uri
      };
      
      setDocuments([...documents, newDocument]);
      Alert.alert('Success', 'Document uploaded successfully. It will be reviewed shortly.');
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        Alert.alert('Error', 'Failed to upload document. Please try again.');
        console.error(err);
      }
    }
  };

  const renderOverviewTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Estate Summary</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{assets.length}</Text>
            <Text style={styles.summaryLabel}>Assets</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{documents.length}</Text>
            <Text style={styles.summaryLabel}>Documents</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>
              {tasks.filter(task => task.completed).length}/{tasks.length}
            </Text>
            <Text style={styles.summaryLabel}>Tasks Completed</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.recentActivityCard}>
        <Text style={styles.cardTitle}>Recent Activity</Text>
        <View style={styles.activityList}>
          {documents.length > 0 && (
            <View style={styles.activityItem}>
              <Icon name="file-document-outline" size={24} color="#6B5B95" />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Document Added</Text>
                <Text style={styles.activityDescription}>
                  {documents[documents.length - 1].name} was added on {documents[documents.length - 1].dateAdded}
                </Text>
              </View>
            </View>
          )}
          
          {assets.length > 0 && (
            <View style={styles.activityItem}>
              <Icon name="bank-outline" size={24} color="#6B5B95" />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Asset Updated</Text>
                <Text style={styles.activityDescription}>
                  {assets[assets.length - 1].name} ({assets[assets.length - 1].type}) was added to your estate
                </Text>
              </View>
            </View>
          )}
          
          {tasks.some(task => task.completed) && (
            <View style={styles.activityItem}>
              <Icon name="check-circle-outline" size={24} color="#6B5B95" />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Task Completed</Text>
                <Text style={styles.activityDescription}>
                  {tasks.find(task => task.completed)?.title}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => setActiveTab('assets')}
          >
            <Icon name="bank-outline" size={28} color="#6B5B95" />
            <Text style={styles.quickActionText}>Add Asset</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => setActiveTab('documents')}
          >
            <Icon name="file-upload-outline" size={28} color="#6B5B95" />
            <Text style={styles.quickActionText}>Upload Document</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => setActiveTab('tasks')}
          >
            <Icon name="clipboard-check-outline" size={28} color="#6B5B95" />
            <Text style={styles.quickActionText}>View Tasks</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('EstateReport')}
          >
            <Icon name="file-chart-outline" size={28} color="#6B5B95" />
            <Text style={styles.quickActionText}>Generate Report</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderAssetsTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Assets</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowAddAssetForm(!showAddAssetForm)}
        >
          <Text style={styles.addButtonText}>
            {showAddAssetForm ? 'Cancel' : '+ Add Asset'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {showAddAssetForm && (
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Add New Asset</Text>
          
          <View style={styles.formField}>
            <Text style={styles.formLabel}>Asset Name*</Text>
            <TextInput
              style={styles.formInput}
              value={newAsset.name}
              onChangeText={(text) => setNewAsset({...newAsset, name: text})}
              placeholder="e.g., Primary Residence, Savings Account"
            />
          </View>
          
          <View style={styles.formField}>
            <Text style={styles.formLabel}>Asset Type*</Text>
            <TextInput
              style={styles.formInput}
              value={newAsset.type}
              onChangeText={(text) => setNewAsset({...newAsset, type: text})}
              placeholder="e.g., Property, Financial, Vehicle"
            />
          </View>
          
          <View style={styles.formField}>
            <Text style={styles.formLabel}>Estimated Value</Text>
            <TextInput
              style={styles.formInput}
              value={newAsset.value}
              onChangeText={(text) => setNewAsset({...newAsset, value: text})}
              placeholder="e.g., £250,000"
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.formField}>
            <Text style={styles.formLabel}>Notes</Text>
            <TextInput
              style={[styles.formInput, styles.textArea]}
              value={newAsset.notes}
              onChangeText={(text) => setNewAsset({...newAsset, notes: text})}
              placeholder="Additional details about this asset"
              multiline
              numberOfLines={4}
            />
          </View>
          
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleAddAsset}
          >
            <Text style={styles.submitButtonText}>Save Asset</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {assets.length > 0 ? (
        <View style={styles.assetsList}>
          {assets.map((asset) => (
            <View key={asset.id} style={styles.assetCard}>
              <View style={styles.assetHeader}>
                <Text style={styles.assetName}>{asset.name}</Text>
                <Text style={styles.assetType}>{asset.type}</Text>
              </View>
              {asset.value && (
                <Text style={styles.assetValue}>Value: {asset.value}</Text>
              )}
              {asset.notes && (
                <Text style={styles.assetNotes}>{asset.notes}</Text>
              )}
              <View style={styles.assetActions}>
                <TouchableOpacity style={styles.assetActionButton}>
                  <Icon name="pencil-outline" size={20} color="#6B5B95" />
                  <Text style={styles.assetActionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.assetActionButton}>
                  <Icon name="file-document-outline" size={20} color="#6B5B95" />
                  <Text style={styles.assetActionText}>Documents</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Icon name="bank-outline" size={60} color="#6B5B95" style={styles.emptyStateIcon} />
          <Text style={styles.emptyStateText}>No assets added yet</Text>
          <Text style={styles.emptyStateSubtext}>
            Add your first asset to start building your estate inventory
          </Text>
        </View>
      )}
    </View>
  );

  const renderDocumentsTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Documents</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleDocumentUpload}
        >
          <Text style={styles.addButtonText}>+ Upload Document</Text>
        </TouchableOpacity>
      </View>
      
      {documents.length > 0 ? (
        <View style={styles.documentsList}>
          {documents.map((document) => (
            <View key={document.id} style={styles.documentCard}>
              <View style={styles.documentIcon}>
                <Icon name="file-document-outline" size={32} color="#6B5B95" />
              </View>
              <View style={styles.documentInfo}>
                <Text style={styles.documentName}>{document.name}</Text>
                <Text style={styles.documentDate}>Added: {document.dateAdded}</Text>
                <View style={[
                  styles.statusBadge,
                  document.status === 'Verified' 
                    ? styles.verifiedBadge 
                    : styles.pendingBadge
                ]}>
                  <Text style={styles.statusText}>{document.status}</Text>
                </View>
              </View>
              <View style={styles.documentActions}>
                <TouchableOpacity style={styles.documentActionButton}>
                  <Icon name="eye-outline" size={24} color="#6B5B95" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.documentActionButton}>
                  <Icon name="download-outline" size={24} color="#6B5B95" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Icon name="file-document-outline" size={60} color="#6B5B95" style={styles.emptyStateIcon} />
          <Text style={styles.emptyStateText}>No documents uploaded yet</Text>
          <Text style={styles.emptyStateSubtext}>
            Upload important documents like wills, deeds, and insurance policies
          </Text>
        </View>
      )}
      
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Document Tips</Text>
        <Text style={styles.infoText}>
          Important documents to consider uploading:
        </Text>
        <View style={styles.infoList}>
          <Text style={styles.infoListItem}>• Will and testament</Text>
          <Text style={styles.infoListItem}>• Property deeds and titles</Text>
          <Text style={styles.infoListItem}>• Insurance policies</Text>
          <Text style={styles.infoListItem}>• Financial account statements</Text>
          <Text style={styles.infoListItem}>• Birth and marriage certificates</Text>
        </View>
        <Text style={styles.infoText}>
          All documents are encrypted and stored securely. Only you and your designated contacts can access them.
        </Text>
      </View>
    </View>
  );

  const renderTasksTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Estate Tasks</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add Task</Text>
        </TouchableOpacity>
      </View>
      
      {tasks.length > 0 ? (
        <View style={styles.tasksList}>
          {tasks.map((task) => (
            <TouchableOpacity 
              key={task.id} 
              style={styles.taskCard}
              onPress={() => handleToggleTaskCompletion(task.id)}
            >
              <View style={styles.taskCheckbox}>
                {task.completed ? (
                  <Icon name="checkbox-marked" size={24} color="#6B5B95" />
                ) : (
                  <Icon name="checkbox-blank-outline" size={24} color="#6B5B95" />
                )}
              </View>
              <View style={styles.taskInfo}>
                <Text style={[
                  styles.taskTitle,
                  task.completed && styles.taskCompleted
                ]}>
                  {task.title}
                </Text>
                {task.dueDate && (
                  <Text style={styles.taskDueDate}>Due: {task.dueDate}</Text>
                )}
              </View>
              <TouchableOpacity style={styles.taskActionButton}>
                <Icon name="information-outline" size={24} color="#6B5B95" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Icon name="clipboard-check-outline" size={60} color="#6B5B95" style={styles.emptyStateIcon} />
          <Text style={styles.emptyStateText}>No tasks created yet</Text>
          <Text style={styles.emptyStateSubtext}>
            Create tasks to track important estate management activities
          </Text>
        </View>
      )}
      
      <View style={styles.progressCard}>
        <Text style={styles.progressTitle}>Task Progress</Text>
        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressBar,
              { width: `${tasks.length > 0 ? (tasks.filter(t => t.completed).length / tasks.length) * 100 : 0}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {tasks.filter(t => t.completed).length} of {tasks.length} tasks completed
        </Text>
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
        <Text style={styles.headerTitle}>Estate Management</Text>
        <TouchableOpacity style={styles.helpButton}>
          <Icon name="help-circle-outline" size={24} color="#6B5B95" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'overview' && styles.activeTabButton]}
          onPress={() => setActiveTab('overview')}
        >
          <Icon 
            name="view-dashboard-outline" 
            size={24} 
            color={activeTab === 'overview' ? '#6B5B95' : '#888'} 
          />
          <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>
            Overview
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'assets' && styles.activeTabButton]}
          onPress={() => setActiveTab('assets')}
        >
          <Icon 
            name="bank-outline" 
            size={24} 
            color={activeTab === 'assets' ? '#6B5B95' : '#888'} 
          />
          <Text style={[styles.tabText, activeTab === 'assets' && styles.activeTabText]}>
            Assets
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'documents' && styles.activeTabButton]}
          onPress={() => setActiveTab('documents')}
        >
          <Icon 
            name="file-document-outline" 
            size={24} 
            color={activeTab === 'documents' ? '#6B5B95' : '#888'} 
          />
          <Text style={[styles.tabText, activeTab === 'documents' && styles.activeTabText]}>
            Documents
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'tasks' && styles.activeTabButton]}
          onPress={() => setActiveTab('tasks')}
        >
          <Icon 
            name="clipboard-check-outline" 
            size={24} 
            color={activeTab === 'tasks' ? '#6B5B95' : '#888'} 
          />
          <Text style={[styles.tabText, activeTab === 'tasks' && styles.activeTabText]}>
            Tasks
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading estate information...</Text>
          </View>
        ) : (
          <>
            {activeTab === 'overview' && renderOverviewTab()}
            {activeTab === 'assets' && renderAssetsTab()}
            {activeTab === 'documents' && renderDocumentsTab()}
            {activeTab === 'tasks' && renderTasksTab()}
          </>
        )}
      </ScrollView>
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
  
  // Overview Tab Styles
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#6B5B95',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  recentActivityCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  activityList: {
    marginTop: 8,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  activityContent: {
    marginLeft: 12,
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    color: '#666',
  },
  quickActionsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  quickActionButton: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
  
  // Assets Tab Styles
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#6B5B95',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  formField: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#6B5B95',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  assetsList: {
    marginBottom: 16,
  },
  assetCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  assetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  assetName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  assetType: {
    fontSize: 14,
    color: '#6B5B95',
    fontWeight: '500',
    backgroundColor: '#f0edf6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  assetValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  assetNotes: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  assetActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
    marginTop: 4,
  },
  assetActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  assetActionText: {
    fontSize: 14,
    color: '#6B5B95',
    marginLeft: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
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
  },
  
  // Documents Tab Styles
  documentsList: {
    marginBottom: 16,
  },
  documentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  documentIcon: {
    marginRight: 16,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  documentDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  verifiedBadge: {
    backgroundColor: '#e6f7ed',
  },
  pendingBadge: {
    backgroundColor: '#fff4e5',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  documentActions: {
    flexDirection: 'row',
  },
  documentActionButton: {
    padding: 8,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  infoList: {
    marginBottom: 12,
  },
  infoListItem: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  
  // Tasks Tab Styles
  tasksList: {
    marginBottom: 16,
  },
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  taskCheckbox: {
    marginRight: 12,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  taskDueDate: {
    fontSize: 14,
    color: '#666',
  },
  taskActionButton: {
    padding: 8,
  },
  progressCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6B5B95',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default EstatePage;
