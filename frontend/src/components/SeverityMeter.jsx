import React from 'react';
import { Box, LinearProgress, Typography, styled } from '@mui/material';
import { motion } from 'framer-motion';
// import "../styles/index.css";
const severityLevels = {
  none: 0,
  minor: 25,
  moderate: 50,
  severe: 75,
  critical: 100,
};

const severityColors = {
  none: 'success',
  minor: 'info',
  moderate: 'warning',
  severe: 'error',
  critical: 'error',
};

const MeterContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const MeterLabels = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(1),
}));

const AnimatedProgress = styled(motion.div)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  backgroundColor: theme.palette.action.disabledBackground,
  overflow: 'hidden',
}));

const ProgressBar = styled(LinearProgress)(({ theme, severity }) => ({
  height: '100%',
  '& .MuiLinearProgress-bar': {
    borderRadius: 5,
    backgroundColor: theme.palette[severityColors[severity]].main,
  },
}));

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ mt: 2 }}>
          <Typography color="error">Severity meter unavailable</Typography>
        </Box>
      );
    }
    return this.props.children;
  }
}

function SeverityMeter({ severity }) {
  const value = severityLevels[severity] || 0;
  const color = severityColors[severity] || 'info';

  return (
    <MeterContainer>
      <MeterLabels>
        <Typography variant="body2">Damage Severity</Typography>
        <Typography variant="body2" fontWeight="bold">
          {severity.toUpperCase()}
        </Typography>
      </MeterLabels>
      <AnimatedProgress
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <ProgressBar 
          variant="determinate" 
          value={value} 
          severity={severity}
        />
      </AnimatedProgress>
    </MeterContainer>
  );
}

export { ErrorBoundary };

export default function SeverityMeterWithBoundary(props) {
  return (
    <ErrorBoundary>
      <SeverityMeter {...props} />
    </ErrorBoundary>
  );
}