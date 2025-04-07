import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FileUpload = ({ onUpload, loading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp')) {
      setSelectedFile(file);
      onUpload(file);
    } else {
      alert('Please upload a valid image file (JPEG, PNG, or WEBP)');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="upload-container">
      <div 
        className={`upload-box ${dragActive ? 'active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          id="file-upload"
          onChange={handleChange}
          accept=".jpg,.jpeg,.png,.webp"
          style={{ display: 'none' }}
        />
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <CloudUploadIcon className="upload-icon" />
        </motion.div>
        
        <h3 className="upload-text">
          {selectedFile ? selectedFile.name : 'Drag & Drop or Click to Upload'}
        </h3>
        
        <p className="upload-subtext">
          Supported formats: JPEG, PNG, WEBP
        </p>
        
        <motion.button 
          className="upload-button"
          onClick={onButtonClick}
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {selectedFile ? 'Upload Another Image' : 'Select Image'}
        </motion.button>

        <div className="shimmer-effect"></div>
      </div>
    </div>
  );
};

export default FileUpload;