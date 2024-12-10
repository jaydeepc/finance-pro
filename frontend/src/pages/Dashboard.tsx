import { useEffect, useState } from 'react'
import {
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert,
  useTheme,
} from '@mui/material'
import { financialAPI } from '../services/api'
import { FinancialProfile } from '../types/api'

function Dashboard() {
  const theme = useTheme()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [financialData, setFinancialData] = useState<FinancialProfile | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await financialAPI.getProfile()
        setFinancialData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load financial data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    )
  }

  const totalInvestments = financialData?.currentInvestments
    ? Object.values(financialData.currentInvestments).reduce((a, b) => a + (b || 0), 0)
    : 0

  const totalPortfolioValue = (financialData?.currentSavings || 0) + totalInvestments

  const paperStyle = {
    p: 3,
    display: 'flex',
    flexDirection: 'column',
    bgcolor: theme.palette.mode === 'dark' ? '#003D4F' : '#FFFFFF',
    borderRadius: 3,
    border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : theme.palette.divider}`,
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ 
        display: 'grid',
        gap: 3,
        gridTemplateColumns: {
          xs: '1fr',
          md: '2fr 1fr',
          lg: '3fr 1fr'
        }
      }}>
        {/* Financial Summary */}
        <Paper
          elevation={0}
          sx={{
            ...paperStyle,
            height: 240,
          }}
        >
          <Typography 
            component="h2" 
            variant="h6" 
            sx={{ color: theme.palette.primary.main, fontWeight: 600 }}
            gutterBottom
          >
            Financial Summary
          </Typography>
          <Typography component="p" variant="h4" sx={{ fontWeight: 700 }}>
            ${totalPortfolioValue.toLocaleString()}
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            Total Portfolio Value
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Monthly Income: ${financialData?.monthlyIncome.toLocaleString()}
          </Typography>
          {financialData?.creditScore && (
            <Typography variant="body2" color="text.secondary">
              Credit Score: {financialData.creditScore}
            </Typography>
          )}
        </Paper>

        {/* Recent Activity */}
        <Paper
          elevation={0}
          sx={{
            ...paperStyle,
            height: 240,
          }}
        >
          <Typography 
            component="h2" 
            variant="h6" 
            sx={{ color: theme.palette.primary.main, fontWeight: 600 }}
            gutterBottom
          >
            Recent Activity
          </Typography>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" paragraph>
              Profile updated
            </Typography>
            {financialData?.currentInvestments && (
              <Typography variant="body2" paragraph>
                Investment portfolio updated
              </Typography>
            )}
          </Box>
        </Paper>

        {/* Investment Distribution */}
        <Paper 
          elevation={0}
          sx={{ 
            ...paperStyle,
            gridColumn: {
              xs: '1',
              md: '1 / span 2'
            }
          }}
        >
          <Typography 
            component="h2" 
            variant="h6" 
            sx={{ color: theme.palette.primary.main, fontWeight: 600 }}
            gutterBottom
          >
            Investment Distribution
          </Typography>
          {financialData?.currentInvestments ? (
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 3, mt: 2 }}>
              {Object.entries(financialData.currentInvestments).map(([key, value]) => (
                value ? (
                  <Box 
                    key={key}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ textTransform: 'capitalize', fontWeight: 600, mb: 1 }}>
                      {key}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      ${value.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {((value / totalInvestments) * 100).toFixed(1)}% of portfolio
                    </Typography>
                  </Box>
                ) : null
              ))}
            </Box>
          ) : (
            <Typography variant="body1">
              No investment data available. Update your financial profile to see your portfolio distribution.
            </Typography>
          )}
        </Paper>
      </Box>
    </Container>
  )
}

export default Dashboard
