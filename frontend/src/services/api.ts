import axios, { InternalAxiosRequestConfig } from 'axios';
import { 
  AuthResponse, 
  FinancialProfile, 
  RetirementPlan, 
  UserSettings,
  RegisterRequest
} from '../types/api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
const TOKEN_KEY = 'financial_advisor_token';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true // Enable sending cookies and auth headers
});

// Add token to requests if available
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem(TOKEN_KEY, response.data.token);
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Login failed');
      }
      throw error;
    }
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/auth/register', data);
      if (response.data.token) {
        localStorage.setItem(TOKEN_KEY, response.data.token);
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Registration failed');
      }
      throw error;
    }
  },
};

export const financialAPI = {
  updateProfile: async (data: FinancialProfile): Promise<FinancialProfile> => {
    try {
      const response = await api.post<FinancialProfile>('/financial/profile', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to update profile');
      }
      throw error;
    }
  },

  getProfile: async (): Promise<FinancialProfile> => {
    try {
      const response = await api.get<FinancialProfile>('/financial/profile');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to get profile');
      }
      throw error;
    }
  },

  updateRetirementPlan: async (data: RetirementPlan): Promise<RetirementPlan> => {
    try {
      const response = await api.post<RetirementPlan>('/financial/retirement', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to update retirement plan');
      }
      throw error;
    }
  },

  getRetirementPlan: async (): Promise<RetirementPlan> => {
    try {
      const response = await api.get<RetirementPlan>('/financial/retirement');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to get retirement plan');
      }
      throw error;
    }
  },

  updateSettings: async (data: UserSettings): Promise<UserSettings> => {
    try {
      const response = await api.post<UserSettings>('/financial/settings', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to update settings');
      }
      throw error;
    }
  },

  getSettings: async (): Promise<UserSettings> => {
    try {
      const response = await api.get<UserSettings>('/financial/settings');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to get settings');
      }
      throw error;
    }
  },
};

export default api;
