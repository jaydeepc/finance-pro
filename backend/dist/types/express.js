"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asHandler = void 0;
const asHandler = (fn) => {
    return ((req, res, next) => {
        try {
            const result = fn(req, res);
            if (result && result instanceof Promise) {
                result.catch((error) => next(error));
            }
        }
        catch (error) {
            next(error);
        }
    });
};
exports.asHandler = asHandler;
