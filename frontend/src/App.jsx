import React from 'react';
import { Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Results from './pages/Results';

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Box component="main" sx={{ flexGrow: 1, py: 2 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
     
      </Box>
    </BrowserRouter>
  );
}

export default App;