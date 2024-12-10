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
  const [darkMode, setDarkMode] = useState(false);
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
    try {
      const newSettings = {
        ...settings,
        darkMode: !darkMode,
      };
      await financialAPI.updateSettings(newSettings);
      setSettings(newSettings);
      setDarkMode(!darkMode);
    } catch (error) {
      console.error('Failed to update theme settings:', error);
    }
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#2E5CFF',
        light: '#5B7FFF',
        dark: '#0039CB',
      },
      secondary: {
        main: '#00C9FF',
        light: '#6EFFFF',
        dark: '#0098CC',
      },
      background: {
        default: darkMode ? '#121212' : '#F8FAFF',
        paper: darkMode ? '#1E1E2D' : '#FFFFFF',
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
      text: {
        primary: darkMode ? '#FFFFFF' : '#2A2A42',
        secondary: darkMode ? '#B5B5C3' : '#6B6B80',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 600,
        fontSize: '2.5rem',
      },
      h2: {
        fontWeight: 600,
        fontSize: '2rem',
      },
      h3: {
        fontWeight: 600,
        fontSize: '1.75rem',
      },
      h4: {
        fontWeight: 600,
        fontSize: '1.5rem',
      },
      h5: {
        fontWeight: 600,
        fontSize: '1.25rem',
      },
      h6: {
        fontWeight: 600,
        fontSize: '1rem',
      },
      button: {
        textTransform: 'none',
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: darkMode 
              ? 'linear-gradient(90deg, #1E1E2D 0%, #2D2D44 100%)'
              : 'linear-gradient(90deg, #FFFFFF 0%, #F8FAFF 100%)',
            boxShadow: darkMode 
              ? '0 2px 6px 0 rgba(0,0,0,0.3)'
              : '0 2px 6px 0 rgba(45,92,255,0.1)',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            background: darkMode 
              ? 'linear-gradient(180deg, #1E1E2D 0%, #2D2D44 100%)'
              : 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFF 100%)',
            borderRight: 'none',
            boxShadow: darkMode 
              ? '2px 0 6px 0 rgba(0,0,0,0.3)'
              : '2px 0 6px 0 rgba(45,92,255,0.1)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            padding: '8px 16px',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 8px rgba(45,92,255,0.2)',
            },
          },
          contained: {
            background: 'linear-gradient(45deg, #2E5CFF 0%, #00C9FF 100%)',
            color: '#FFFFFF',
            '&:hover': {
              background: 'linear-gradient(45deg, #5B7FFF 0%, #6EFFFF 100%)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: darkMode 
              ? '0 4px 12px rgba(0,0,0,0.3)'
              : '0 4px 12px rgba(45,92,255,0.1)',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: darkMode 
                ? '0 6px 16px rgba(0,0,0,0.4)'
                : '0 6px 16px rgba(45,92,255,0.2)',
            },
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            margin: '4px 8px',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              background: darkMode 
                ? 'rgba(46,92,255,0.1)'
                : 'rgba(46,92,255,0.05)',
            },
            '&.Mui-selected': {
              background: darkMode 
                ? 'rgba(46,92,255,0.2)'
                : 'rgba(46,92,255,0.1)',
              '&:hover': {
                background: darkMode 
                  ? 'rgba(46,92,255,0.25)'
                  : 'rgba(46,92,255,0.15)',
              },
            },
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: darkMode ? '#B5B5C3' : '#6B6B80',
            minWidth: 40,
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          primary: {
            color: darkMode ? '#FFFFFF' : '#2A2A42',
            fontWeight: 500,
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
