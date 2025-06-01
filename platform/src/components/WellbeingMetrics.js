import React from 'react';
import './WellbeingMetrics.css';

function WellbeingMetrics({ scores }) {
  // Function to get color based on score
  const getScoreColor = (score) => {
    if (score >= 80) return '#28a745'; // Good - green
    if (score >= 60) return '#17a2b8'; // Moderate - blue
    if (score >= 40) return '#ffc107'; // Caution - yellow
    return '#dc3545'; // Concern - red
  };
  
  // Calculate trend (up, down, or stable) based on history
  const calculateTrend = () => {
    if (!scores.history || scores.history.length < 2) return 'stable';
    
    const latest = scores.history[scores.history.length - 1].score;
    const previous = scores.history[scores.history.length - 2].score;
    
    if (latest > previous + 3) return 'up';
    if (latest < previous - 3) return 'down';
    return 'stable';
  };
  
  const trend = calculateTrend();
  
  // Get trend icon and color
  const getTrendIcon = () => {
    switch(trend) {
      case 'up': return { icon: '↑', color: '#28a745' };
      case 'down': return { icon: '↓', color: '#dc3545' };
      default: return { icon: '→', color: '#6c757d' };
    }
  };
  
  const trendInfo = getTrendIcon();
  
  return (
    <div className="wellbeing-metrics">
      <div className="metrics-overview">
        <div className="overall-score">
          <div 
            className="score-circle" 
            style={{ 
              backgroundColor: getScoreColor(scores.overall),
              color: scores.overall > 50 ? '#fff' : '#333'
            }}
          >
            {scores.overall}
          </div>
          <div className="score-label">
            Overall Wellbeing
            <span 
              className="trend-indicator"
              style={{ color: trendInfo.color }}
            >
              {trendInfo.icon}
            </span>
          </div>
        </div>
        
        <div className="metrics-breakdown">
          <div className="metric-item">
            <div className="metric-label">Emotional</div>
            <div className="metric-bar-container">
              <div 
                className="metric-bar" 
                style={{ 
                  width: `${scores.emotional}%`,
                  backgroundColor: getScoreColor(scores.emotional)
                }}
              ></div>
            </div>
            <div className="metric-value">{scores.emotional}%</div>
          </div>
          
          <div className="metric-item">
            <div className="metric-label">Physical</div>
            <div className="metric-bar-container">
              <div 
                className="metric-bar" 
                style={{ 
                  width: `${scores.physical}%`,
                  backgroundColor: getScoreColor(scores.physical)
                }}
              ></div>
            </div>
            <div className="metric-value">{scores.physical}%</div>
          </div>
          
          <div className="metric-item">
            <div className="metric-label">Social</div>
            <div className="metric-bar-container">
              <div 
                className="metric-bar" 
                style={{ 
                  width: `${scores.social}%`,
                  backgroundColor: getScoreColor(scores.social)
                }}
              ></div>
            </div>
            <div className="metric-value">{scores.social}%</div>
          </div>
          
          <div className="metric-item">
            <div className="metric-label">Spiritual</div>
            <div className="metric-bar-container">
              <div 
                className="metric-bar" 
                style={{ 
                  width: `${scores.spiritual}%`,
                  backgroundColor: getScoreColor(scores.spiritual)
                }}
              ></div>
            </div>
            <div className="metric-value">{scores.spiritual}%</div>
          </div>
        </div>
      </div>
      
      <div className="metrics-insight">
        {trend === 'up' && (
          <p className="insight-message positive">
            Your wellbeing score is improving! Keep up with your self-care activities.
          </p>
        )}
        {trend === 'down' && (
          <p className="insight-message caution">
            Your wellbeing score has decreased recently. Consider adding more self-care activities to your routine.
          </p>
        )}
        {trend === 'stable' && (
          <p className="insight-message neutral">
            Your wellbeing score is stable. Regular self-care activities help maintain emotional balance.
          </p>
        )}
      </div>
    </div>
  );
}

export default WellbeingMetrics;
