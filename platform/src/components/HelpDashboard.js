import React from 'react';
import './HelpDashboard.css';

function HelpDashboard() {
  return (
    <div className="help-dashboard">
      <h1>Help & Support</h1>
      <p className="dashboard-description">Find answers to common questions and get support using Digital Companion.</p>
      
      <div className="help-search">
        <div className="search-container">
          <input type="text" placeholder="Search for help topics..." className="search-input" />
          <button className="search-button">Search</button>
        </div>
      </div>
      
      <div className="help-sections">
        <div className="help-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            <div className="faq-item">
              <div className="faq-question">
                <h3>How do I get started with Digital Companion?</h3>
                <span className="toggle-icon">+</span>
              </div>
              <div className="faq-answer">
                <p>To get started with Digital Companion, we recommend first exploring the Tasks dashboard to organize immediate priorities. Then, visit each feature to understand how they can support you during this time.</p>
              </div>
            </div>
            
            <div className="faq-item">
              <div className="faq-question">
                <h3>Is my information private and secure?</h3>
                <span className="toggle-icon">+</span>
              </div>
              <div className="faq-answer">
                <p>Yes, all your information is private and secure. We use industry-standard encryption and security practices to protect your data. Your personal information is never shared with third parties without your explicit consent.</p>
              </div>
            </div>
            
            <div className="faq-item">
              <div className="faq-question">
                <h3>Can I share my Memory Vault with family members?</h3>
                <span className="toggle-icon">+</span>
              </div>
              <div className="faq-answer">
                <p>Yes, you can share individual memories or your entire Memory Vault with family members. Use the "Share" button on any memory or collection to generate a secure link that you can send to your loved ones.</p>
              </div>
            </div>
            
            <div className="faq-item">
              <div className="faq-question">
                <h3>How do I download my journal entries?</h3>
                <span className="toggle-icon">+</span>
              </div>
              <div className="faq-answer">
                <p>To download your journal entries, go to the Journal Dashboard and click on the "Export Journal" button. You can choose to export all entries or select specific date ranges. Entries can be downloaded in PDF or plain text format.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="help-section">
          <h2>Contact Support</h2>
          <div className="contact-options">
            <div className="contact-card">
              <h3>Email Support</h3>
              <p>Send us an email and we'll respond within 24 hours.</p>
              <a href="mailto:support@digitalcompanion.co.uk" className="contact-button">Email Us</a>
            </div>
            
            <div className="contact-card">
              <h3>Live Chat</h3>
              <p>Chat with our support team during business hours.</p>
              <button className="contact-button">Start Chat</button>
            </div>
            
            <div className="contact-card">
              <h3>Schedule a Call</h3>
              <p>Book a call with our support team for personalized help.</p>
              <button className="contact-button">Schedule Call</button>
            </div>
          </div>
        </div>
        
        <div className="help-section">
          <h2>Video Tutorials</h2>
          <div className="tutorials-grid">
            <div className="tutorial-card">
              <div className="tutorial-thumbnail">
                <div className="play-icon">▶</div>
              </div>
              <h3>Getting Started with Digital Companion</h3>
              <p>A complete overview of all features and how to use them.</p>
              <span className="tutorial-duration">5:32</span>
            </div>
            
            <div className="tutorial-card">
              <div className="tutorial-thumbnail">
                <div className="play-icon">▶</div>
              </div>
              <h3>Using the Task Management System</h3>
              <p>How to create, organize, and track important tasks.</p>
              <span className="tutorial-duration">3:47</span>
            </div>
            
            <div className="tutorial-card">
              <div className="tutorial-thumbnail">
                <div className="play-icon">▶</div>
              </div>
              <h3>Creating Your Memory Vault</h3>
              <p>Tips for preserving and sharing meaningful memories.</p>
              <span className="tutorial-duration">4:15</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpDashboard;
