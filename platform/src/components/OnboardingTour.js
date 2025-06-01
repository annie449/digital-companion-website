import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDigitalCompanionContext } from '../context/DigitalCompanionContext';
import './OnboardingTour.css';

/**
 * OnboardingTour Component
 * 
 * A guided tour system that introduces new users to the Digital Companion platform
 * with interactive steps, tooltips, and personalized guidance.
 */
const OnboardingTour = () => {
  const { user, updateUserPreferences } = useDigitalCompanionContext();
  const navigate = useNavigate();
  
  // Tour state management
  const [currentStep, setCurrentStep] = useState(0);
  const [tourComplete, setTourComplete] = useState(false);
  const [userNeeds, setUserNeeds] = useState({
    practicalSupport: false,
    emotionalSupport: false,
    memoryPreservation: false,
    estateManagement: false
  });
  
  // Tour steps configuration
  const tourSteps = [
    {
      title: "Welcome to Digital Companion™",
      content: "We're here to support you through life's most challenging transitions. Let's take a quick tour to help you get started.",
      element: "welcome-screen",
      placement: "center"
    },
    {
      title: "Your Dashboard",
      content: "This is your personalized dashboard where you'll find an overview of your tasks, wellbeing resources, and important updates.",
      element: "main-dashboard",
      placement: "bottom"
    },
    {
      title: "Task Management",
      content: "Keep track of important tasks and administrative responsibilities. We'll help you stay organized during difficult times.",
      element: "task-management-section",
      placement: "right"
    },
    {
      title: "Wellbeing Center",
      content: "Access self-care resources, journal prompts, and emotional support tools designed to support your journey.",
      element: "wellbeing-center",
      placement: "left"
    },
    {
      title: "Memory Repository",
      content: "Preserve and organize important memories, photos, and documents in a secure digital space.",
      element: "memory-repository",
      placement: "top"
    },
    {
      title: "Help & Support",
      content: "Have questions? Our support team is always here to help. You can access help resources anytime.",
      element: "help-support",
      placement: "left"
    },
    {
      title: "Let's Personalize Your Experience",
      content: "Tell us a bit about what you need most right now, and we'll customize your Digital Companion experience.",
      element: "personalization-screen",
      placement: "center"
    }
  ];

  // Handle tour navigation
  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipTour = () => {
    if (window.confirm("Are you sure you want to skip the tour? You can access it again from your settings.")) {
      completeTour();
    }
  };

  const completeTour = () => {
    setTourComplete(true);
    updateUserPreferences({
      onboardingComplete: true,
      userNeeds: userNeeds
    });
    
    // Redirect to personalized dashboard
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  // Handle user needs selection
  const toggleNeed = (need) => {
    setUserNeeds({
      ...userNeeds,
      [need]: !userNeeds[need]
    });
  };

  // Scroll to the current tour element
  useEffect(() => {
    const element = document.getElementById(tourSteps[currentStep].element);
    if (element && currentStep > 0) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [currentStep]);

  // Render personalization screen for the final step
  const renderPersonalizationScreen = () => {
    return (
      <div className="personalization-container">
        <h2>What matters most to you right now?</h2>
        <p>Select all that apply. This helps us personalize your experience.</p>
        
        <div className="needs-options">
          <div 
            className={`need-option ${userNeeds.practicalSupport ? 'selected' : ''}`}
            onClick={() => toggleNeed('practicalSupport')}
          >
            <div className="need-icon practical-icon"></div>
            <h3>Practical Support</h3>
            <p>Help with tasks, paperwork, and administrative responsibilities</p>
          </div>
          
          <div 
            className={`need-option ${userNeeds.emotionalSupport ? 'selected' : ''}`}
            onClick={() => toggleNeed('emotionalSupport')}
          >
            <div className="need-icon emotional-icon"></div>
            <h3>Emotional Support</h3>
            <p>Resources for coping, self-care, and emotional wellbeing</p>
          </div>
          
          <div 
            className={`need-option ${userNeeds.memoryPreservation ? 'selected' : ''}`}
            onClick={() => toggleNeed('memoryPreservation')}
          >
            <div className="need-icon memory-icon"></div>
            <h3>Memory Preservation</h3>
            <p>Tools to collect, organize, and preserve important memories</p>
          </div>
          
          <div 
            className={`need-option ${userNeeds.estateManagement ? 'selected' : ''}`}
            onClick={() => toggleNeed('estateManagement')}
          >
            <div className="need-icon estate-icon"></div>
            <h3>Estate Management</h3>
            <p>Guidance for managing assets, accounts, and important documents</p>
          </div>
        </div>
      </div>
    );
  };

  // Render completion screen
  if (tourComplete) {
    return (
      <div className="tour-completion">
        <div className="completion-icon"></div>
        <h2>You're all set!</h2>
        <p>We've personalized your Digital Companion™ experience based on your preferences.</p>
        <p>You'll be redirected to your dashboard in a moment...</p>
      </div>
    );
  }

  return (
    <div className="onboarding-tour">
      <div className="tour-progress">
        <div className="progress-bar">
          <div 
            className="progress-indicator" 
            style={{ width: `${(currentStep / (tourSteps.length - 1)) * 100}%` }}
          ></div>
        </div>
        <div className="step-counter">
          Step {currentStep + 1} of {tourSteps.length}
        </div>
      </div>
      
      <div className="tour-content">
        {currentStep === tourSteps.length - 1 ? (
          renderPersonalizationScreen()
        ) : (
          <div className="tour-step">
            <h2>{tourSteps[currentStep].title}</h2>
            <p>{tourSteps[currentStep].content}</p>
            
            {currentStep === 0 && (
              <div className="welcome-illustration"></div>
            )}
          </div>
        )}
      </div>
      
      <div className="tour-navigation">
        {currentStep > 0 && (
          <button className="tour-btn back-btn" onClick={prevStep}>
            Back
          </button>
        )}
        
        <button className="tour-btn skip-btn" onClick={skipTour}>
          Skip Tour
        </button>
        
        <button className="tour-btn next-btn" onClick={nextStep}>
          {currentStep < tourSteps.length - 1 ? 'Next' : 'Complete'}
        </button>
      </div>
    </div>
  );
};

export default OnboardingTour;
