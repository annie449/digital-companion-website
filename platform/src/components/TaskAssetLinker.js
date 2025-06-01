import React, { useContext } from 'react';
import { DigitalCompanionContext } from '../context/DigitalCompanionContext';
import './TaskAssetLinker.css';

function TaskAssetLinker({ taskId }) {
  const { tasks, assets, linkTaskToAsset } = useContext(DigitalCompanionContext);
  const [selectedAsset, setSelectedAsset] = React.useState('');
  
  const task = tasks.find(t => t.id === taskId);
  const linkedAssets = task ? task.linkedAssets : [];
  
  const handleLinkAsset = () => {
    if (selectedAsset) {
      linkTaskToAsset(taskId, selectedAsset);
      setSelectedAsset('');
    }
  };
  
  return (
    <div className="task-asset-linker">
      <h4>Linked Assets</h4>
      
      {linkedAssets.length > 0 ? (
        <ul className="linked-assets-list">
          {linkedAssets.map(assetId => {
            const asset = assets.find(a => a.id === assetId);
            return asset ? (
              <li key={asset.id} className="linked-asset-item">
                <div className="asset-icon">{asset.category === 'Property' ? '🏠' : 
                                           asset.category === 'Financial' ? '💰' : 
                                           asset.category === 'Vehicles' ? '🚗' : 
                                           asset.category === 'Valuables' ? '💎' : '📦'}</div>
                <div className="asset-details">
                  <h5>{asset.name}</h5>
                  <p>{asset.category}</p>
                </div>
                <div className="asset-value">£{asset.value.toLocaleString()}</div>
              </li>
            ) : null;
          })}
        </ul>
      ) : (
        <p className="no-assets-message">No assets linked to this task</p>
      )}
      
      <div className="link-asset-form">
        <select 
          value={selectedAsset} 
          onChange={(e) => setSelectedAsset(e.target.value)}
          className="asset-select"
        >
          <option value="">Select an asset to link</option>
          {assets.map(asset => (
            <option key={asset.id} value={asset.id}>
              {asset.name} ({asset.category})
            </option>
          ))}
        </select>
        <button 
          onClick={handleLinkAsset} 
          disabled={!selectedAsset}
          className="link-button"
        >
          Link Asset
        </button>
      </div>
    </div>
  );
}

export default TaskAssetLinker;
