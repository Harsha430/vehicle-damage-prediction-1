import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{
      bgcolor: 'primary.main',
      color: 'common.white',
      py: 8,
      mt: 'auto',
      borderTop: '1px solid',
      borderColor: 'divider'
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 8 }} columns={12}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              AutoAssess
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Making car assessment simple and efficient.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Resources
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Link href="#" color="inherit" sx={{ '&:hover': { opacity: 0.8 }, textDecoration: 'none' }}>Documentation</Link>
              <Link href="#" color="inherit" sx={{ '&:hover': { opacity: 0.8 }, textDecoration: 'none' }}>Support</Link>
              <Link href="#" color="inherit" sx={{ '&:hover': { opacity: 0.8 }, textDecoration: 'none' }}>API Status</Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Contact
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Email: info@autoassess.com
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
              Phone: (555) 123-4567
            </Typography>
          </Grid>
        </Grid>
        <Box mt={6} textAlign="center">
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © {new Date().getFullYear()} AutoAssess. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}