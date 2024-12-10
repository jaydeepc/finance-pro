"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapHandler = void 0;
const wrapHandler = (handler) => {
    return (req, res, next) => {
        Promise.resolve(handler(req, res)).catch(next);
    };
};
exports.wrapHandler = wrapHandler;
