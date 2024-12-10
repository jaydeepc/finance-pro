"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
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
exports.default = mongoose_1.default.model('User', userSchema);
