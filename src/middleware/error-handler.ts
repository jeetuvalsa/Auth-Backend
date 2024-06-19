import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';

interface CustomError extends Error {
    status?: number;
}

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ message });
};
