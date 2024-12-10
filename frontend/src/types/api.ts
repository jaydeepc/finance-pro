export type RiskTolerance = 'conservative' | 'moderate' | 'aggressive';

export interface FinancialProfile {
  creditScore?: number;
  monthlyIncome: number;
  currentSavings?: number;
  currentInvestments?: {
    stocks?: number;
    bonds?: number;
    realEstate?: number;
    other?: number;
  };
  retirementGoals?: {
    currentAge?: number;
    targetAge?: number;
    monthlyRetirementIncome?: number;
    riskTolerance?: RiskTolerance;
  };
}

export interface User {
  id: string;
  email: string;
  financialProfile: FinancialProfile;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface RetirementPlan {
  currentAge: number;
  retirementAge: number;
  monthlyContribution: number;
  riskLevel: RiskTolerance;
}

export interface UserSettings {
  emailNotifications: boolean;
  darkMode: boolean;
  twoFactorAuth: boolean;
  marketingEmails: boolean;
}

export interface ApiError {
  message: string;
  error?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  financialProfile: FinancialProfile;
}
