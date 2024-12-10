"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_2 = require("../types/express");
const User_1 = __importDefault(require("../models/User"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = (0, express_1.Router)();
// Get financial profile
const getProfile = async (req, res) => {
    var _a;
    if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId)) {
        res.status(401).json({ message: 'Authorization required' });
        return;
    }
    const user = await User_1.default.findById(req.user.userId);
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    res.json({ financialProfile: user.financialProfile });
};
// Update financial profile
const updateProfile = async (req, res) => {
    var _a;
    if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId)) {
        res.status(401).json({ message: 'Authorization required' });
        return;
    }
    const body = req.body;
    const user = await User_1.default.findByIdAndUpdate(req.user.userId, {
        $set: { 'financialProfile': body },
    }, { new: true });
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    res.json({ financialProfile: user.financialProfile });
};
// Get retirement advice
const getRetirementAdvice = async (req, res) => {
    var _a;
    if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId)) {
        res.status(401).json({ message: 'Authorization required' });
        return;
    }
    const user = await User_1.default.findById(req.user.userId);
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    const { financialProfile } = user;
    const { monthlyIncome = 0, currentSavings = 0, currentInvestments, retirementGoals, } = financialProfile;
    // Calculate total current investments
    const totalInvestments = ((currentInvestments === null || currentInvestments === void 0 ? void 0 : currentInvestments.stocks) || 0) +
        ((currentInvestments === null || currentInvestments === void 0 ? void 0 : currentInvestments.bonds) || 0) +
        ((currentInvestments === null || currentInvestments === void 0 ? void 0 : currentInvestments.realEstate) || 0) +
        ((currentInvestments === null || currentInvestments === void 0 ? void 0 : currentInvestments.other) || 0);
    // Basic retirement calculation
    const yearsUntilRetirement = ((retirementGoals === null || retirementGoals === void 0 ? void 0 : retirementGoals.targetAge) || 65) -
        ((new Date().getFullYear()) - 1970); // Simplified age calculation
    const monthlyRetirementNeed = (retirementGoals === null || retirementGoals === void 0 ? void 0 : retirementGoals.monthlyRetirementIncome) || monthlyIncome * 0.8;
    const annualRetirementNeed = monthlyRetirementNeed * 12;
    // Using the 4% rule for retirement savings needed
    const totalRetirementSavingsNeeded = annualRetirementNeed * 25;
    // Calculate monthly savings needed
    const currentTotal = totalInvestments + currentSavings;
    const remainingNeeded = totalRetirementSavingsNeeded - currentTotal;
    const monthsUntilRetirement = yearsUntilRetirement * 12;
    const monthlySavingsNeeded = remainingNeeded / monthsUntilRetirement;
    // Generate investment advice based on risk tolerance
    let investmentAdvice = '';
    switch (retirementGoals === null || retirementGoals === void 0 ? void 0 : retirementGoals.riskTolerance) {
        case 'low':
            investmentAdvice = 'Conservative portfolio: 70% bonds, 30% stocks';
            break;
        case 'medium':
            investmentAdvice = 'Balanced portfolio: 50% stocks, 40% bonds, 10% alternative investments';
            break;
        case 'high':
            investmentAdvice = 'Aggressive portfolio: 80% stocks, 10% bonds, 10% alternative investments';
            break;
        default:
            investmentAdvice = 'Balanced portfolio: 50% stocks, 40% bonds, 10% alternative investments';
    }
    res.json({
        analysis: {
            currentTotal,
            totalRetirementSavingsNeeded,
            monthlySavingsNeeded,
            yearsUntilRetirement,
            investmentAdvice,
            recommendations: [
                `You need to save approximately $${monthlySavingsNeeded.toFixed(2)} monthly to reach your retirement goal.`,
                `Your total retirement savings goal is $${totalRetirementSavingsNeeded.toFixed(2)}.`,
                `Current progress: ${((currentTotal / totalRetirementSavingsNeeded) * 100).toFixed(1)}% of goal.`,
                `Recommended investment strategy: ${investmentAdvice}`,
            ],
        },
    });
};
// Route handlers
router.get('/profile', auth_1.default, (0, express_2.asHandler)(getProfile));
router.put('/profile', auth_1.default, (0, express_2.asHandler)(updateProfile));
router.get('/retirement-advice', auth_1.default, (0, express_2.asHandler)(getRetirementAdvice));
exports.default = router;
