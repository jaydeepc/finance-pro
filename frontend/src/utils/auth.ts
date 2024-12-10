import { AuthResponse } from '../types/api'

const TOKEN_KEY = 'financial_advisor_token'
const USER_KEY = 'financial_advisor_user'

export const auth = {
  setAuth: (authData: AuthResponse) => {
    localStorage.setItem(TOKEN_KEY, authData.token)
    localStorage.setItem(USER_KEY, JSON.stringify(authData.user))
  },

  clearAuth: () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  },

  getToken: () => {
    return localStorage.getItem(TOKEN_KEY)
  },

  getUser: () => {
    const userStr = localStorage.getItem(USER_KEY)
    if (!userStr) return null
    try {
      return JSON.parse(userStr)
    } catch {
      return null
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY)
  },
}

export const requireAuth = (navigate: (path: string) => void) => {
  if (!auth.isAuthenticated()) {
    navigate('/login')
    return false
  }
  return true
}
