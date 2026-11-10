import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
    statusCode?: number;
    isOperational?: boolean;
}

export const createError = (message: string, statusCode: number): AppError => {
    const error: AppError = new Error(message);
    error.statusCode = statusCode;
    error.isOperational = true;
    return error;
};

export const errorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    console.error(`[ERROR] ${err.name}: ${message}`);
    console.error(`[ERROR] Stack: ${err.stack}`);

    if (err.name === 'ValidationError') {
        res.status(400).json({
            error: 'Validation Error',
            message: message,
            timestamp: new Date().toISOString(),
        });
        return;
    }

    if (err.name === 'UnauthorizedError') {
        res.status(401).json({
            error: 'Unauthorized',
            message: 'Invalid or missing authentication token',
            timestamp: new Date().toISOString(),
        });
        return;
    }

    if (err.name === 'ForbiddenError') {
        res.status(403).json({
            error: 'Forbidden',
            message: 'Insufficient permissions to access this resource',
            timestamp: new Date().toISOString(),
        });
        return;
    }

    if (err.name === 'NotFoundError') {
        res.status(404).json({
            error: 'Not Found',
            message: message,
            timestamp: new Date().toISOString(),
        });
        return;
    }

    if (err.name === 'ConflictError') {
        res.status(409).json({
            error: 'Conflict',
            message: message,
            timestamp: new Date().toISOString(),
        });
        return;
    }

    if (err.name === 'ThrottlingError') {
        res.status(429).json({
            error: 'Too Many Requests',
            message: 'Rate limit exceeded. Please try again later.',
            timestamp: new Date().toISOString(),
        });
        return;
    }

    if (err.name === 'DynamoDBError' || err.name === 'AWSError') {
        res.status(503).json({
            error: 'Service Unavailable',
            message: 'Database operation failed. Please try again later.',
            timestamp: new Date().toISOString(),
        });
        return;
    }

    if (statusCode === 500) {
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'An unexpected error occurred',
            timestamp: new Date().toISOString(),
        });
        return;
    }

    res.status(statusCode).json({
        error: err.name || 'Error',
        message: message,
        timestamp: new Date().toISOString(),
    });
};

export const asyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

export const notFoundHandler = (req: Request, res: Response): void => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.method} ${req.path} not found`,
        timestamp: new Date().toISOString(),
    });
};