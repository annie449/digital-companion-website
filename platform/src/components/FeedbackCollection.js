import React, { useState, useEffect } from 'react';
import { useDigitalCompanionContext } from '../context/DigitalCompanionContext';
import './FeedbackCollection.css';

/**
 * FeedbackCollection Component
 * 
 * A comprehensive feedback collection system that allows users to provide
 * contextual feedback, report issues, and suggest improvements.
 */
const FeedbackCollection = ({ location, featureId }) => {
  const { user, submitFeedback } = useDigitalCompanionContext();
  
  // Feedback state
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState('general');
  const [feedbackText, setFeedbackText] = useState('');
  const [satisfaction, setSatisfaction] = useState(3);
  const [includeScreenshot, setIncludeScreenshot] = useState(false);
  const [screenshot, setScreenshot] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  
  // Reset form when location changes
  useEffect(() => {
    resetForm();
  }, [location]);
  
  // Handle feedback toggle
  const toggleFeedback = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      resetForm();
    }
  };
  
  // Reset form to default state
  const resetForm = () => {
    setFeedbackType('general');
    setFeedbackText('');
    setSatisfaction(3);
    setIncludeScreenshot(false);
    setScreenshot(null);
    setIsSubmitted(false);
    setError(null);
  };
  
  // Handle screenshot capture
  const captureScreenshot = async () => {
    try {
      // In a real implementation, this would use a library like html2canvas
      // For this prototype, we'll simulate a screenshot
      setScreenshot('screenshot_placeholder.png');
    } catch (err) {
      setError('Unable to capture screenshot. Please try again.');
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!feedbackText.trim()) {
      setError('Please provide some feedback before submitting.');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Prepare feedback data
      const feedbackData = {
        userId: user?.id || 'anonymous',
        type: feedbackType,
        content: feedbackText,
        satisfaction,
        location,
        featureId,
        timestamp: new Date().toISOString(),
        screenshot: includeScreenshot ? screenshot : null,
        userAgent: navigator.userAgent,
        screenSize: `${window.innerWidth}x${window.innerHeight}`
      };
      
      // Submit feedback
      await submitFeedback(feedbackData);
      
      // Show success state
      setIsSubmitted(true);
      
      // Close feedback form after delay
      setTimeout(() => {
        setIsOpen(false);
        resetForm();
      }, 3000);
    } catch (err) {
      setError('Unable to submit feedback. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Render satisfaction rating selector
  const renderSatisfactionSelector = () => {
    return (
      <div className="satisfaction-selector">
        <p>How would you rate your experience?</p>
        <div className="rating-options">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              type="button"
              className={`rating-btn ${satisfaction === rating ? 'selected' : ''}`}
              onClick={() => setSatisfaction(rating)}
              aria-label={`Rate ${rating} out of 5`}
            >
              {rating}
            </button>
          ))}
        </div>
        <div className="rating-labels">
          <span>Not satisfied</span>
          <span>Very satisfied</span>
        </div>
      </div>
    );
  };
  
  // Render feedback type selector
  const renderFeedbackTypeSelector = () => {
    return (
      <div className="feedback-type-selector">
        <p>What type of feedback would you like to provide?</p>
        <div className="type-options">
          <label className={`type-option ${feedbackType === 'general' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="feedbackType"
              value="general"
              checked={feedbackType === 'general'}
              onChange={() => setFeedbackType('general')}
            />
            <span className="type-icon general-icon"></span>
            <span className="type-label">General Feedback</span>
          </label>
          
          <label className={`type-option ${feedbackType === 'issue' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="feedbackType"
              value="issue"
              checked={feedbackType === 'issue'}
              onChange={() => setFeedbackType('issue')}
            />
            <span className="type-icon issue-icon"></span>
            <span className="type-label">Report an Issue</span>
          </label>
          
          <label className={`type-option ${feedbackType === 'suggestion' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="feedbackType"
              value="suggestion"
              checked={feedbackType === 'suggestion'}
              onChange={() => setFeedbackType('suggestion')}
            />
            <span className="type-icon suggestion-icon"></span>
            <span className="type-label">Suggest an Improvement</span>
          </label>
        </div>
      </div>
    );
  };
  
  // Render success message
  const renderSuccessMessage = () => {
    return (
      <div className="feedback-success">
        <div className="success-icon"></div>
        <h3>Thank you for your feedback!</h3>
        <p>Your input helps us improve Digital Companion™ for everyone.</p>
      </div>
    );
  };
  
  return (
    <div className="feedback-collection">
      <button 
        className={`feedback-toggle ${isOpen ? 'active' : ''}`}
        onClick={toggleFeedback}
        aria-expanded={isOpen}
      >
        {isOpen ? 'Close' : 'Feedback'}
      </button>
      
      {isOpen && (
        <div className="feedback-panel">
          <div className="feedback-header">
            <h2>Share Your Feedback</h2>
            <button 
              className="close-btn"
              onClick={toggleFeedback}
              aria-label="Close feedback form"
            >
              &times;
            </button>
          </div>
          
          {isSubmitted ? (
            renderSuccessMessage()
          ) : (
            <form onSubmit={handleSubmit} className="feedback-form">
              {renderFeedbackTypeSelector()}
              
              <div className="feedback-content">
                <label htmlFor="feedbackText">
                  {feedbackType === 'general' && 'What would you like to share with us?'}
                  {feedbackType === 'issue' && 'Please describe the issue you encountered:'}
                  {feedbackType === 'suggestion' && 'What improvement would you like to suggest?'}
                </label>
                <textarea
                  id="feedbackText"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder={
                    feedbackType === 'general' 
                      ? 'Share your thoughts about this feature...' 
                      : feedbackType === 'issue'
                      ? 'Describe what happened and how to reproduce the issue...'
                      : 'Describe your idea for improving this feature...'
                  }
                  rows={5}
                  required
                ></textarea>
              </div>
              
              {renderSatisfactionSelector()}
              
              <div className="screenshot-option">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={includeScreenshot}
                    onChange={() => {
                      const newValue = !includeScreenshot;
                      setIncludeScreenshot(newValue);
                      if (newValue && !screenshot) {
                        captureScreenshot();
                      }
                    }}
                  />
                  Include a screenshot with your feedback
                </label>
                
                {includeScreenshot && screenshot && (
                  <div className="screenshot-preview">
                    <img 
                      src={screenshot} 
                      alt="Screenshot preview" 
                      className="screenshot-img"
                    />
                    <button
                      type="button"
                      className="retake-btn"
                      onClick={captureScreenshot}
                    >
                      Retake Screenshot
                    </button>
                  </div>
                )}
              </div>
              
              {error && <div className="error-message">{error}</div>}
              
              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={toggleFeedback}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedbackCollection;
