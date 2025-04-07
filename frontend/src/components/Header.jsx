import React from 'react'
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Menu, MenuItem } from '@mui/material'
import { motion } from 'framer-motion'
import MenuIcon from '@mui/icons-material/Menu'
import { ErrorBoundary } from './SeverityMeter';

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ErrorBoundary>
      <AppBar position="static" sx={{ 
        background: 'linear-gradient(90deg, #1a1a1a, #2c2c2c)',
        color: 'common.white',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(8px)',
        transition: 'background-color 0.3s ease'
      }}>
        <Toolbar>
          <Box display="flex" alignItems="center" flexGrow={1}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box display="flex" alignItems="center">
                <img src="/logos/logo.png" alt="Logo" style={{ height: '40px', filter: 'brightness(0) invert(1)' }} />
                <Typography variant="h5" component="span" sx={{ 
                  ml: 2,
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  background: 'linear-gradient(90deg, #ffffff, #e0e0e0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  AutoAssess
                </Typography>
              </Box>
            </motion.div>
          </Box>
    
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button color="inherit" sx={{ 
              textTransform: 'none', 
              fontSize: '1rem',
              borderRadius: '8px',
              padding: '6px 16px',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)'
              }
            }}>Home</Button>
          </Box>
    
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
              sx={{ 
                p: 1,
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  minWidth: '180px',
                  borderRadius: '8px',
                  background: '#1a1a1a',
                  color: 'white',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                }
              }}
            >
              <MenuItem onClick={handleClose} sx={{ py: 1.5, color: 'white' }}>Home</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </ErrorBoundary>
  )
}