import express from 'express';
import type { Request, Response } from 'express';

const router = express.Router();

// Mock financial data
const mockFinancialData = {
  profile: {
    creditScore: 750,
    monthlyIncome: 5000,
    currentSavings: 10000,
    currentInvestments: {
      stocks: 5000,
      bonds: 3000,
      realEstate: 0,
      other: 2000
    }
  },
  retirementGoals: {
    currentAge: 30,
    targetAge: 65,
    monthlyRetirementIncome: 8000,
    riskTolerance: 'moderate' as const
  },
  settings: {
    emailNotifications: true,
    darkMode: false,
    twoFactorAuth: false,
    marketingEmails: true
  }
};

// Get financial profile
router.get('/profile', (_: Request, res: Response) => {
  try {
    return res.json(mockFinancialData.profile);
  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({ message: 'Error getting financial profile' });
  }
});

// Update financial profile
router.post('/profile', (req: Request, res: Response) => {
  try {
    const updatedProfile = {
      ...mockFinancialData.profile,
      ...req.body
    };
    mockFinancialData.profile = updatedProfile;
    return res.json(updatedProfile);
  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({ message: 'Error updating financial profile' });
  }
});

// Get retirement plan
router.get('/retirement', (_: Request, res: Response) => {
  try {
    return res.json(mockFinancialData.retirementGoals);
  } catch (error) {
    console.error('Get retirement plan error:', error);
    return res.status(500).json({ message: 'Error getting retirement plan' });
  }
});

// Update retirement plan
router.post('/retirement', (req: Request, res: Response) => {
  try {
    const updatedRetirementGoals = {
      ...mockFinancialData.retirementGoals,
      ...req.body
    };
    mockFinancialData.retirementGoals = updatedRetirementGoals;
    return res.json(updatedRetirementGoals);
  } catch (error) {
    console.error('Update retirement plan error:', error);
    return res.status(500).json({ message: 'Error updating retirement plan' });
  }
});

// Get user settings
router.get('/settings', (_: Request, res: Response) => {
  try {
    return res.json(mockFinancialData.settings);
  } catch (error) {
    console.error('Get settings error:', error);
    return res.status(500).json({ message: 'Error getting user settings' });
  }
});

// Update user settings
router.post('/settings', (req: Request, res: Response) => {
  try {
    const updatedSettings = {
      ...mockFinancialData.settings,
      ...req.body
    };
    mockFinancialData.settings = updatedSettings;
    return res.json(updatedSettings);
  } catch (error) {
    console.error('Update settings error:', error);
    return res.status(500).json({ message: 'Error updating user settings' });
  }
});

export default router;
