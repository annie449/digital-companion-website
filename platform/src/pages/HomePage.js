import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Make sure to create this CSS file with the styles

function HomePage() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Digital Companion</h1>
          <p className="hero-subtitle">Your supportive guide through life's challenging transitions.</p>
          <div className="hero-buttons">
            <Link to="/survey" className="btn btn-primary">Join our Beta Program</Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="features-section">
        <h2>How We Can Help</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Tasks Management</h3>
            <p>Organize and track important tasks during difficult times. We provide customized task lists based on your location and situation.</p>
            <Link to="/platform/tasks" className="feature-link">Explore Tasks</Link>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Estate</h3>
            <p>Prepare and organize important documents for the future. Manage estate planning and important paperwork.</p>
            <Link to="/platform/estate" className="feature-link">Explore Estate</Link>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📓</div>
            <h3>Journal</h3>
            <p>Record your thoughts and track your emotional wellbeing with our integrated mood tracking and journaling tools.</p>
            <Link to="/platform/journal" className="feature-link">Explore Journal</Link>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🧘</div>
            <h3>Meditation</h3>
            <p>Find moments of peace with guided meditations specifically designed for grief and difficult transitions.</p>
            <Link to="/platform/meditation" className="feature-link">Explore Meditation</Link>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">💭</div>
            <h3>Memory</h3>
            <p>Preserve and celebrate important memories of loved ones. Includes digital legacy guide for managing online accounts.</p>
            <Link to="/platform/memory" className="feature-link">Explore Memory</Link>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Practical Guides</h3>
            <p>Access step-by-step guides and templates for handling various aspects of loss and transition.</p>
            <Link to="/platform/practical-guides" className="feature-link">Explore Guides</Link>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">❤️</div>
            <h3>Emotional Support</h3>
            <p>Find resources and tools to help navigate the emotional aspects of grief and major life transitions.</p>
            <Link to="/platform/emotional-support" className="feature-link">Explore Support</Link>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3>Services</h3>
            <p>Connect with professional services and support organizations that can provide additional assistance.</p>
            <Link to="/platform/services" className="feature-link">Explore Services</Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p className="testimonial-text">"Digital Companion helped me organize everything during an incredibly difficult time. I don't know how I would have managed without it."</p>
            <p className="testimonial-author">- Sarah M.</p>
          </div>
          
          <div className="testimonial-card">
            <p className="testimonial-text">"The memory preservation features allowed our family to create a beautiful tribute that we'll cherish forever."</p>
            <p className="testimonial-author">- James T.</p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section">
        <h2>Join Our Beta Program</h2>
        <p>We're currently in beta testing and would love your feedback to help us improve the Digital Companion platform.</p>
        <Link to="/survey" className="btn btn-primary btn-large">Join our Beta Program</Link>
      </section>
    </div>
  );
}

export default HomePage;
