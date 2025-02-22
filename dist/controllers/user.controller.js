"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRefreshToken = exports.getUser = exports.loginUser = exports.registerUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = require("../utils/token");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, password } = req.body;
        if (!email || !name || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // Check if user already exists
        const existingUser = yield user_model_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Create new user
        const user = yield user_model_1.default.create({
            email,
            name,
            password: hashedPassword,
        });
        return res.status(201).json({
            message: "User registered successfully",
            status: 201,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
        });
    }
    catch (error) {
        console.error("Error in registerUser:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const userRefreshToken = (0, token_1.refreshToken)(user._id);
        const userAccessToken = (0, token_1.accessToken)(user._id);
        return res.status(200).json({
            message: "Login successful",
            status: 200,
            user: {
                refreshToken: userRefreshToken,
                accessToken: userAccessToken,
                expiresIn: 15 * 60 * 1000,
                id: user._id,
                email: user.email,
                name: user.name,
            },
        });
    }
    catch (error) {
        console.error("Error in loginUser:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.loginUser = loginUser;
const userRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.body.refreshToken;
    if (!token) {
        return res.status(400).json({ message: "Refresh token is required" });
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        return res.status(400).json({ message: "Invalid refresh token" });
    }
    const user = yield user_model_1.default.findById(decoded.userId);
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    const userAccessToken = (0, token_1.accessToken)(user._id);
    return res.status(200).json({
        message: "Refresh token successful",
        status: 200,
        refreshToken: token,
        accessToken: userAccessToken,
        expiresIn: 15 * 60 * 1000,
    });
});
exports.userRefreshToken = userRefreshToken;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const refreshToken = req.refreshToken;
    const accessToken = req.accessToken;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user, refreshToken, accessToken });
    }
    catch (error) {
        console.error("Error in getUser:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getUser = getUser;
