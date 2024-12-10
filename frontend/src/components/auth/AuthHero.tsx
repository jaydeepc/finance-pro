import { Box, Typography, useTheme } from '@mui/material'
import { AccountBalance as AccountBalanceIcon, Security as SecurityIcon, TrendingUp as TrendingUpIcon } from '@mui/icons-material'

export default function AuthHero() {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  const features = [
    {
      icon: <AccountBalanceIcon sx={{ fontSize: 24 }} />,
      title: 'Smart Banking',
      description: 'Experience intelligent financial management with our advanced banking solutions',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 24 }} />,
      title: 'Secure & Protected',
      description: 'Your finances are protected with enterprise-grade security measures',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 24 }} />,
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
        justifyContent: 'center',
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
          opacity: 0.1,
          zIndex: 0,
        },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1, maxWidth: '480px' }}>
        <Box 
          sx={{ 
            display: 'inline-flex',
            alignItems: 'center',
            bgcolor: isDark ? 'rgba(46,92,255,0.1)' : 'rgba(46,92,255,0.05)',
            color: theme.palette.primary.main,
            py: 1,
            px: 2,
            borderRadius: 2,
            mb: 4,
          }}
        >
          <AccountBalanceIcon sx={{ mr: 1, fontSize: 20 }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Financial Advisor Pro
          </Typography>
        </Box>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
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
                bottom: 4,
                left: 0,
                width: '100%',
                height: '8px',
                background: isDark ? 'rgba(46,92,255,0.2)' : 'rgba(46,92,255,0.1)',
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
          variant="subtitle1"
          sx={{
            color: theme.palette.text.secondary,
            mb: 6,
            lineHeight: 1.8,
          }}
        >
          Join thousands of users who trust us to manage their finances. Get personalized advice, secure banking, and expert financial planning all in one place.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {features.map((feature, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2,
                p: 2,
                borderRadius: 2,
                bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.5)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : theme.palette.divider}`,
                transition: 'transform 0.2s ease-in-out',
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
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  bgcolor: isDark ? 'rgba(46,92,255,0.1)' : 'rgba(46,92,255,0.05)',
                  color: theme.palette.primary.main,
                }}
              >
                {feature.icon}
              </Box>
              <Box>
                <Typography
                  variant="subtitle2"
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
