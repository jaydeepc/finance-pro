import { RequestHandler } from 'express';
import { RouteHandler } from '../types/express';

export const wrapHandler = (handler: RouteHandler): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(handler(req, res)).catch(next);
  };
};
