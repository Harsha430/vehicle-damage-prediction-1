import { keyframes } from '@emotion/react'

export const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`

export const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`

export const blink = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
`