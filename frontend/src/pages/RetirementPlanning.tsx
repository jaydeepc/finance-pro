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
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material'
import { financialAPI } from '../services/api'

type RiskLevel = 'conservative' | 'moderate' | 'aggressive'

type RetirementData = {
  currentAge: number;
  retirementAge: number;
  monthlyContribution: number;
  riskLevel: RiskLevel;
}

type RetirementPlanResponse = {
  retirementGoals?: {
    currentAge?: number;
    targetAge?: number;
    monthlyRetirementIncome?: number;
    riskTolerance?: RiskLevel;
  };
}

function RetirementPlanning() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState<RetirementData>({
    currentAge: 30,
    retirementAge: 65,
    monthlyContribution: 500,
    riskLevel: 'moderate',
  })

  useEffect(() => {
    const fetchRetirementPlan = async () => {
      try {
        const data = await financialAPI.getRetirementPlan() as RetirementPlanResponse
        if (data.retirementGoals) {
          setFormData({
            currentAge: data.retirementGoals.currentAge || 30,
            retirementAge: data.retirementGoals.targetAge || 65,
            monthlyContribution: data.retirementGoals.monthlyRetirementIncome || 500,
            riskLevel: data.retirementGoals.riskTolerance || 'moderate',
          })
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load retirement plan')
      } finally {
        setLoading(false)
      }
    }

    fetchRetirementPlan()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: Number(value)
    }))
  }

  const handleSelectChange = (e: SelectChangeEvent<RiskLevel>) => {
    setFormData(prev => ({
      ...prev,
      riskLevel: e.target.value as RiskLevel
    }))
  }

  const handleSliderChange = (name: keyof RetirementData) => (
    _event: Event,
    newValue: number | number[]
  ) => {
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }))
  }

  const calculateProjection = (): number => {
    const years = formData.retirementAge - formData.currentAge
    const monthlyReturn = formData.riskLevel === 'aggressive' ? 0.008 : formData.riskLevel === 'moderate' ? 0.006 : 0.004
    const monthlyContribution = formData.monthlyContribution

    // Simple compound interest calculation with monthly contributions
    let total = 0
    for (let i = 0; i < years * 12; i++) {
      total = (total + monthlyContribution) * (1 + monthlyReturn)
    }

    return Math.round(total)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setSaving(true)

    try {
      await financialAPI.updateRetirementPlan({
        currentAge: formData.currentAge,
        retirementAge: formData.retirementAge,
        monthlyContribution: formData.monthlyContribution,
        riskLevel: formData.riskLevel,
      })
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update retirement plan')
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

  const projection = calculateProjection()

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Retirement Planning
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Plan your retirement by adjusting the parameters below
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Retirement plan updated successfully
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography gutterBottom>Current Age: {formData.currentAge}</Typography>
              <Slider
                value={formData.currentAge}
                onChange={handleSliderChange('currentAge')}
                min={18}
                max={80}
                valueLabelDisplay="auto"
                aria-labelledby="current-age-slider"
                disabled={saving}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography gutterBottom>
                Retirement Age: {formData.retirementAge}
              </Typography>
              <Slider
                value={formData.retirementAge}
                onChange={handleSliderChange('retirementAge')}
                min={Math.max(formData.currentAge + 1, 50)}
                max={85}
                valueLabelDisplay="auto"
                aria-labelledby="retirement-age-slider"
                disabled={saving}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Monthly Contribution"
                name="monthlyContribution"
                type="number"
                value={formData.monthlyContribution}
                onChange={handleInputChange}
                disabled={saving}
                InputProps={{
                  startAdornment: <Typography>$</Typography>
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="risk-level-label">Risk Level</InputLabel>
                <Select
                  labelId="risk-level-label"
                  id="riskLevel"
                  name="riskLevel"
                  value={formData.riskLevel}
                  label="Risk Level"
                  onChange={handleSelectChange}
                  disabled={saving}
                >
                  <MenuItem value="conservative">Conservative</MenuItem>
                  <MenuItem value="moderate">Moderate</MenuItem>
                  <MenuItem value="aggressive">Aggressive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Retirement Projection
            </Typography>
            <Typography variant="body1" paragraph>
              Based on your inputs and an estimated annual return of{' '}
              {formData.riskLevel === 'aggressive' ? '10%' : formData.riskLevel === 'moderate' ? '7%' : '5%'},
              you could have approximately:{' '}
              <Typography component="span" variant="h6" color="primary">
                ${projection.toLocaleString()}
              </Typography>
            </Typography>
          </Box>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Update Plan'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

export default RetirementPlanning
