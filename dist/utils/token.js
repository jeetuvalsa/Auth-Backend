"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessToken = exports.refreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const refreshToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};
exports.refreshToken = refreshToken;
const accessToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
};
exports.accessToken = accessToken;
