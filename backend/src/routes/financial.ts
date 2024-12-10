import { Router, Request, Response } from 'express';
import { mockDb } from '../db/mockDb';

const router = Router();

type RiskTolerance = 'conservative' | 'moderate' | 'aggressive';

interface RetirementPlanResponse {
  currentAge: number;
  retirementAge: number;
  monthlyContribution: number;
  riskLevel: RiskTolerance;
}

// Get financial profile
router.get('/profile', async (req: Request, res: Response) => {
  try {
    const user = await mockDb.findUserById(req.userId!);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.financialProfile);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update financial profile
router.post('/profile', async (req: Request, res: Response) => {
  try {
    const user = await mockDb.findUserById(req.userId!);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = await mockDb.updateUser(req.userId!, {
      financialProfile: {
        ...user.financialProfile,
        ...req.body,
      },
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'Failed to update profile' });
    }

    res.json(updatedUser.financialProfile);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get retirement plan
router.get('/retirement', async (req: Request, res: Response) => {
  try {
    const user = await mockDb.findUserById(req.userId!);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const response: RetirementPlanResponse = {
      currentAge: user.financialProfile.retirementGoals?.currentAge || 30,
      retirementAge: user.financialProfile.retirementGoals?.targetAge || 65,
      monthlyContribution: user.financialProfile.retirementGoals?.monthlyRetirementIncome || 500,
      riskLevel: user.financialProfile.retirementGoals?.riskTolerance || 'moderate'
    };

    res.json(response);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update retirement plan
router.post('/retirement', async (req: Request, res: Response) => {
  try {
    const user = await mockDb.findUserById(req.userId!);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = await mockDb.updateUser(req.userId!, {
      financialProfile: {
        ...user.financialProfile,
        retirementGoals: {
          currentAge: req.body.currentAge,
          targetAge: req.body.retirementAge,
          monthlyRetirementIncome: req.body.monthlyContribution,
          riskTolerance: req.body.riskLevel as RiskTolerance,
        },
      },
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'Failed to update retirement plan' });
    }

    const response: RetirementPlanResponse = {
      currentAge: updatedUser.financialProfile.retirementGoals?.currentAge || 30,
      retirementAge: updatedUser.financialProfile.retirementGoals?.targetAge || 65,
      monthlyContribution: updatedUser.financialProfile.retirementGoals?.monthlyRetirementIncome || 500,
      riskLevel: updatedUser.financialProfile.retirementGoals?.riskTolerance || 'moderate'
    };

    res.json(response);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get settings
router.get('/settings', async (req: Request, res: Response) => {
  try {
    const user = await mockDb.findUserById(req.userId!);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return default settings if none exist
    const settings = {
      emailNotifications: true,
      darkMode: false,
      twoFactorAuth: false,
      marketingEmails: false,
      ...user.settings,
    };

    res.json(settings);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update settings
router.post('/settings', async (req: Request, res: Response) => {
  try {
    const user = await mockDb.findUserById(req.userId!);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = await mockDb.updateUser(req.userId!, {
      settings: {
        ...user.settings,
        ...req.body,
      },
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'Failed to update settings' });
    }

    res.json(updatedUser.settings);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
