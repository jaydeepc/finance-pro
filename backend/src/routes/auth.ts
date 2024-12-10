import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Mock user for testing
const mockUser = {
  id: '1',
  email: 'test@example.com',
  password: 'password123',
  financialProfile: {
    monthlyIncome: 5000,
    creditScore: 750,
    currentSavings: 10000,
    currentInvestments: {
      stocks: 5000,
      bonds: 3000,
      realEstate: 0,
      other: 2000
    }
  }
};

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Simple mock authentication
    if (email === mockUser.email && password === mockUser.password) {
      const token = jwt.sign(
        { userId: mockUser.id },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        token,
        user: {
          id: mockUser.id,
          email: mockUser.email,
          financialProfile: mockUser.financialProfile
        }
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Mock registration
    const token = jwt.sign(
      { userId: mockUser.id },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: mockUser.id,
        email: email,
        financialProfile: {
          monthlyIncome: 0,
          currentInvestments: {}
        }
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    
    // Return mock user data
    res.json({
      id: mockUser.id,
      email: mockUser.email,
      financialProfile: mockUser.financialProfile
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Error getting user data' });
  }
});

export default router;
