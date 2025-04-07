import { keyframes } from '@emotion/react'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles' // ✅ import styled
import { motion } from 'framer-motion' // ✅ import motion
import React from 'react'
// import "../styles/index.css";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const SpinnerCircle = styled(Box)(({ theme, size }) => ({
  width: size,
  height: size,
  border: `4px solid ${theme.palette.primary.light}`,
  borderTop: `4px solid ${theme.palette.primary.main}`,
  borderRadius: '50%',
  animation: `${spin} 1s linear infinite`,
}))

export default function Spinner({ size = 40 }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <SpinnerCircle size={size} />
    </motion.div>
  )
}
