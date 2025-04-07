import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Container, Button, Grid, Paper, Typography, useTheme, Select, MenuItem } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import DamageReport from '../components/DamageReport';
import RepairEstimate from '../components/RepairEstimate';
import { styled } from '@mui/system';
import React from 'react';

const ImageCard = styled('div')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
  position: 'relative',
  boxShadow: theme.shadows[4],
  transition: 'all 0.3s ease',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
    '& .image-overlay': {
      opacity: 1,
    }
  }
}));

const ImageContainer = styled('div')({
  position: 'relative',
  overflow: 'hidden',
  flexGrow: 1,
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
  }
});

const ImageOverlay = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
  color: '#fff',
  padding: theme.spacing(3),
  opacity: 0,
  transition: 'opacity 0.3s ease',
}));

const BackButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  padding: theme.spacing(1.5, 3),
  borderWidth: 2,
  fontWeight: 600,
  letterSpacing: 0.5,
  borderRadius: 12,
  '&:hover': {
    borderWidth: 2,
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
  transition: 'all 0.3s ease',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  letterSpacing: '-0.02em',
  marginBottom: theme.spacing(3),
  position: 'relative',
  display: 'inline-block',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: 0,
    width: '40%',
    height: 4,
    background: theme.palette.primary.main,
    borderRadius: 2
  }
}));

const DamageCard = ({ component, severity, description, location, costEstimate }) => {
  const theme = useTheme();
  
  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 3, 
        borderRadius: 3,
        height: '100%',
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(to bottom, #1E293B, #0F172A)'
          : 'linear-gradient(to bottom, #F8FAFC, #F1F5F9)'
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" fontWeight={700} color="primary">
          {component}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Severity: {severity.charAt(0).toUpperCase() + severity.slice(1)}
        </Typography>
      </Box>
      
      <Typography variant="body1" sx={{ mb: 2 }}>
        {description}
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {location}
      </Typography>
      
      {costEstimate && (
        <Box sx={{ 
          mt: 2,
          p: 2,
          borderRadius: 2,
          background: theme.palette.mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.05)'
            : 'rgba(0, 0, 0, 0.02)'
        }}>
          <Typography variant="subtitle2" color="text.secondary">
            Estimated Cost Range:
          </Typography>
          <Typography variant="h6" color="primary">
            ${costEstimate.low} - ${costEstimate.high}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const { data } = location.state || {};

  if (!data) {
    navigate('/');
    return null;
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      background: theme.palette.background.default
    }}>
      <Header />
      
      <Container maxWidth="xl" sx={{ 
        py: { xs: 4, md: 6 },
        px: { xs: 2, sm: 4 },
        position: 'relative'
      }}>
        <BackButton 
          variant="outlined" 
          color="primary"
          onClick={() => navigate('/')}
          component={motion.div}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          ← Back to Upload
        </BackButton>

        <AnimatePresence>
          <Grid container spacing={4}>
            {/* Image Comparison Section */}
            <Grid item xs={12} lg={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <SectionTitle variant="h5" color="text.primary">
                  Damage Visualization
                </SectionTitle>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <ImageCard>
                      <ImageContainer>
                        <Box
                          component={motion.img}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          src={data.original_image}
                          alt="Original Vehicle"
                        />
                        <ImageOverlay className="image-overlay">
                          <Typography variant="subtitle2">Original Image</Typography>
                        </ImageOverlay>
                      </ImageContainer>
                    </ImageCard>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ImageCard>
                      <ImageContainer>
                        <Box
                          component={motion.img}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          src={data.annotated_image}
                          alt="Damage Annotations"
                        />
                        <ImageOverlay className="image-overlay">
                          <Typography variant="subtitle2">AI Analysis</Typography>
                          <Typography variant="caption">Detected damage areas highlighted</Typography>
                        </ImageOverlay>
                      </ImageContainer>
                    </ImageCard>
                  </Grid>
                </Grid>
              </motion.div>
            </Grid>

            {/* Quick Summary Section */}
            <Grid item xs={12} lg={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <SectionTitle variant="h5" color="text.primary">
                  Quick Summary
                </SectionTitle>
                <Paper elevation={2} sx={{ 
                  p: 3, 
                  borderRadius: 3,
                  background: theme.palette.mode === 'dark' 
                    ? 'linear-gradient(to bottom, #1E293B, #0F172A)'
                    : 'linear-gradient(to bottom, #F8FAFC, #F1F5F9)'
                }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Overall Severity
                      </Typography>
                      <Typography variant="h6" fontWeight={700}>
                        {data.overall_severity.charAt(0).toUpperCase() + data.overall_severity.slice(1)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Repair Urgency
                      </Typography>
                      <Typography variant="h6" fontWeight={700}>
                        {data.repair_urgency.charAt(0).toUpperCase() + data.repair_urgency.slice(1)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ 
                        height: 8,
                        background: theme.palette.grey[200],
                        borderRadius: 4,
                        overflow: 'hidden',
                        mt: 1
                      }}>
                        <Box sx={{
                          height: '100%',
                          width: `${(data.detections.length / 10) * 100}%`,
                          background: theme.palette.primary.main,
                          borderRadius: 4
                        }} />
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {data.detections.length} damage points detected
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </motion.div>
            </Grid>

            {/* Main Content Sections */}
            <Grid item xs={12} md={7}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <DamageReport data={data} />
              </motion.div>
            </Grid>

            <Grid item xs={12} md={5}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <RepairEstimate data={data} />
              </motion.div>
            </Grid>
          </Grid>
        </AnimatePresence>
      </Container>
    </Box>
  );
}