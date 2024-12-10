import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

export default function AuthHero() {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '100%',
        p: 6,
        background: `linear-gradient(135deg, ${
          isDark ? 'rgba(46,92,255,0.15)' : 'rgba(46,92,255,0.05)'
        } 0%, ${
          isDark ? 'rgba(0,201,255,0.15)' : 'rgba(0,201,255,0.05)'
        } 100%)`,
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
          zIndex: 1,
        },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 2, maxWidth: '480px' }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #2E5CFF 0%, #00C9FF 100%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 3,
          }}
        >
          Welcome to Financial Advisor
        </Typography>
        
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: 500,
            color: theme.palette.text.primary,
            mb: 3,
          }}
        >
          Your Path to Financial Freedom
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            mb: 4,
            lineHeight: 1.8,
          }}
        >
          Take control of your financial future with our comprehensive suite of tools and expert guidance. Plan smarter, invest better, and achieve your financial goals with confidence.
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 3,
            mt: 4,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: theme.palette.primary.main,
                mb: 1,
              }}
            >
              1M+
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
              }}
            >
              Active Users
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: theme.palette.primary.main,
                mb: 1,
              }}
            >
              $50B+
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
              }}
            >
              Assets Managed
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: theme.palette.primary.main,
                mb: 1,
              }}
            >
              98%
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
              }}
            >
              Client Satisfaction
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
