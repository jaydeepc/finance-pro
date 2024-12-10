import { useState, useEffect } from 'react'
import {
  Container,
  Paper,
  Typography,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Button,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material'
import { financialAPI } from '../services/api'
import { UserSettings } from '../types/api'
import { useTheme } from '../contexts/ThemeContext'

function Settings() {
  const { darkMode, toggleDarkMode } = useTheme()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [settings, setSettings] = useState<UserSettings>({
    emailNotifications: true,
    darkMode: false,
    twoFactorAuth: false,
    marketingEmails: false,
  })

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await financialAPI.getSettings()
        setSettings(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load settings')
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const handleToggle = (setting: keyof UserSettings) => async () => {
    if (setting === 'darkMode') {
      toggleDarkMode()
      setSettings(prev => ({
        ...prev,
        darkMode: !prev.darkMode
      }))
      return
    }

    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }))
  }

  const handleSave = async () => {
    setError('')
    setSuccess(false)
    setSaving(true)

    try {
      await financialAPI.updateSettings(settings)
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update settings')
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
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Manage your account preferences and notifications
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Settings updated successfully
          </Alert>
        )}

        <List>
          <ListItem>
            <ListItemText
              primary="Email Notifications"
              secondary="Receive notifications about account activity"
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={settings.emailNotifications}
                onChange={handleToggle('emailNotifications')}
                disabled={saving}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemText
              primary="Dark Mode"
              secondary="Toggle dark theme for the application"
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={darkMode}
                onChange={handleToggle('darkMode')}
                disabled={saving}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemText
              primary="Two-Factor Authentication"
              secondary="Add an extra layer of security to your account"
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={settings.twoFactorAuth}
                onChange={handleToggle('twoFactorAuth')}
                disabled={saving}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemText
              primary="Marketing Emails"
              secondary="Receive updates about new features and promotions"
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                checked={settings.marketingEmails}
                onChange={handleToggle('marketingEmails')}
                disabled={saving}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={saving}
            size="large"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default Settings
