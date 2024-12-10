import { Box, Typography, useTheme } from '@mui/material'
import { AccountBalance as AccountBalanceIcon, Security as SecurityIcon, TrendingUp as TrendingUpIcon } from '@mui/icons-material'

export default function AuthHero() {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  const features = [
    {
      icon: <AccountBalanceIcon sx={{ fontSize: 24 }} />,
      title: 'Smart Banking',
      description: 'Experience intelligent financial management',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 24 }} />,
      title: 'Secure & Protected',
      description: 'Enterprise-grade security measures',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 24 }} />,
      title: 'Wealth Growth',
      description: 'Expert guidance for wealth maximization',
    },
  ]

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: { xs: 4, md: 6 },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("/auth-pattern.svg")',
          backgroundSize: 'cover',
          opacity: 0.05,
          zIndex: 0,
        },
      }}
    >
      {/* Logo Section */}
      <Box 
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 8,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            width: 56,
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 2,
            bgcolor: theme.palette.primary.main,
            color: '#FFFFFF',
          }}
        >
          <AccountBalanceIcon sx={{ fontSize: 32 }} />
        </Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
            fontSize: '1.5rem',
          }}
        >
          Financial Advisor Pro
        </Typography>
      </Box>

      {/* Main Content */}
      <Box sx={{ position: 'relative', zIndex: 1, maxWidth: '480px' }}>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 800,
            fontSize: '3rem',
            lineHeight: 1.2,
            mb: 2,
            color: theme.palette.text.primary,
          }}
        >
          Your Path to{' '}
          <Box
            component="span"
            sx={{
              color: theme.palette.primary.main,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 6,
                left: 0,
                width: '100%',
                height: '8px',
                background: isDark ? 'rgba(242,97,122,0.2)' : 'rgba(242,97,122,0.1)',
                borderRadius: '4px',
                zIndex: -1,
              },
            }}
          >
            Financial
          </Box>
          {' '}Success
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: theme.palette.text.secondary,
            mb: 6,
            lineHeight: 1.6,
            fontWeight: 500,
            fontSize: '1.1rem',
          }}
        >
          Join thousands of users who trust us to manage their finances with personalized advice and expert guidance.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {features.map((feature, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                borderRadius: 2,
                bgcolor: isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#E2E8F0'}`,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateX(8px)',
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 44,
                  height: 44,
                  borderRadius: 2,
                  bgcolor: isDark ? 'rgba(242,97,122,0.1)' : 'rgba(242,97,122,0.05)',
                  color: theme.palette.primary.main,
                  flexShrink: 0,
                }}
              >
                {feature.icon}
              </Box>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    mb: 0.5,
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    lineHeight: 1.5,
                  }}
                >
                  {feature.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
