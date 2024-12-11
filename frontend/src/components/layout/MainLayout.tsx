import { useState } from 'react'
import { Outlet, useNavigate, Link as RouterLink, useLocation } from 'react-router-dom'
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  useTheme,
  Avatar,
  Badge,
  ListItemButton,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Timeline as TimelineIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material'
import { auth } from '../../utils/auth'
import { useTheme as useCustomTheme } from '../../contexts/ThemeContext'

const drawerWidth = 280

function MainLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const { darkMode, toggleDarkMode } = useCustomTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleLogout = () => {
    auth.clearAuth()
    navigate('/login')
  }

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Financial Profile', icon: <PersonIcon />, path: '/profile' },
    { text: 'Retirement Planning', icon: <TimelineIcon />, path: '/retirement' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ]

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: theme.palette.primary.main,
            color: '#FFFFFF',
          }}
        >
          FA
        </Avatar>
        <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
          Financial Advisor
        </Typography>
      </Box>
      <Divider sx={{ mx: 2 }} />
      <List sx={{ flex: 1, px: 1 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={RouterLink}
            to={item.path}
            selected={location.pathname === item.path}
            onClick={() => setMobileOpen(false)}
            sx={{
              py: 1.5,
              px: 2,
              '& .MuiListItemIcon-root': {
                color: location.pathname === item.path ? theme.palette.primary.main : theme.palette.text.secondary,
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText 
              primary={item.text}
              primaryTypographyProps={{
                fontSize: '0.95rem',
                fontWeight: location.pathname === item.path ? 600 : 500,
                color: location.pathname === item.path ? theme.palette.primary.main : theme.palette.text.primary,
              }}
            />
          </ListItemButton>
        ))}
      </List>
      <Divider sx={{ mx: 2 }} />
      <List sx={{ px: 1 }}>
        <ListItemButton 
          onClick={toggleDarkMode} 
          sx={{ 
            py: 1.5, 
            px: 2,
            '& .MuiListItemIcon-root': {
              color: theme.palette.text.secondary,
            },
          }}
        >
          <ListItemIcon>
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </ListItemIcon>
          <ListItemText 
            primary={darkMode ? 'Light Mode' : 'Dark Mode'}
            primaryTypographyProps={{ fontSize: '0.95rem' }}
          />
        </ListItemButton>
        <ListItemButton 
          onClick={handleLogout} 
          sx={{ 
            py: 1.5, 
            px: 2,
            '& .MuiListItemIcon-root': {
              color: theme.palette.text.secondary,
            },
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Logout"
            primaryTypographyProps={{ fontSize: '0.95rem' }}
          />
        </ListItemButton>
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: theme.palette.mode === 'dark' ? '#003D4F' : '#FFFFFF',
          borderBottom: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2, 
              display: { sm: 'none' },
              color: theme.palette.mode === 'dark' ? '#FFFFFF' : theme.palette.text.primary
            }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ flex: 1 }} />
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton 
              sx={{ 
                color: theme.palette.text.secondary,
                '&:hover': {
                  background: darkMode 
                    ? 'rgba(255,255,255,0.05)'
                    : 'rgba(0,0,0,0.05)',
                },
              }}
            >
              <Badge badgeContent={3} color="primary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            
            <Avatar
              sx={{
                cursor: 'pointer',
                bgcolor: theme.palette.primary.main,
                color: '#FFFFFF',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              U
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              bgcolor: theme.palette.mode === 'dark' ? '#003D4F' : '#FFFFFF',
              borderRight: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : theme.palette.divider}`,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              bgcolor: theme.palette.mode === 'dark' ? '#003D4F' : '#FFFFFF',
              borderRight: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : theme.palette.divider}`,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: '64px',
          bgcolor: theme.palette.mode === 'dark' ? '#002A38' : '#F8FAFF',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

export default MainLayout
