import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import TeamIcon from '@mui/icons-material/Group';
import Header from '../components/Header';
import FileUpload from '../components/FileUpload';
import './Home.css';
import { uploadImage } from '../utils/api';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const itemVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 12,
      mass: 0.5
    }
  }
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Add particles on component mount
  useEffect(() => {
    createParticles();
  }, []);

  const createParticles = () => {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random positions and animations
      const size = Math.random() * 6 + 2;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const xDest = (Math.random() - 0.5) * 200;
      const yDest = (Math.random() - 0.5) * 200;
      const delay = Math.random() * 10;
      const duration = Math.random() * 20 + 10;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.setProperty('--x', `${xDest}px`);
      particle.style.setProperty('--y', `${yDest}px`);
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;
      
      particlesContainer.appendChild(particle);
    }
    
    document.querySelector('.home-page').appendChild(particlesContainer);
    
    return () => {
      document.querySelector('.home-page')?.removeChild(particlesContainer);
    };
  };

  const handleUpload = async (file) => {
    try {
      setLoading(true);
      const response = await uploadImage(file);
      console.log('Upload response:', response);

      // Prepare navigation data
      const navigationData = {
        original_image: response.original_image,
        annotated_image: response.annotated_image,
        overall_severity: response.overall_severity,
        repair_urgency: response.repair_urgency,
        detections: response.detections
      };

      console.log('Preparing to navigate with data:', navigationData);

      // Store data in sessionStorage
      sessionStorage.setItem('uploadData', JSON.stringify(navigationData));
      
      // Verify the data was stored
      const storedData = sessionStorage.getItem('uploadData');
      console.log('Stored data verification:', storedData);

      // Navigate to results page
      navigate('/results', { state: { data: navigationData } });
    } catch (error) {
      console.error('Upload error:', error);
      // Show error message to user
      alert('Upload failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <Header />
      
      {/* Background Blobs */}
      <div className="background-blob blob-1"></div>
      <div className="background-blob blob-2"></div>
      <div className="background-blob blob-3"></div>
      
      <div className="home-container">
        <motion.div 
          className="hero-section"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Main Title */}
          <motion.h1 className="hero-title" variants={itemVariants}>
            Advanced Car Damage <span>Assessment</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p className="hero-subtitle" variants={itemVariants}>
            Upload high-quality images of your vehicle to receive a comprehensive damage analysis with detailed repair estimates and severity assessment.
          </motion.p>

          {/* Upload Container */}
          {loading ? (
            <motion.div 
              className="loading-spinner-container"
              variants={itemVariants}
            >
              <div className="loading-spinner"></div>
              <h2 className="loading-text">Analyzing damage patterns...</h2>
              <p className="loading-subtext">This usually takes 10-15 seconds</p>
            </motion.div>
          ) : (
            <motion.div 
              className="upload-container"
              variants={itemVariants}
            >
              <FileUpload onUpload={handleUpload} loading={loading} />
            </motion.div>
          )}
        </motion.div>
        
        {/* Footer */}
        <motion.div 
          className="footer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="footer-content">
            <div className="footer-item">
              <TeamIcon className="footer-icon" />
              <span>Team ML Mayhem</span>
            </div>
            <div className="footer-contact">
              <div className="footer-item">
                <PhoneIcon className="footer-icon" />
                <span>6302313370</span>
              </div>
              <div className="footer-item">
                <EmailIcon className="footer-icon" />
                <span>harsha123@gmail.com</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}