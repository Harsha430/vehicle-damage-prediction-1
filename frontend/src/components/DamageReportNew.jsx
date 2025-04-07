import React from 'react';
import { motion } from 'framer-motion';
import { InfoOutlined, LocalOfferOutlined } from '@mui/icons-material';
import './DamageReport.css';

const formatRupees = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

const getSeverityClass = (severity) => {
  switch (severity.toLowerCase()) {
    case 'severe':
      return 'damage-severity-severe';
    case 'moderate':
      return 'damage-severity-moderate';
    case 'minor':
      return 'damage-severity-minor';
    default:
      return 'damage-severity-default';
  }
};

const DamageReport = ({ component, severity, description, location, costEstimate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="damage-report"
    >
      <div className="damage-card">
        {/* Decorative elements */}
        <div className="decorative-blob blob-1"></div>
        <div className="decorative-blob blob-2"></div>
        
        {/* Component header */}
        <div className="damage-header">
          <motion.div 
            className={`severity-indicator ${getSeverityClass(severity)}`}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          ></motion.div>
          <h3 className="damage-component">{component}</h3>
        </div>

        {/* Severity and location */}
        <div className="damage-meta">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className={`severity-badge ${getSeverityClass(severity)}`}>
              {severity.charAt(0).toUpperCase() + severity.slice(1)}
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="damage-location"
          >
            <InfoOutlined className="location-icon" />
            <span className="location-text">{location}</span>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div 
          className="damage-divider"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        ></motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="damage-description">{description}</p>
        </motion.div>

        {/* Cost Estimate */}
        {costEstimate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="cost-estimate"
          >
            <div className="shimmer-effect"></div>
            <div className="cost-header">
              <LocalOfferOutlined className="cost-icon" />
              <h4 className="cost-label">Estimated Repair Cost</h4>
            </div>
            <p className="cost-amount">
              {formatRupees(costEstimate.low)} - {formatRupees(costEstimate.high)}
            </p>
            <span className="cost-note">Includes parts and labor</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default DamageReport; 