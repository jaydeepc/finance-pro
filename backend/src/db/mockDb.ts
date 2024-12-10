interface User {
  id: string;
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
  settings?: {
    emailNotifications: boolean;
    darkMode: boolean;
    twoFactorAuth: boolean;
    marketingEmails: boolean;
  };
}

class MockDb {
  private users: Map<string, User>;
  private counter: number;

  constructor() {
    this.users = new Map();
    this.counter = 1;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const id = String(this.counter++);
    const user = { 
      ...userData, 
      id,
      settings: {
        emailNotifications: true,
        darkMode: false,
        twoFactorAuth: false,
        marketingEmails: false,
      }
    };
    this.users.set(id, user);
    return user;
  }

  async findUserById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const user = this.users.get(id);
    if (!user) return null;

    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
}

export const mockDb = new MockDb();
export type { User };
