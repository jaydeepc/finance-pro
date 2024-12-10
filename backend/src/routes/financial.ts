import express from 'express';
import { User } from '../models/User';

const router = express.Router();

// Get financial profile
router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.financialProfile);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Error getting financial profile' });
  }
});

// Update financial profile
router.post('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.financialProfile = {
      ...user.financialProfile,
      ...req.body,
    };

    await user.save();
    res.json(user.financialProfile);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Error updating financial profile' });
  }
});

// Get retirement plan
router.get('/retirement', async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.financialProfile.retirementGoals || {});
  } catch (error) {
    console.error('Get retirement plan error:', error);
    res.status(500).json({ message: 'Error getting retirement plan' });
  }
});

// Update retirement plan
router.post('/retirement', async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.financialProfile.retirementGoals = {
      ...user.financialProfile.retirementGoals,
      ...req.body,
    };

    await user.save();
    res.json(user.financialProfile.retirementGoals);
  } catch (error) {
    console.error('Update retirement plan error:', error);
    res.status(500).json({ message: 'Error updating retirement plan' });
  }
});

// Get user settings
router.get('/settings', async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.settings);
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ message: 'Error getting user settings' });
  }
});

// Update user settings
router.post('/settings', async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.settings = {
      ...user.settings,
      ...req.body,
    };

    await user.save();
    res.json(user.settings);
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ message: 'Error updating user settings' });
  }
});

export default router;
