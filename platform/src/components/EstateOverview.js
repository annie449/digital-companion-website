import React, { useContext } from 'react';
import { DigitalCompanionContext } from '../context/DigitalCompanionContext';
import './EstateOverview.css';

function EstateOverview() {
  const { assets, navigateTo } = useContext(DigitalCompanionContext);
  
  // Calculate total estate value
  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  
  // Group assets by category
  const assetsByCategory = assets.reduce((acc, asset) => {
    if (!acc[asset.category]) {
      acc[asset.category] = {
        count: 0,
        value: 0
      };
    }
    acc[asset.category].count += 1;
    acc[asset.category].value += asset.value;
    return acc;
  }, {});
  
  const handleCategoryClick = (category) => {
    navigateTo(`estate/category/${category}`);
  };
  
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Property': return '🏠';
      case 'Financial': return '💰';
      case 'Vehicles': return '🚗';
      case 'Valuables': return '💎';
      case 'Personal Items': return '📦';
      default: return '📋';
    }
  };
  
  return (
    <div className="estate-overview">
      <div className="estate-total">
        <h4>Total Estate Value</h4>
        <div className="estate-value">£{totalValue.toLocaleString()}</div>
      </div>
      
      <ul className="estate-categories">
        {Object.entries(assetsByCategory).map(([category, data]) => (
          <li 
            key={category} 
            className="category-item"
            onClick={() => handleCategoryClick(category)}
          >
            <div className="category-icon">{getCategoryIcon(category)}</div>
            <div className="category-details">
              <h4 className="category-name">{category}</h4>
              <div className="category-meta">
                <span className="category-count">{data.count} item{data.count !== 1 ? 's' : ''}</span>
                <span className="category-value">£{data.value.toLocaleString()}</span>
              </div>
              <div className="category-percentage">
                {Math.round((data.value / totalValue) * 100)}% of estate
              </div>
            </div>
          </li>
        ))}
      </ul>
      
      {assets.length === 0 && (
        <p className="no-assets-message">No assets added yet</p>
      )}
    </div>
  );
}

export default EstateOverview;
