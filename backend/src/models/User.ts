import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  financialProfile: {
    creditScore: number;
    monthlyIncome: number;
    currentSavings: number;
    currentInvestments: {
      stocks: number;
      bonds: number;
      realEstate: number;
      other: number;
    };
    retirementGoals: {
      targetAge: number;
      monthlyRetirementIncome: number;
      riskTolerance: 'low' | 'medium' | 'high';
    };
  };
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
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
    },
    currentSavings: {
      type: Number,
      default: 0,
    },
    currentInvestments: {
      stocks: { type: Number, default: 0 },
      bonds: { type: Number, default: 0 },
      realEstate: { type: Number, default: 0 },
      other: { type: Number, default: 0 },
    },
    retirementGoals: {
      targetAge: { type: Number },
      monthlyRetirementIncome: { type: Number },
      riskTolerance: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
      },
    },
  },
}, {
  timestamps: true,
});

export default mongoose.model<IUser>('User', userSchema);
