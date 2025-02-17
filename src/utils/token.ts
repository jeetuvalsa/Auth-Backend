import jwt, { JwtPayload } from 'jsonwebtoken';
import { ObjectId } from 'mongoose';

const refreshToken = (userId: string | ObjectId | JwtPayload) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
};

const accessToken = (userId: string | ObjectId | JwtPayload) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: '15s' });
};

export { refreshToken, accessToken };


