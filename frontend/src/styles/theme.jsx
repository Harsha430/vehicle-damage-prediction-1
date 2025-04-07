import { createTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // Default mode (can be switched to dark)
    primary: {
      main: '#4F46E5',  // Vibrant indigo (better contrast)
      light: '#818CF8',
      dark: '#4338CA',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#10B981',  // Emerald green
      light: '#34D399',
      dark: '#059669',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#EF4444',  // Modern red
      light: '#FCA5A5',
      dark: '#DC2626',
    },
    warning: {
      main: '#F59E0B',  // Amber
      light: '#FCD34D',
      dark: '#D97706',
    },
    info: {
      main: '#3B82F6',  // Bright blue
      light: '#93C5FD',
      dark: '#2563EB',
    },
    success: {
      main: '#10B981',  // Matching secondary
      light: '#6EE7B7',
      dark: '#059669',
    },
    background: {
      default: '#F9FAFB',  // Very light gray
      paper: '#FFFFFF',
    },
    text: {
      primary: '#111827',  // Gray-900
      secondary: '#6B7280',  // Gray-500
      disabled: '#9CA3AF',  // Gray-400
    },
    divider: '#E5E7EB',  // Gray-200
    action: {
      hoverOpacity: 0.08,
      selectedOpacity: 0.12,
      disabledOpacity: 0.38,
    },
  },
  typography: {
    fontFamily: [
      '"Inter"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontWeight: 800,
      fontSize: '3rem',
      lineHeight: 1.2,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.3,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.875rem',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.5,
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    body1: {
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.025em',
    },
    caption: {
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 1.5,
      color: '#6B7280',
    },
    overline: {
      fontWeight: 600,
      fontSize: '0.75rem',
      lineHeight: 1.5,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 12, // More modern rounded corners
  },
  spacing: 8, // 8px base unit
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '10px 20px',
          borderRadius: '10px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          },
        },
        sizeLarge: {
          padding: '12px 24px',
          fontSize: '1rem',
        },
        sizeSmall: {
          padding: '8px 16px',
          fontSize: '0.875rem',
        },
        contained: {
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none', // Remove gradient overlay
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          '&.MuiMenu-paper': {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            boxShadow: `0 0 0 3px ${alpha('#4F46E5', 0.2)}`,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '16px',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: '8px',
          padding: '8px 12px',
          fontSize: '0.875rem',
        },
      },
    },
  },
});

// Create dark theme variant
export const darkTheme = createTheme({
  ...theme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#818CF8',
      light: '#A5B4FC',
      dark: '#6366F1',
      contrastText: '#1F2937',
    },
    secondary: {
      main: '#6EE7B7',
      light: '#A7F3D0',
      dark: '#34D399',
      contrastText: '#1F2937',
    },
    background: {
      default: '#111827',
      paper: '#1F2937',
    },
    text: {
      primary: '#F9FAFB',
      secondary: '#D1D5DB',
      disabled: '#9CA3AF',
    },
    divider: '#374151',
  },
});

export default theme;