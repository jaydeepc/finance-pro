import { useState } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material'
import { authAPI } from '../services/api'
import { auth } from '../utils/auth'
import { RiskTolerance, RegisterRequest } from '../types/api'

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  monthlyIncome: string;
  riskTolerance: RiskTolerance;
}

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    monthlyIncome: '',
    riskTolerance: 'moderate',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!formData.monthlyIncome || isNaN(Number(formData.monthlyIncome))) {
      setError('Please enter a valid monthly income')
      return
    }

    setLoading(true)

    try {
      const registerData: RegisterRequest = {
        email: formData.email,
        password: formData.password,
        financialProfile: {
          monthlyIncome: Number(formData.monthlyIncome),
          retirementGoals: {
            currentAge: 30, // Default value
            targetAge: 65, // Default value
            monthlyRetirementIncome: Number(formData.monthlyIncome) * 0.7, // 70% of current income
            riskTolerance: formData.riskTolerance,
          },
          currentSavings: 0,
          currentInvestments: {
            stocks: 0,
            bonds: 0,
            realEstate: 0,
            other: 0,
          },
        },
      }

      const response = await authAPI.register(registerData)
      auth.setAuth(response)
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRiskToleranceChange = (e: SelectChangeEvent<RiskTolerance>) => {
    setFormData(prev => ({
      ...prev,
      riskTolerance: e.target.value as RiskTolerance
    }))
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
              {error}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleInputChange}
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleInputChange}
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="monthlyIncome"
              label="Monthly Income"
              type="number"
              id="monthlyIncome"
              value={formData.monthlyIncome}
              onChange={handleInputChange}
              disabled={loading}
              InputProps={{
                startAdornment: <Typography>$</Typography>
              }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="risk-tolerance-label">Risk Tolerance</InputLabel>
              <Select
                labelId="risk-tolerance-label"
                id="riskTolerance"
                name="riskTolerance"
                value={formData.riskTolerance}
                label="Risk Tolerance"
                onChange={handleRiskToleranceChange}
                disabled={loading}
              >
                <MenuItem value="conservative">Conservative</MenuItem>
                <MenuItem value="moderate">Moderate</MenuItem>
                <MenuItem value="aggressive">Aggressive</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Register'}
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default Register
