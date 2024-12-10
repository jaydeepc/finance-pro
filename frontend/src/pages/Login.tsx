import { useState, useEffect } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
  InputAdornment,
  IconButton,
  useTheme,
  Paper,
  CircularProgress,
} from '@mui/material'
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material'
import { authAPI } from '../services/api'
import { auth } from '../utils/auth'
import AuthHero from '../components/auth/AuthHero'

function Login() {
  const navigate = useNavigate()
  const theme = useTheme()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (auth.isAuthenticated()) {
      navigate('/')
    }
  }, [navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await authAPI.login(formData.email, formData.password)
      auth.setAuth(response)
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleTogglePassword = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'linear-gradient(45deg, rgba(46,92,255,0.1), rgba(0,201,255,0.1))',
          filter: 'blur(60px)',
          animation: 'float 8s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0) scale(1)' },
            '50%': { transform: 'translateY(20px) scale(1.05)' },
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -50,
          left: -50,
          width: 250,
          height: 250,
          borderRadius: '50%',
          background: 'linear-gradient(45deg, rgba(0,201,255,0.1), rgba(46,92,255,0.1))',
          filter: 'blur(50px)',
          animation: 'float 6s ease-in-out infinite reverse',
        }}
      />

      {/* Left side - Hero Section */}
      <Box
        sx={{
          flex: '1 1 50%',
          display: { xs: 'none', md: 'block' },
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '1px',
            height: '100%',
            background: `linear-gradient(to bottom, 
              transparent, 
              ${theme.palette.divider}, 
              transparent
            )`,
          },
        }}
      >
        <AuthHero />
      </Box>

      {/* Right side - Login Form */}
      <Box
        sx={{
          flex: '1 1 50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 6,
          position: 'relative',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            maxWidth: '400px',
            width: '100%',
            background: theme.palette.mode === 'dark' 
              ? 'rgba(255,255,255,0.03)' 
              : 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(20px)',
            borderRadius: 4,
            p: 4,
            position: 'relative',
            overflow: 'hidden',
            border: `1px solid ${theme.palette.divider}`,
            animation: 'fadeIn 0.6s ease-out',
            '@keyframes fadeIn': {
              from: {
                opacity: 0,
                transform: 'translateY(20px) scale(0.98)',
              },
              to: {
                opacity: 1,
                transform: 'translateY(0) scale(1)',
              },
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #2E5CFF, #00C9FF)',
            },
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 700,
              textAlign: 'center',
              mb: 4,
              background: 'linear-gradient(45deg, #2E5CFF, #00C9FF)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px',
            }}
          >
            Welcome Back
          </Typography>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: 2,
                animation: 'slideIn 0.3s ease-out',
                '@keyframes slideIn': {
                  from: {
                    opacity: 0,
                    transform: 'translateY(-10px)',
                  },
                  to: {
                    opacity: 1,
                    transform: 'translateY(0)',
                  },
                },
              }}
            >
              {error}
            </Alert>
          )}

          <Box 
            component="form" 
            onSubmit={handleSubmit}
            sx={{
              '& .MuiTextField-root': {
                mb: 2.5,
              },
            }}
          >
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover, &.Mui-focused': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(46,92,255,0.1)',
                  },
                },
              }}
            />

            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePassword}
                      edge="end"
                      sx={{
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
                      }}
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover, &.Mui-focused': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(46,92,255,0.1)',
                  },
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 3,
                mb: 3,
                py: 1.5,
                borderRadius: 2,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                background: 'linear-gradient(45deg, #2E5CFF 0%, #00C9FF 100%)',
                boxShadow: '0 4px 12px rgba(46,92,255,0.2)',
                transition: 'all 0.2s ease-in-out',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(45deg, #5B7FFF 0%, #6EFFFF 100%)',
                  opacity: 0,
                  transition: 'opacity 0.2s ease-in-out',
                },
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(46,92,255,0.3)',
                  '&::before': {
                    opacity: 1,
                  },
                },
                '& > *': {
                  position: 'relative',
                  zIndex: 1,
                },
              }}
            >
              {loading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={20} color="inherit" />
                  <span>Signing in...</span>
                </Box>
              ) : (
                'Sign In'
              )}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Link
                component={RouterLink}
                to="/register"
                sx={{
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'all 0.2s ease-in-out',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -2,
                    left: 0,
                    width: '0%',
                    height: '2px',
                    background: 'linear-gradient(90deg, #2E5CFF, #00C9FF)',
                    transition: 'width 0.2s ease-in-out',
                  },
                  '&:hover': {
                    color: theme.palette.primary.dark,
                    '&::after': {
                      width: '100%',
                    },
                  },
                }}
              >
                Don't have an account? Sign up
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}

export default Login
