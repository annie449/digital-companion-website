import React from 'react';
import './MeditationDashboard.css';

function MeditationDashboard() {
  return (
    <div className="meditation-dashboard">
      <h1>Meditation Dashboard</h1>
      <p className="dashboard-description">Find peace and support through guided meditations and mindfulness practices.</p>
      
      <div className="featured-meditation">
        <h2>Featured Meditation</h2>
        <div className="meditation-player">
          <div className="meditation-image">
            <div className="play-button">▶</div>
          </div>
          <div className="meditation-info">
            <h3>Finding Calm in Difficult Times</h3>
            <p className="meditation-details">
              <span className="meditation-duration">15 minutes</span>
              <span className="meditation-category">Grief Support</span>
            </p>
            <p className="meditation-description">
              A gentle meditation to help you find moments of calm and peace during challenging times.
            </p>
            <button className="play-meditation-button">Play Meditation</button>
          </div>
        </div>
      </div>
      
      <div className="meditation-collections">
        <div className="collection-header">
          <h2>Meditation Collections</h2>
          <div className="collection-filters">
            <button className="filter-button active">All</button>
            <button className="filter-button">Grief Support</button>
            <button className="filter-button">Stress Relief</button>
            <button className="filter-button">Sleep</button>
            <button className="filter-button">Mindfulness</button>
          </div>
        </div>
        
        <div className="meditation-grid">
          <div className="meditation-card">
            <div className="meditation-card-image grief">
              <div className="play-icon">▶</div>
            </div>
            <div className="meditation-card-content">
              <h3>Processing Grief</h3>
              <p className="meditation-card-details">
                <span>10 minutes</span>
                <span>Grief Support</span>
              </p>
              <p className="meditation-card-description">
                A meditation to help acknowledge and process feelings of grief.
              </p>
            </div>
          </div>
          
          <div className="meditation-card">
            <div className="meditation-card-image sleep">
              <div className="play-icon">▶</div>
            </div>
            <div className="meditation-card-content">
              <h3>Peaceful Sleep</h3>
              <p className="meditation-card-details">
                <span>20 minutes</span>
                <span>Sleep</span>
              </p>
              <p className="meditation-card-description">
                A calming meditation to help you fall asleep during difficult times.
              </p>
            </div>
          </div>
          
          <div className="meditation-card">
            <div className="meditation-card-image stress">
              <div className="play-icon">▶</div>
            </div>
            <div className="meditation-card-content">
              <h3>Releasing Tension</h3>
              <p className="meditation-card-details">
                <span>12 minutes</span>
                <span>Stress Relief</span>
              </p>
              <p className="meditation-card-description">
                A guided practice to release physical and emotional tension.
              </p>
            </div>
          </div>
          
          <div className="meditation-card">
            <div className="meditation-card-image mindfulness">
              <div className="play-icon">▶</div>
            </div>
            <div className="meditation-card-content">
              <h3>Present Moment Awareness</h3>
              <p className="meditation-card-details">
                <span>8 minutes</span>
                <span>Mindfulness</span>
              </p>
              <p className="meditation-card-description">
                A short practice to bring awareness to the present moment.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="meditation-resources">
        <h2>Mindfulness Resources</h2>
        <div className="resources-grid">
          <div className="resource-card">
            <h3>Benefits of Meditation During Grief</h3>
            <p>Learn how meditation can support the grieving process.</p>
            <a href="#" className="resource-link">Read Article</a>
          </div>
          
          <div className="resource-card">
            <h3>Simple Daily Mindfulness Practices</h3>
            <p>Easy ways to incorporate mindfulness into your daily routine.</p>
            <a href="#" className="resource-link">View Practices</a>
          </div>
          
          <div className="resource-card">
            <h3>Creating a Meditation Space</h3>
            <p>Tips for creating a peaceful space for your meditation practice.</p>
            <a href="#" className="resource-link">Read Guide</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MeditationDashboard;
