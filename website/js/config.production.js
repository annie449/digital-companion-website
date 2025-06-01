// Production-ready configuration for Digital Companion™ Task Management System

const config = {
  // API endpoints
  api: {
    baseUrl: 'https://api.digitalcompanion.com/v1',
    tasks: '/tasks',
    templates: '/templates',
    users: '/users',
    progress: '/progress',
    feedback: '/feedback'
  },
  
  // Authentication settings
  auth: {
    tokenExpiry: 86400, // 24 hours in seconds
    refreshThreshold: 3600, // 1 hour in seconds
    endpoints: {
      login: '/auth/login',
      register: '/auth/register',
      refresh: '/auth/refresh',
      reset: '/auth/reset-password'
    }
  },
  
  // Feature flags
  features: {
    aiSuggestions: true,
    progressTracking: true,
    templateCustomization: true,
    journalFeature: false, // Coming in next release
    estateManagement: false // Coming in next release
  },
  
  // Analytics configuration
  analytics: {
    enabled: true,
    trackingId: 'DC-PROD-2025',
    events: {
      taskCreated: 'task_created',
      taskCompleted: 'task_completed',
      templateUsed: 'template_used',
      progressViewed: 'progress_viewed'
    }
  },
  
  // Performance settings
  performance: {
    cacheExpiry: 300, // 5 minutes in seconds
    maxConcurrentRequests: 10,
    retryAttempts: 3,
    retryDelay: 1000 // 1 second in milliseconds
  },
  
  // Error reporting
  errorReporting: {
    enabled: true,
    logLevel: 'error', // 'debug', 'info', 'warn', 'error'
    endpoint: '/logs/client-error'
  },
  
  // User preferences defaults
  userPreferences: {
    defaultView: 'dashboard',
    taskSortBy: 'priority',
    taskFilter: 'all',
    notificationsEnabled: true,
    emailDigestFrequency: 'daily' // 'daily', 'weekly', 'never'
  }
};

export default config;
