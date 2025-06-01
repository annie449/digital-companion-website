import React from 'react';
import './HelpDashboard.css';

/**
 * Help Dashboard Component
 * 
 * This component provides help resources, FAQs, and support options
 * for users of the Digital Companion platform.
 */
const HelpDashboard = () => {
  // Sample FAQ data - in a real app, this would come from a context or API
  const faqs = [
    {
      id: 1,
      question: 'How do I add a new task?',
      answer: 'To add a new task, navigate to the Tasks section and click the "Add Task" button. Fill in the task details and click "Save".',
      category: 'Tasks'
    },
    {
      id: 2,
      question: 'How do I update my estate inventory?',
      answer: 'Go to the Estate section, select "Estate Overview", and click on the item you wish to update. You can then edit the details and save your changes.',
      category: 'Estate'
    },
    {
      id: 3,
      question: 'Can I share my journal entries with family members?',
      answer: 'Yes, you can share individual journal entries. Open the entry you want to share, click the "Share" button, and enter the email addresses of family members you want to share with.',
      category: 'Journal'
    },
    {
      id: 4,
      question: 'How do I download my estate planning documents?',
      answer: 'In the Estate Planning section, find the document you want to download, click the three-dot menu, and select "Download PDF".',
      category: 'Estate Planning'
    },
    {
      id: 5,
      question: 'Can I upload photos to the Memory Vault?',
      answer: 'Yes, in the Memory Vault section, click "Create Memory" and select "Photo" as the memory type. You can then upload photos from your device.',
      category: 'Memory Vault'
    }
  ];

  // Group FAQs by category
  const faqCategories = faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {});

  return (
    <div className="help-dashboard">
      <header className="dashboard-header">
        <h1>Help & Support</h1>
        <p>Find answers to common questions and get support when you need it.</p>
      </header>

      <section className="search-section">
        <div className="search-container">
          <input type="text" placeholder="Search for help topics..." className="search-input" />
          <button className="search-button">🔍</button>
        </div>
      </section>

      <section className="help-options">
        <div className="help-option-card">
          <div className="option-icon">📚</div>
          <h3>User Guide</h3>
          <p>Comprehensive guide to using all features of Digital Companion</p>
          <button className="secondary-button">View Guide</button>
        </div>
        <div className="help-option-card">
          <div className="option-icon">💬</div>
          <h3>Live Chat</h3>
          <p>Chat with our support team for immediate assistance</p>
          <button className="secondary-button">Start Chat</button>
        </div>
        <div className="help-option-card">
          <div className="option-icon">📧</div>
          <h3>Email Support</h3>
          <p>Send us an email and we'll respond within 24 hours</p>
          <button className="secondary-button">Contact Us</button>
        </div>
        <div className="help-option-card">
          <div className="option-icon">📱</div>
          <h3>Schedule Call</h3>
          <p>Book a call with our support team at your convenience</p>
          <button className="secondary-button">Book Call</button>
        </div>
      </section>

      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-categories">
          {Object.entries(faqCategories).map(([category, categoryFaqs]) => (
            <div key={category} className="faq-category">
              <h3>{category}</h3>
              <div className="faq-list">
                {categoryFaqs.map(faq => (
                  <div key={faq.id} className="faq-item">
                    <div className="faq-question">
                      <h4>{faq.question}</h4>
                      <span className="toggle-icon">+</span>
                    </div>
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="video-tutorials">
        <div className="section-header">
          <h2>Video Tutorials</h2>
          <button className="text-button">View All</button>
        </div>
        <div className="tutorials-grid">
          <div className="tutorial-card">
            <div className="tutorial-thumbnail">
              <img src="https://via.placeholder.com/300x200?text=Tutorial" alt="Getting Started" />
              <div className="play-button">▶</div>
            </div>
            <h3>Getting Started with Digital Companion</h3>
            <p>3:45 • Basic overview of key features</p>
          </div>
          <div className="tutorial-card">
            <div className="tutorial-thumbnail">
              <img src="https://via.placeholder.com/300x200?text=Tutorial" alt="Estate Planning" />
              <div className="play-button">▶</div>
            </div>
            <h3>Using the Estate Planning Tools</h3>
            <p>5:12 • Creating and managing documents</p>
          </div>
          <div className="tutorial-card">
            <div className="tutorial-thumbnail">
              <img src="https://via.placeholder.com/300x200?text=Tutorial" alt="Memory Vault" />
              <div className="play-button">▶</div>
            </div>
            <h3>Creating Memories in the Memory Vault</h3>
            <p>4:30 • Adding photos and stories</p>
          </div>
        </div>
      </section>

      <section className="feedback-section">
        <div className="feedback-card">
          <h2>Help Us Improve</h2>
          <p>We're constantly working to make Digital Companion better. Share your feedback and suggestions with us.</p>
          <button className="primary-button">Give Feedback</button>
        </div>
      </section>
    </div>
  );
};

export default HelpDashboard;
