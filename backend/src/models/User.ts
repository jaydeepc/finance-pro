import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
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
  settings: {
    emailNotifications: boolean;
    darkMode: boolean;
    twoFactorAuth: boolean;
    marketingEmails: boolean;
  };
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  financialProfile: {
    creditScore: {
      type: Number,
      min: 300,
      max: 850,
    },
    monthlyIncome: {
      type: Number,
      required: true,
      min: 0,
    },
    currentSavings: {
      type: Number,
      min: 0,
    },
    currentInvestments: {
      stocks: {
        type: Number,
        min: 0,
      },
      bonds: {
        type: Number,
        min: 0,
      },
      realEstate: {
        type: Number,
        min: 0,
      },
      other: {
        type: Number,
        min: 0,
      },
    },
    retirementGoals: {
      currentAge: {
        type: Number,
        min: 18,
        max: 100,
      },
      targetAge: {
        type: Number,
        min: 18,
        max: 100,
      },
      monthlyRetirementIncome: {
        type: Number,
        min: 0,
      },
      riskTolerance: {
        type: String,
        enum: ['conservative', 'moderate', 'aggressive'],
      },
    },
  },
  settings: {
    emailNotifications: {
      type: Boolean,
      default: true,
    },
    darkMode: {
      type: Boolean,
      default: false,
    },
    twoFactorAuth: {
      type: Boolean,
      default: false,
    },
    marketingEmails: {
      type: Boolean,
      default: false,
    },
  },
}, {
  timestamps: true,
});

// Add indexes
UserSchema.index({ email: 1 });

// Add any instance methods if needed
UserSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = mongoose.model<IUser>('User', UserSchema);
