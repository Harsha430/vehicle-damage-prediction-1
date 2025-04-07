import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DamageReport from "../components/DamageReportNew";
import RepairEstimate from "../components/RepairEstimate";
import "./Results.css";

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
      opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
      ease: "easeInOut"
    }
  },
  exit: {
    opacity: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
      staggerDirection: -1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100
    }
  },
  exit: {
    y: -20,
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8
    }
  }
};

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({ original: false, annotated: false });

  useEffect(() => {
    // First try to get data from location state
    if (location.state && location.state.data) {
      console.log("Data from location state:", location.state.data);
      setData(location.state.data);
    } else {
      // If not available, try to get from sessionStorage
      const storedData = sessionStorage.getItem('uploadData');
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          console.log("Data from sessionStorage:", parsedData);
          setData(parsedData);
        } catch (error) {
          console.error('Error parsing stored data:', error);
          navigate('/');
        }
      } else {
        console.log("No data found!");
        // No data available, redirect to home
        navigate('/');
      }
    }
  }, [location, navigate]);

  // Force render content after a timeout even if images don't load
  useEffect(() => {
    if (data) {
      const timer = setTimeout(() => {
        if (!hasLoaded) {
          console.log("Force showing content after timeout");
          setHasLoaded(true);
        }
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [data, hasLoaded]);

  const handleImageLoad = (type) => {
    console.log(`Image loaded: ${type}`);
    setImagesLoaded(prev => ({
      ...prev,
      [type]: true
    }));
  };

  useEffect(() => {
    if (imagesLoaded.original && imagesLoaded.annotated) {
      // Add a small delay for smoother transition
      const timer = setTimeout(() => setHasLoaded(true), 500);
      return () => clearTimeout(timer);
    }
  }, [imagesLoaded]);

  const goBack = () => {
      navigate('/');
  };

  // Create particles for background
  useEffect(() => {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random positions and animations
      const size = Math.random() * 5 + 2;
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
    
    document.querySelector('.results-page')?.appendChild(particlesContainer);
    
    return () => {
      document.querySelector('.results-page')?.removeChild(particlesContainer);
    };
  }, []);

  if (!data) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading analysis data...</div>
        </div>
      </div>
    );
  }
  
  return (
    <AnimatePresence>
      <motion.div
        className="results-page"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={fadeInVariants}
      >
        {/* Background Elements */}
        <div className="background-blob background-blob-1"></div>
        <div className="background-blob background-blob-2"></div>
        
        {/* Back Button */}
        <div className="back-button-container">
          <Button 
            className="back-button"
            startIcon={<ArrowBackIcon />}
            onClick={goBack}
          >
            Back
          </Button>
        </div>
        
        <div className="container">
          <motion.div 
            className="content-container"
            variants={containerVariants}
          >
            {!hasLoaded ? (
              <div className="loading-screen">
                <div className="loading-content">
                  <div className="loading-spinner"></div>
                  <div className="loading-text">Loading images...</div>
                </div>
              </div>
            ) : (
              <div className="main-grid">
                {/* Images Section */}
                <motion.div className="image-section" variants={itemVariants}>
                  <div className="section-header">
                    <h2 className="section-title">Vehicle Images</h2>
                    <div className="section-underline"></div>
                  </div>
                  
                  <div className="image-grid">
                    {/* Original Image */}
                    <motion.div 
                      className="image-card"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <div className="image-wrapper">
                        <img
                          className="result-image"
                        src={data.original_image} 
                          alt="Original Vehicle"
                          onLoad={() => handleImageLoad('original')}
                          onError={() => {
                            console.error("Failed to load original image:", data.original_image);
                            handleImageLoad('original');
                          }}
                          style={{ display: imagesLoaded.original ? 'block' : 'none' }}
                        />
                        {!imagesLoaded.original && (
                          <div className="image-loading">
                            <div className="image-loading-spinner"></div>
                          </div>
                        )}
                        <div className="image-overlay">
                          <h3 className="image-title">Original Image</h3>
                          <p className="image-caption">Vehicle before damage analysis</p>
                        </div>
                      </div>
                    </motion.div>
                    
                    {/* Annotated Image */}
                    <motion.div 
                      className="image-card"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <div className="image-wrapper">
                        <img
                          className="result-image"
                          src={data.annotated_image}
                          alt="Annotated Vehicle"
                          onLoad={() => handleImageLoad('annotated')}
                          onError={() => {
                            console.error("Failed to load annotated image:", data.annotated_image);
                            handleImageLoad('annotated');
                          }}
                          style={{ display: imagesLoaded.annotated ? 'block' : 'none' }}
                        />
                        {!imagesLoaded.annotated && (
                          <div className="image-loading">
                            <div className="image-loading-spinner"></div>
                          </div>
                        )}
                        <div className="image-overlay">
                          <h3 className="image-title">Annotated Image</h3>
                          <p className="image-caption">Damage points identified</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
                
                {/* Quick Summary Section */}
                <motion.div className="summary-section" variants={itemVariants}>
                  <div className="section-header">
                    <h2 className="section-title">Quick Summary</h2>
                    <div className="section-underline"></div>
                  </div>
                  
                  <div className="quick-summary">
                    <div className="decorative-blob decorative-blob-1"></div>
                    <div className="decorative-blob decorative-blob-2"></div>
                    
                    <div className="summary-grid">
                      {/* Overall Severity */}
                      <motion.div 
                        className="summary-card summary-card-severity"
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <div className="card-label">Overall Severity</div>
                        <div className="card-value severity-value">{data.overall_severity}</div>
                        <div className="progress-bar-container">
                          <motion.div 
                            className="progress-bar" 
                            initial={{ width: 0 }}
                            animate={{ 
                              width: data.overall_severity === 'Severe' ? '100%' : 
                                     data.overall_severity === 'Moderate' ? '65%' : '30%' 
                            }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                          />
                          <div className="shimmer-effect"></div>
                        </div>
                        <div className="card-caption">Based on component damage assessment</div>
                      </motion.div>
                      
                      {/* Repair Urgency */}
                      <motion.div 
                        className="summary-card summary-card-urgency"
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <div className="card-label">Repair Urgency</div>
                        <div className="card-value urgency-value">{data.repair_urgency}</div>
                        <div className="progress-bar-container">
                          <motion.div 
                            className="progress-bar" 
                            initial={{ width: 0 }}
                            animate={{ 
                              width: data.repair_urgency === 'Immediate' ? '100%' : 
                                     data.repair_urgency === 'Soon' ? '65%' : '30%' 
                            }}
                            style={{ 
                              background: data.repair_urgency === 'Immediate' ? 'linear-gradient(to right, #f59e0b, #ef4444)' : 
                                        'linear-gradient(to right, #10b981, #059669)' 
                            }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                          />
                          <div className="shimmer-effect"></div>
                        </div>
                        <div className="card-caption">Recommended timeframe for repairs</div>
                      </motion.div>
                      
                      {/* Total Damages */}
                      <motion.div 
                        className="summary-card summary-card-full"
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <div className="card-label">Total Damages Detected</div>
                        <div className="card-value">{data.detections.length} component{data.detections.length !== 1 ? 's' : ''}</div>
                        <div className="card-caption">View detailed breakdown below</div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Damage Reports Section */}
                <motion.div className="damage-reports-section" variants={itemVariants}>
                  <div className="section-header">
                    <h2 className="section-title">Damage Details</h2>
                    <div className="section-underline"></div>
                  </div>
                  
                  <div className="damage-reports-container">
                    {data.detections.map((detection, index) => (
                      <motion.div 
                        key={index}
                        className="damage-report-container"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                    <DamageReport 
                          component={detection.type}
                          severity={detection.severity}
                          description={detection.repair_suggestion}
                          confidence={detection.confidence}
                          location={detection.location || `Part ${index + 1}`}
                          costEstimate={detection.cost_estimate}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                {/* Repair Estimate Section */}
                <motion.div className="repair-estimate-section" variants={itemVariants}>
                  <div className="section-header">
                    <h2 className="section-title">Repair Estimate</h2>
                    <div className="section-underline"></div>
                  </div>
                  
                  <div className="repair-estimate-container">
                    <RepairEstimate detections={data.detections} />
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}