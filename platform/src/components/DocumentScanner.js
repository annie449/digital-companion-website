import React, { useState, useEffect } from 'react';
import { useDigitalCompanionContext } from '../context/DigitalCompanionContext';
import './DocumentScanner.css';

/**
 * DocumentScanner Component
 * 
 * A mobile-friendly document scanning tool that allows users to capture,
 * process, and organize important documents within the Digital Companion platform.
 */
const DocumentScanner = () => {
  const { user, saveDocument, documentCategories } = useDigitalCompanionContext();
  
  // State management
  const [scanMode, setScanMode] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [documentName, setDocumentName] = useState('');
  const [documentCategory, setDocumentCategory] = useState('');
  const [documentTags, setDocumentTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [ocrEnabled, setOcrEnabled] = useState(true);
  const [ocrText, setOcrText] = useState('');
  const [ocrStatus, setOcrStatus] = useState('idle');
  const [saveStatus, setSaveStatus] = useState('idle');
  const [error, setError] = useState(null);
  
  // Video stream reference
  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const fileInputRef = React.useRef(null);
  
  // Initialize camera when entering scan mode
  useEffect(() => {
    if (scanMode) {
      initializeCamera();
    } else {
      stopCamera();
    }
    
    return () => {
      stopCamera();
    };
  }, [scanMode]);
  
  // Initialize camera
  const initializeCamera = async () => {
    try {
      const constraints = {
        video: {
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError('Unable to access camera. Please ensure you have granted camera permissions.');
      setScanMode(false);
    }
  };
  
  // Stop camera stream
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };
  
  // Capture image from camera
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Get image data
      const imageDataUrl = canvas.toDataURL('image/jpeg');
      
      // Set captured image and exit scan mode
      setCapturedImage(imageDataUrl);
      setScanMode(false);
      
      // Process with OCR if enabled
      if (ocrEnabled) {
        processWithOCR(imageDataUrl);
      }
    }
  };
  
  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        setCapturedImage(event.target.result);
        
        // Process with OCR if enabled
        if (ocrEnabled) {
          processWithOCR(event.target.result);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  // Process image with OCR
  const processWithOCR = async (imageData) => {
    setOcrStatus('processing');
    setIsProcessing(true);
    
    try {
      // In a real implementation, this would call an OCR service
      // For this prototype, we'll simulate OCR processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate OCR results
      const simulatedText = "IMPORTANT DOCUMENT\n\nDate: May 31, 2025\n\nThis document certifies that [Name] has completed all requirements for [Purpose].\n\nReference Number: DOC-2025-05-31-12345\n\nAuthorized Signature: ________________";
      
      setOcrText(simulatedText);
      setOcrStatus('complete');
      
      // Auto-suggest document name based on OCR
      if (!documentName) {
        setDocumentName('Important Document - May 31, 2025');
      }
      
      // Auto-suggest category based on content
      if (!documentCategory && documentCategories) {
        setDocumentCategory('legal');
      }
    } catch (err) {
      setOcrStatus('error');
      setError('OCR processing failed. Please try again or enter document details manually.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Add a new tag
  const addTag = () => {
    if (newTag.trim() && !documentTags.includes(newTag.trim())) {
      setDocumentTags([...documentTags, newTag.trim()]);
      setNewTag('');
    }
  };
  
  // Remove a tag
  const removeTag = (tagToRemove) => {
    setDocumentTags(documentTags.filter(tag => tag !== tagToRemove));
  };
  
  // Handle tag input key press
  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };
  
  // Save document
  const handleSave = async () => {
    if (!documentName.trim()) {
      setError('Please provide a name for this document.');
      return;
    }
    
    setSaveStatus('saving');
    
    try {
      const documentData = {
        name: documentName,
        category: documentCategory,
        tags: documentTags,
        image: capturedImage,
        ocrText: ocrEnabled ? ocrText : null,
        dateAdded: new Date().toISOString(),
        userId: user?.id
      };
      
      // Save document
      await saveDocument(documentData);
      
      setSaveStatus('success');
      
      // Reset form after successful save
      setTimeout(() => {
        resetForm();
      }, 2000);
    } catch (err) {
      setSaveStatus('error');
      setError('Failed to save document. Please try again.');
    }
  };
  
  // Reset the form
  const resetForm = () => {
    setCapturedImage(null);
    setDocumentName('');
    setDocumentCategory('');
    setDocumentTags([]);
    setOcrText('');
    setOcrStatus('idle');
    setSaveStatus('idle');
    setError(null);
  };
  
  // Render scan interface
  const renderScanInterface = () => {
    return (
      <div className="scan-interface">
        <div className="video-container">
          <video 
            ref={videoRef}
            autoPlay
            playsInline
            muted
          />
          <div className="scan-overlay">
            <div className="scan-frame"></div>
          </div>
        </div>
        
        <div className="scan-controls">
          <button 
            className="capture-btn"
            onClick={captureImage}
          >
            <div className="capture-icon"></div>
          </button>
          
          <button 
            className="cancel-scan-btn"
            onClick={() => setScanMode(false)}
          >
            Cancel
          </button>
        </div>
        
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    );
  };
  
  // Render document form
  const renderDocumentForm = () => {
    return (
      <div className="document-form">
        {capturedImage ? (
          <div className="document-preview">
            <img src={capturedImage} alt="Captured document" />
            
            <div className="preview-actions">
              <button 
                className="retake-btn"
                onClick={() => setCapturedImage(null)}
              >
                Retake
              </button>
            </div>
          </div>
        ) : (
          <div className="capture-options">
            <button 
              className="scan-btn"
              onClick={() => setScanMode(true)}
            >
              <div className="camera-icon"></div>
              <span>Scan Document</span>
            </button>
            
            <div className="option-divider">
              <span>or</span>
            </div>
            
            <button 
              className="upload-btn"
              onClick={() => fileInputRef.current.click()}
            >
              <div className="upload-icon"></div>
              <span>Upload Image</span>
            </button>
            
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </div>
        )}
        
        {capturedImage && (
          <div className="document-details">
            <div className="form-group">
              <label htmlFor="documentName">Document Name</label>
              <input
                type="text"
                id="documentName"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                placeholder="Enter document name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="documentCategory">Category</label>
              <select
                id="documentCategory"
                value={documentCategory}
                onChange={(e) => setDocumentCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                {documentCategories && documentCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="documentTags">Tags</label>
              <div className="tags-input">
                <input
                  type="text"
                  id="documentTags"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleTagKeyPress}
                  placeholder="Add tags (press Enter)"
                />
                <button 
                  type="button"
                  className="add-tag-btn"
                  onClick={addTag}
                >
                  Add
                </button>
              </div>
              
              {documentTags.length > 0 && (
                <div className="tags-list">
                  {documentTags.map(tag => (
                    <span key={tag} className="tag">
                      {tag}
                      <button 
                        type="button"
                        className="remove-tag"
                        onClick={() => removeTag(tag)}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="form-group ocr-option">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={ocrEnabled}
                  onChange={(e) => setOcrEnabled(e.target.checked)}
                />
                Enable text recognition (OCR)
              </label>
            </div>
            
            {ocrEnabled && (
              <div className="ocr-section">
                {ocrStatus === 'processing' ? (
                  <div className="ocr-processing">
                    <div className="processing-spinner"></div>
                    <p>Processing document text...</p>
                  </div>
                ) : ocrStatus === 'complete' ? (
                  <div className="ocr-results">
                    <h4>Extracted Text</h4>
                    <div className="ocr-text">
                      {ocrText}
                    </div>
                  </div>
                ) : ocrStatus === 'error' ? (
                  <div className="ocr-error">
                    <p>Text extraction failed. You can try again or continue without text recognition.</p>
                    <button 
                      className="retry-ocr-btn"
                      onClick={() => processWithOCR(capturedImage)}
                    >
                      Retry Text Recognition
                    </button>
                  </div>
                ) : null}
              </div>
            )}
            
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            
            <div className="form-actions">
              <button 
                type="button"
                className="cancel-btn"
                onClick={resetForm}
              >
                Cancel
              </button>
              
              <button 
                type="button"
                className="save-btn"
                onClick={handleSave}
                disabled={isProcessing || saveStatus === 'saving'}
              >
                {saveStatus === 'saving' ? 'Saving...' : 
                 saveStatus === 'success' ? 'Saved!' : 'Save Document'}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="document-scanner">
      <div className="scanner-header">
        <h2>Document Scanner</h2>
        <p>Capture, process, and organize your important documents</p>
      </div>
      
      {scanMode ? renderScanInterface() : renderDocumentForm()}
    </div>
  );
};

export default DocumentScanner;
