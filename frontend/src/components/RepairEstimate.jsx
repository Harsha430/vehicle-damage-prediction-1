import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LocalOfferOutlined, TrendingUpOutlined, InfoOutlined } from '@mui/icons-material';
import './RepairEstimate.css';

const formatRupees = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

const RepairEstimate = ({ detections }) => {
  // Calculate total cost estimates
  const totalCost = detections.reduce((acc, detection) => {
    return {
      low: acc.low + (detection.cost_estimate?.low || 0),
      high: acc.high + (detection.cost_estimate?.high || 0)
    };
  }, { low: 0, high: 0 });

  // Group detections by type for better organization
  const groupedDetections = detections.reduce((acc, detection) => {
    const type = detection.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(detection);
    return acc;
  }, {});

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="repair-estimate"
    >
      <div className="estimate-card">
        {/* Decorative elements */}
        <div className="decorative-blob blob-1"></div>
        <div className="decorative-blob blob-2"></div>
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="section-header">
            <h2 className="section-title">Repair Estimates</h2>
            <div className="section-underline"></div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="total-cost"
        >
          <div className="shimmer-effect"></div>
          <div className="cost-header">
            <LocalOfferOutlined className="icon" />
            <h3 className="title">Total Estimated Cost</h3>
          </div>
          <p className="amount">
            {formatRupees(totalCost.low)} - {formatRupees(totalCost.high)}
          </p>
          <div className="note">
            <InfoOutlined className="icon small" />
            <span className="text">Estimated range based on detected damages</span>
          </div>
        </motion.div>

        <motion.div 
          className="divider"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        ></motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="breakdown-header"
        >
          <TrendingUpOutlined className="icon" />
          <h3 className="title">Detailed Breakdown</h3>
        </motion.div>

        <AnimatePresence>
          <div className="breakdown-list">
            {Object.entries(groupedDetections).map(([type, detections], index) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="component-group"
              >
                <div className="shimmer-effect"></div>
                <h4 className="component-name">{type}</h4>
                <div className="repair-items">
                  {detections.map((detection, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.1 + idx * 0.1 }}
                      className="repair-item"
                    >
                      <p className="description">{detection.repair_suggestion}</p>
                      <p className="item-cost">
                        {formatRupees(detection.cost_estimate.low)} - {formatRupees(detection.cost_estimate.high)}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default RepairEstimate;