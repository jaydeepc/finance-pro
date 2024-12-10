import { Box, Typography, useTheme } from '@mui/material'
import { AccountBalance as AccountBalanceIcon, Security as SecurityIcon, TrendingUp as TrendingUpIcon } from '@mui/icons-material'

export default function AuthHero() {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  const features = [
    {
      icon: <AccountBalanceIcon sx={{ fontSize: 28 }} />,
      title: 'Smart Banking',
      description: 'Experience intelligent financial management with our advanced banking solutions',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 28 }} />,
      title: 'Secure & Protected',
      description: 'Your finances are protected with enterprise-grade security measures',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 28 }} />,
      title: 'Wealth Growth',
      description: 'Maximize your wealth potential with our expert financial guidance',
    },
  ]

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: { xs: 4, md: 8 },
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
          mb: 12,
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
            fontSize: '3.5rem',
            lineHeight: 1.2,
            mb: 3,
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
                bottom: 8,
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
            mb: 8,
            lineHeight: 1.8,
            fontWeight: 500,
          }}
        >
          Join thousands of users who trust us to manage their finances. Get personalized advice, secure banking, and expert financial planning all in one place.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {features.map((feature, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 3,
                p: 3,
                borderRadius: 3,
                bgcolor: isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : '#E2E8F0'}`,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateX(8px)',
                  boxShadow: isDark 
                    ? '0 4px 20px rgba(0,0,0,0.2)'
                    : '0 4px 20px rgba(0,0,0,0.05)',
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 56,
                  height: 56,
                  borderRadius: 2,
                  bgcolor: isDark ? 'rgba(242,97,122,0.1)' : 'rgba(242,97,122,0.05)',
                  color: theme.palette.primary.main,
                }}
              >
                {feature.icon}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                    mb: 1,
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.secondary,
                    lineHeight: 1.6,
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
