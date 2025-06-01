import React, { createContext, useState, useEffect } from 'react';

// Create the Digital Companion Context
export const DigitalCompanionContext = createContext();

// Create the Digital Companion Provider Component
export const DigitalCompanionProvider = ({ children }) => {
  // User data state
  const [user, setUser] = useState({
    id: 'user-001',
    name: 'John Doe',
    preferences: {
      notifications: true,
      theme: 'light',
      language: 'en-GB'
    },
    journeyStage: 'early' // early, middle, late
  });

  // Progress data state
  const [progress, setProgress] = useState({
    overall: 45,
    tasks: 65,
    estate: 35,
    milestones: [
      { id: 'm-001', name: 'Initial Setup Complete', achieved: true },
      { id: 'm-002', name: 'Essential Tasks Completed', achieved: false },
      { id: 'm-003', name: 'Estate Inventory Complete', achieved: false }
    ]
  });

  // Recent activity state
  const [recentActivity, setRecentActivity] = useState([
    { id: 'act-001', type: 'task', action: 'completed', item: 'Obtain death certificates', timestamp: new Date(Date.now() - 3600000) },
    { id: 'act-002', type: 'estate', action: 'added', item: 'Main Residence', timestamp: new Date(Date.now() - 7200000) },
    { id: 'act-003', type: 'task', action: 'started', item: 'Contact life insurance provider', timestamp: new Date(Date.now() - 86400000) }
  ]);

  // Shared categories state
  const [categories, setCategories] = useState([
    { id: 'cat-001', name: 'Legal', icon: '⚖️', type: 'task' },
    { id: 'cat-002', name: 'Financial', icon: '💰', type: 'task' },
    { id: 'cat-003', name: 'Notifications', icon: '📣', type: 'task' },
    { id: 'cat-004', name: 'Self-Care', icon: '🧘', type: 'task' },
    { id: 'cat-005', name: 'Property', icon: '🏠', type: 'estate' },
    { id: 'cat-006', name: 'Financial', icon: '💳', type: 'estate' },
    { id: 'cat-007', name: 'Vehicles', icon: '🚗', type: 'estate' },
    { id: 'cat-008', name: 'Valuables', icon: '💎', type: 'estate' },
    { id: 'cat-009', name: 'Personal Items', icon: '📦', type: 'estate' }
  ]);

  // Notifications state
  const [notifications, setNotifications] = useState([
    { id: 'notif-001', type: 'task', message: 'Task "Contact bank" is due tomorrow', read: false, timestamp: new Date() },
    { id: 'notif-002', type: 'estate', message: 'Document "Will" needs to be uploaded', read: false, timestamp: new Date(Date.now() - 86400000) }
  ]);

  // Navigation state
  const [currentView, setCurrentView] = useState('home');
  const [previousView, setPreviousView] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState([
    { label: 'Home', path: 'home' }
  ]);

  // Tasks state
  const [tasks, setTasks] = useState([
    {
      id: 'task-001',
      title: 'Obtain death certificates',
      description: 'Request multiple official copies of the death certificate from the registry office.',
      category: 'Legal',
      priority: 1,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: 'In Progress',
      progress: 50,
      checklist: [
        { id: 'check-001', text: 'Locate registry office', completed: true },
        { id: 'check-002', text: 'Fill out request form', completed: true },
        { id: 'check-003', text: 'Pay fee', completed: false },
        { id: 'check-004', text: 'Collect certificates', completed: false }
      ],
      resources: [
        { id: 'res-001', title: 'Registry Office Website', url: 'https://www.gov.uk/register-offices' }
      ],
      relatedTasks: ['task-003'],
      linkedAssets: []
    },
    {
      id: 'task-002',
      title: 'Notify bank accounts',
      description: 'Contact all banks and financial institutions to inform them of the death.',
      category: 'Financial',
      priority: 2,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      status: 'Not Started',
      progress: 0,
      checklist: [
        { id: 'check-005', text: 'Make list of all accounts', completed: false },
        { id: 'check-006', text: 'Call main bank', completed: false },
        { id: 'check-007', text: 'Visit branch with death certificate', completed: false },
        { id: 'check-008', text: 'Request account freeze', completed: false }
      ],
      resources: [
        { id: 'res-002', title: 'Bank Notification Template', url: '/resources/bank-notification-template.pdf' }
      ],
      relatedTasks: [],
      linkedAssets: ['asset-002']
    }
  ]);

  // Estate assets state
  const [assets, setAssets] = useState([
    {
      id: 'asset-001',
      name: 'Main Residence',
      category: 'Property',
      value: 450000,
      description: 'Primary home at 123 Main Street',
      location: '123 Main Street, London',
      status: 'Valuation Complete',
      documents: ['doc-001'],
      relatedAccounts: []
    },
    {
      id: 'asset-002',
      name: 'Savings Account',
      category: 'Financial',
      value: 85000,
      description: 'Main savings account with Barclays',
      location: 'Barclays Bank',
      status: 'Awaiting Confirmation',
      documents: ['doc-002'],
      relatedAccounts: ['account-001']
    }
  ]);

  // Documents state
  const [documents, setDocuments] = useState([
    {
      id: 'doc-001',
      title: 'Property Deed',
      type: 'Legal',
      status: 'Located',
      relatedAssets: ['asset-001']
    },
    {
      id: 'doc-002',
      title: 'Bank Statements',
      type: 'Financial',
      status: 'Requested',
      relatedAssets: ['asset-002']
    }
  ]);

  // Accounts state
  const [accounts, setAccounts] = useState([
    {
      id: 'account-001',
      name: 'Barclays Savings',
      institution: 'Barclays Bank',
      accountNumber: 'XXXX-XXXX-XXXX-1234',
      status: 'Notification Sent'
    }
  ]);

  // Navigation functions
  const navigateTo = (path) => {
    setPreviousView(currentView);
    setCurrentView(path);
    
    // Update breadcrumbs based on navigation
    if (path === 'home') {
      setBreadcrumbs([{ label: 'Home', path: 'home' }]);
    } else {
      const newBreadcrumb = { 
        label: path.charAt(0).toUpperCase() + path.slice(1), 
        path: path 
      };
      
      // Check if we're navigating to a path that's already in the breadcrumbs
      const existingIndex = breadcrumbs.findIndex(crumb => crumb.path === path);
      
      if (existingIndex >= 0) {
        // If it exists, trim the breadcrumbs to that point
        setBreadcrumbs(breadcrumbs.slice(0, existingIndex + 1));
      } else {
        // Otherwise add the new breadcrumb
        setBreadcrumbs([...breadcrumbs, newBreadcrumb]);
      }
    }
  };

  // Task management functions
  const addTask = (task) => {
    const newTask = {
      id: `task-${Date.now()}`,
      ...task,
      linkedAssets: []
    };
    setTasks([...tasks, newTask]);
    
    // Add to recent activity
    addActivity('task', 'added', task.title);
  };

  const updateTask = (taskId, updates) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
    
    // Add to recent activity if status changed
    if (updates.status) {
      const task = tasks.find(t => t.id === taskId);
      addActivity('task', updates.status.toLowerCase(), task.title);
    }
    
    // Update overall progress
    updateProgress();
  };

  // Estate management functions
  const addAsset = (asset) => {
    const newAsset = {
      id: `asset-${Date.now()}`,
      ...asset,
      documents: [],
      relatedAccounts: []
    };
    setAssets([...assets, newAsset]);
    
    // Add to recent activity
    addActivity('estate', 'added', asset.name);
    
    // Update overall progress
    updateProgress();
  };

  const updateAsset = (assetId, updates) => {
    setAssets(assets.map(asset => 
      asset.id === assetId ? { ...asset, ...updates } : asset
    ));
    
    // Add to recent activity if status changed
    if (updates.status) {
      const asset = assets.find(a => a.id === assetId);
      addActivity('estate', 'updated', asset.name);
    }
    
    // Update overall progress
    updateProgress();
  };

  // Cross-component functions
  const linkTaskToAsset = (taskId, assetId) => {
    // Update the task with the linked asset
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        // Check if asset is already linked
        if (!task.linkedAssets.includes(assetId)) {
          return {
            ...task,
            linkedAssets: [...task.linkedAssets, assetId]
          };
        }
      }
      return task;
    }));
    
    // Add to recent activity
    const task = tasks.find(t => t.id === taskId);
    const asset = assets.find(a => a.id === assetId);
    if (task && asset) {
      addActivity('link', 'linked', `${task.title} to ${asset.name}`);
    }
  };

  // Add to recent activity
  const addActivity = (type, action, item) => {
    const newActivity = {
      id: `act-${Date.now()}`,
      type,
      action,
      item,
      timestamp: new Date()
    };
    setRecentActivity([newActivity, ...recentActivity.slice(0, 9)]);
  };

  // Update overall progress
  const updateProgress = () => {
    // Calculate task progress
    const completedTasks = tasks.filter(task => task.status === 'Completed').length;
    const taskProgress = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;
    
    // Calculate estate progress
    const completedAssets = assets.filter(asset => asset.status === 'Valuation Complete').length;
    const estateProgress = assets.length > 0 ? Math.round((completedAssets / assets.length) * 100) : 0;
    
    // Calculate overall progress (weighted average)
    const overallProgress = Math.round((taskProgress * 0.6) + (estateProgress * 0.4));
    
    setProgress({
      ...progress,
      overall: overallProgress,
      tasks: taskProgress,
      estate: estateProgress
    });
  };

  // Add custom category
  const addCategory = (category) => {
    const newCategory = {
      id: `cat-${Date.now()}`,
      ...category
    };
    setCategories([...categories, newCategory]);
  };

  // Generate unified report
  const generateReport = (options) => {
    console.log('Generating report with options:', options);
    // In a real implementation, this would generate and return a report
    // For now, we'll just add an activity
    addActivity('report', 'generated', options.type);
    return {
      success: true,
      reportUrl: `/reports/report-${Date.now()}.${options.format}`
    };
  };

  // Add notification
  const addNotification = (notification) => {
    const newNotification = {
      id: `notif-${Date.now()}`,
      ...notification,
      read: false,
      timestamp: new Date()
    };
    setNotifications([newNotification, ...notifications]);
  };

  // Mark notification as read
  const markNotificationAsRead = (notificationId) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId ? { ...notification, read: true } : notification
    ));
  };

  // Context value
  const contextValue = {
    // State
    user,
    progress,
    recentActivity,
    categories,
    notifications,
    currentView,
    previousView,
    breadcrumbs,
    tasks,
    assets,
    documents,
    accounts,
    
    // Navigation functions
    navigateTo,
    setCurrentView,
    
    // Task management functions
    addTask,
    updateTask,
    
    // Estate management functions
    addAsset,
    updateAsset,
    
    // Cross-component functions
    linkTaskToAsset,
    addActivity,
    addCategory,
    generateReport,
    
    // Notification functions
    addNotification,
    markNotificationAsRead
  };

  return (
    <DigitalCompanionContext.Provider value={contextValue}>
      {children}
    </DigitalCompanionContext.Provider>
  );
};
