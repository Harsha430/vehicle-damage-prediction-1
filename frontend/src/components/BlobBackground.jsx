import React from 'react';
import { motion } from 'framer-motion';

const BlobBackground = () => (
  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', width: '100%', height: '100%' }}>
      <filter id="blobFilter">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
          result="goo"
        />
        <feBlend in="SourceGraphic" in2="goo" />
      </filter>

      <motion.g
        filter="url(#blobFilter)"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <path
          fill="#6366f155"
          d="M42.7,-76.3C55.3,-69.2,65.3,-57.3,73.8,-43.6C82.3,-29.9,89.3,-14.4,90.5,1.4C91.7,17.2,87.1,34.5,78.3,48.4C69.5,62.4,56.5,73.1,42.1,79.1C27.6,85.2,11.8,86.6,-3.5,91.3C-18.8,96.1,-37.6,104.2,-51.8,98.5C-66.1,92.8,-75.8,73.3,-81.4,55.1C-87,36.9,-88.5,19.9,-87.3,3.8C-86.1,-12.4,-82.2,-24.8,-74.7,-35.9C-67.2,-47,-56.1,-56.8,-43.2,-63.8C-30.3,-70.8,-15.1,-75.1,0.7,-76.2C16.6,-77.2,33.1,-75.1,42.7,-76.3Z"
          transform="translate(100 100)"
        />
      </motion.g>
    </svg>
  </div>
);

export default BlobBackground;