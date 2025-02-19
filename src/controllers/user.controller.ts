import { Request, Response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import { accessToken, refreshToken } from '../utils/token';
import jwt from 'jsonwebtoken';
const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
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
        name: user.name
      }
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const userRefreshToken = refreshToken(user._id);
    const userAccessToken = accessToken(user._id);

    return res.status(200).json({
      message: "Login successful",
      status: 200,
      user: {
        refreshToken: userRefreshToken,
        accessToken: userAccessToken,
        expiresIn: 15 * 60 * 1000,
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const userRefreshToken = async (req: Request, res: Response) => {
  const token = req.body.refreshToken;
  if (!token) {
    return res.status(400).json({ message: "Refresh token is required" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  if (!decoded) {
    return res.status(400).json({ message: "Invalid refresh token" });
  }
  const user = await User.findById((decoded as { userId: string }).userId);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const userRefreshToken = refreshToken(user._id);
  const userAccessToken = accessToken(user._id);
  return res.status(200).json({
    message: "Refresh token successful",
    status: 200,
    refreshToken: userRefreshToken,
    accessToken: userAccessToken,
    expiresIn: 15 * 60 * 1000,
  });
};
const getUser = async (req: Request, res: Response) => {
  const userId = req.userId;
  const refreshToken = req.refreshToken;
  const accessToken = req.accessToken;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user, refreshToken, accessToken });
  } catch (error) {
    console.error("Error in getUser:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { registerUser, loginUser, getUser, userRefreshToken };

