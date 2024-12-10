import axios, { InternalAxiosRequestConfig, AxiosError } from 'axios';
import { 
  AuthResponse, 
  FinancialProfile, 
  RetirementPlan, 
  UserSettings,
  RegisterRequest,
  ApiError
} from '../types/api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable sending cookies in cross-origin requests
});

// Add token to requests if available
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
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
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const handleError = (error: unknown, defaultMessage: string): never => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiError>;
    throw new Error(axiosError.response?.data?.message || defaultMessage);
  }
  throw new Error(defaultMessage);
};

export const authAPI = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      return handleError(error, 'Login failed');
    }
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/auth/register', data);
      return response.data;
    } catch (error) {
      return handleError(error, 'Registration failed');
    }
  },
};

export const financialAPI = {
  updateProfile: async (data: FinancialProfile): Promise<FinancialProfile> => {
    try {
      const response = await api.post<FinancialProfile>('/financial/profile', data);
      return response.data;
    } catch (error) {
      return handleError(error, 'Failed to update profile');
    }
  },

  getProfile: async (): Promise<FinancialProfile> => {
    try {
      const response = await api.get<FinancialProfile>('/financial/profile');
      return response.data;
    } catch (error) {
      return handleError(error, 'Failed to get profile');
    }
  },

  updateRetirementPlan: async (data: RetirementPlan): Promise<RetirementPlan> => {
    try {
      const response = await api.post<RetirementPlan>('/financial/retirement', data);
      return response.data;
    } catch (error) {
      return handleError(error, 'Failed to update retirement plan');
    }
  },

  getRetirementPlan: async (): Promise<RetirementPlan> => {
    try {
      const response = await api.get<RetirementPlan>('/financial/retirement');
      return response.data;
    } catch (error) {
      return handleError(error, 'Failed to get retirement plan');
    }
  },

  updateSettings: async (data: UserSettings): Promise<UserSettings> => {
    try {
      const response = await api.post<UserSettings>('/financial/settings', data);
      return response.data;
    } catch (error) {
      return handleError(error, 'Failed to update settings');
    }
  },

  getSettings: async (): Promise<UserSettings> => {
    try {
      const response = await api.get<UserSettings>('/financial/settings');
      return response.data;
    } catch (error) {
      return handleError(error, 'Failed to get settings');
    }
  },
};

export default api;
