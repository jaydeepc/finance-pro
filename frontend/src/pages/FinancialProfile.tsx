import { useState, useEffect } from 'react'
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Grid,
} from '@mui/material'
import { financialAPI } from '../services/api'

type FormData = {
  monthlyIncome: number;
  creditScore?: number;
  currentSavings: number;
  currentInvestments: {
    stocks: number;
    bonds: number;
    realEstate: number;
    other: number;
  };
}

function FinancialProfile() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    monthlyIncome: 0,
    currentSavings: 0,
    currentInvestments: {
      stocks: 0,
      bonds: 0,
      realEstate: 0,
      other: 0,
    },
  })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await financialAPI.getProfile()
        setFormData({
          monthlyIncome: data.monthlyIncome || 0,
          creditScore: data.creditScore,
          currentSavings: data.currentSavings || 0,
          currentInvestments: {
            stocks: data.currentInvestments?.stocks || 0,
            bonds: data.currentInvestments?.bonds || 0,
            realEstate: data.currentInvestments?.realEstate || 0,
            other: data.currentInvestments?.other || 0,
          },
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [category, field] = name.split('.')
      if (category === 'currentInvestments') {
        setFormData(prev => ({
          ...prev,
          currentInvestments: {
            ...prev.currentInvestments,
            [field]: Number(value) || 0
          }
        }))
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: Number(value) || 0
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setSaving(true)

    try {
      await financialAPI.updateProfile(formData)
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Financial Profile
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Update your financial information to receive personalized recommendations
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Profile updated successfully
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Monthly Income"
                name="monthlyIncome"
                type="number"
                value={formData.monthlyIncome}
                onChange={handleChange}
                disabled={saving}
                InputProps={{
                  startAdornment: <Typography>$</Typography>
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Credit Score"
                name="creditScore"
                type="number"
                value={formData.creditScore || ''}
                onChange={handleChange}
                disabled={saving}
                inputProps={{ min: 300, max: 850 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Current Savings"
                name="currentSavings"
                type="number"
                value={formData.currentSavings}
                onChange={handleChange}
                disabled={saving}
                InputProps={{
                  startAdornment: <Typography>$</Typography>
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Investment Portfolio
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Stocks"
                name="currentInvestments.stocks"
                type="number"
                value={formData.currentInvestments.stocks}
                onChange={handleChange}
                disabled={saving}
                InputProps={{
                  startAdornment: <Typography>$</Typography>
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bonds"
                name="currentInvestments.bonds"
                type="number"
                value={formData.currentInvestments.bonds}
                onChange={handleChange}
                disabled={saving}
                InputProps={{
                  startAdornment: <Typography>$</Typography>
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Real Estate"
                name="currentInvestments.realEstate"
                type="number"
                value={formData.currentInvestments.realEstate}
                onChange={handleChange}
                disabled={saving}
                InputProps={{
                  startAdornment: <Typography>$</Typography>
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Other Investments"
                name="currentInvestments.other"
                type="number"
                value={formData.currentInvestments.other}
                onChange={handleChange}
                disabled={saving}
                InputProps={{
                  startAdornment: <Typography>$</Typography>
                }}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Update Profile'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

export default FinancialProfile
