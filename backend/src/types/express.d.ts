import { Request, Response, NextFunction, RequestHandler } from 'express';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}

export interface FinancialProfileBody {
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
    targetAge?: number;
    monthlyRetirementIncome?: number;
    riskTolerance?: 'low' | 'medium' | 'high';
  };
}

export type RouteHandler = (
  req: AuthRequest,
  res: Response
) => Promise<void> | void;

export type ExpressMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

export type RequestWrapper = (handler: RouteHandler) => RequestHandler;

export const asHandler = (fn: RouteHandler): RequestHandler => {
  return ((req: Request, res: Response, next: NextFunction) => {
    try {
      const result = fn(req as AuthRequest, res);
      if (result && result instanceof Promise) {
        result.catch((error) => next(error));
      }
    } catch (error) {
      next(error);
    }
  }) as RequestHandler;
};
