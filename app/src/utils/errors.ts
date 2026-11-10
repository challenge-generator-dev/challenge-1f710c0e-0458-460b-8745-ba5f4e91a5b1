export class InternalServerError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string) {
        super(message);
        this.name = 'InternalServerError';
        this.statusCode = 500;
        this.isOperational = true;
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
}

export class ValidationError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = 400;
        this.isOperational = true;
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}

export class NotFoundError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
        this.isOperational = true;
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}

export class ConflictError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string) {
        super(message);
        this.name = 'ConflictError';
        this.statusCode = 409;
        this.isOperational = true;
        Object.setPrototypeOf(this, ConflictError.prototype);
    }
}