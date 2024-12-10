import axios, { InternalAxiosRequestConfig } from 'axios';
import { 
  AuthResponse, 
  FinancialProfile, 
  RetirementPlan, 
  UserSettings,
  RegisterRequest
} from '../types/api';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    return response.data;
  },
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },
};

export const financialAPI = {
  updateProfile: async (data: FinancialProfile): Promise<FinancialProfile> => {
    const response = await api.post<FinancialProfile>('/financial/profile', data);
    return response.data;
  },
  getProfile: async (): Promise<FinancialProfile> => {
    const response = await api.get<FinancialProfile>('/financial/profile');
    return response.data;
  },
  updateRetirementPlan: async (data: RetirementPlan): Promise<RetirementPlan> => {
    const response = await api.post<RetirementPlan>('/financial/retirement', data);
    return response.data;
  },
  getRetirementPlan: async (): Promise<RetirementPlan> => {
    const response = await api.get<RetirementPlan>('/financial/retirement');
    return response.data;
  },
  updateSettings: async (data: UserSettings): Promise<UserSettings> => {
    const response = await api.post<UserSettings>('/financial/settings', data);
    return response.data;
  },
  getSettings: async (): Promise<UserSettings> => {
    const response = await api.get<UserSettings>('/financial/settings');
    return response.data;
  },
};

export default api;
