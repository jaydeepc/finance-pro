import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { mockDb } from '../db/mockDb';

const router = Router();

interface RegisterBody {
  email: string;
  password: string;
  financialProfile: {
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
      riskTolerance?: 'conservative' | 'moderate' | 'aggressive';
    };
  };
}

interface LoginBody {
  email: string;
  password: string;
}

// Register
router.post('/register', async (req: Request<{}, {}, RegisterBody>, res: Response): Promise<void> => {
  try {
    const { email, password, financialProfile } = req.body;

    // Check if user exists
    let user = await mockDb.findUserByEmail(email);
    if (user) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    user = await mockDb.createUser({
      email,
      password: hashedPassword,
      financialProfile: {
        ...financialProfile,
        retirementGoals: {
          ...financialProfile.retirementGoals,
          riskTolerance: financialProfile.retirementGoals?.riskTolerance || 'moderate'
        }
      }
    });

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'defaultsecret',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        financialProfile: user.financialProfile,
      },
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login
router.post('/login', async (req: Request<{}, {}, LoginBody>, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await mockDb.findUserByEmail(email);
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'defaultsecret',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        financialProfile: user.financialProfile,
      },
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
