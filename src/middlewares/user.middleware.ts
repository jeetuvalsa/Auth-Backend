import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ObjectId } from "mongoose";
import { accessToken, refreshToken } from '../utils/token';

declare global {
  namespace Express {
    interface Request {
      userId?: string | ObjectId | JwtPayload;
      refreshToken?: string;
      accessToken?: string;
    }
  }
}

const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const decodedAccessToken = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
      if (!decodedAccessToken) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.userId = decodedAccessToken.userId;
      return next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { authenticateUser };
