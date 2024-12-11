import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { financialAPI } from '../services/api';
import { UserSettings } from '../types/api';

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize from localStorage if available
    const savedMode = localStorage.getItem('theme_mode');
    return savedMode ? savedMode === 'dark' : false;
  });
  const [settings, setSettings] = useState<UserSettings>({
    darkMode: false,
    emailNotifications: true,
    twoFactorAuth: false,
    marketingEmails: false,
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const userSettings = await financialAPI.getSettings();
        setSettings(userSettings);
        setDarkMode(userSettings.darkMode);
      } catch (error) {
        console.error('Failed to load theme settings:', error);
      }
    };

    if (localStorage.getItem('financial_advisor_token')) {
      loadSettings();
    }
  }, []);

  const toggleDarkMode = async () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('theme_mode', newDarkMode ? 'dark' : 'light');

    // Only update API if user is logged in
    if (localStorage.getItem('financial_advisor_token')) {
      try {
        const newSettings = {
          ...settings,
          darkMode: newDarkMode,
        };
        await financialAPI.updateSettings(newSettings);
        setSettings(newSettings);
      } catch (error) {
        console.error('Failed to update theme settings:', error);
      }
    }
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#F2617A',
        light: '#FF7B93',
        dark: '#D94D64',
      },
      secondary: {
        main: darkMode ? '#FFFFFF' : '#003D4F',
        light: darkMode ? '#FFFFFF' : '#004D63',
        dark: darkMode ? '#E0E0E0' : '#002A38',
      },
      background: {
        default: darkMode ? '#003D4F' : '#FFFFFF',
        paper: darkMode ? '#00485C' : '#FFFFFF',
      },
      text: {
        primary: darkMode ? '#FFFFFF' : '#003D4F',
        secondary: darkMode ? '#B0B0B0' : '#4A5568',
      },
      error: {
        main: '#FF3B3B',
      },
      success: {
        main: '#00C48C',
      },
      warning: {
        main: '#FFB946',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: '3rem',
      },
      h2: {
        fontWeight: 700,
        fontSize: '2.5rem',
      },
      h3: {
        fontWeight: 700,
        fontSize: '2rem',
      },
      h4: {
        fontWeight: 700,
        fontSize: '1.75rem',
      },
      h5: {
        fontWeight: 600,
        fontSize: '1.5rem',
      },
      h6: {
        fontWeight: 600,
        fontSize: '1.25rem',
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '10px 24px',
            fontSize: '1rem',
            fontWeight: 600,
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
              backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : '#F7FAFC',
              '& fieldset': {
                borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#E2E8F0',
              },
              '&:hover fieldset': {
                borderColor: darkMode ? 'rgba(255,255,255,0.2)' : '#CBD5E0',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#F2617A',
              },
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
