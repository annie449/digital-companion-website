import React from 'react';

function HomePage() {
  return (
    <div className="home-page">
      <h1>Welcome to Digital Companion</h1>
      <p>Your supportive guide through life's challenging transitions.</p>
      <div className="feature-highlights">
        <div className="feature">
          <h2>Task Management</h2>
          <p>Organize and track important tasks during difficult times.</p>
        </div>
        <div className="feature">
          <h2>Memory Preservation</h2>
          <p>Preserve and celebrate important memories of loved ones.</p>
        </div>
        <div className="feature">
          <h2>Estate Planning</h2>
          <p>Prepare and organize important documents for the future.</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
