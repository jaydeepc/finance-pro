import express from 'express';
import type { Request, Response } from 'express';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Helper function to get user ID from token
const getUserIdFromToken = (req: Request): string => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) throw new Error('No token provided');
  const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
  return decoded.userId;
};

// Get financial profile
router.get('/profile', async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromToken(req);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user.financialProfile);
  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({ message: 'Error getting financial profile' });
  }
});

// Update financial profile
router.post('/profile', async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromToken(req);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Only update the fields that are provided
    if (req.body.monthlyIncome !== undefined) {
      user.financialProfile.monthlyIncome = req.body.monthlyIncome;
    }
    if (req.body.creditScore !== undefined) {
      user.financialProfile.creditScore = req.body.creditScore;
    }
    if (req.body.currentSavings !== undefined) {
      user.financialProfile.currentSavings = req.body.currentSavings;
    }
    if (req.body.currentInvestments) {
      user.financialProfile.currentInvestments = {
        ...user.financialProfile.currentInvestments,
        ...req.body.currentInvestments
      };
    }

    await user.save();
    return res.json(user.financialProfile);
  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({ message: 'Error updating financial profile' });
  }
});

// Get retirement plan
router.get('/retirement', async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromToken(req);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user.financialProfile.retirementGoals || {});
  } catch (error) {
    console.error('Get retirement plan error:', error);
    return res.status(500).json({ message: 'Error getting retirement plan' });
  }
});

// Update retirement plan
router.post('/retirement', async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromToken(req);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.financialProfile.retirementGoals) {
      user.financialProfile.retirementGoals = {};
    }

    user.financialProfile.retirementGoals = {
      ...user.financialProfile.retirementGoals,
      ...req.body
    };

    await user.save();
    return res.json(user.financialProfile.retirementGoals);
  } catch (error) {
    console.error('Update retirement plan error:', error);
    return res.status(500).json({ message: 'Error updating retirement plan' });
  }
});

// Get user settings
router.get('/settings', async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromToken(req);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user.settings);
  } catch (error) {
    console.error('Get settings error:', error);
    return res.status(500).json({ message: 'Error getting user settings' });
  }
});

// Update user settings
router.post('/settings', async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromToken(req);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.settings = {
      ...user.settings,
      ...req.body
    };
    await user.save();

    return res.json(user.settings);
  } catch (error) {
    console.error('Update settings error:', error);
    return res.status(500).json({ message: 'Error updating user settings' });
  }
});

export default router;
