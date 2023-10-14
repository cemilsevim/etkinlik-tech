export interface SerializedException {
    message: string;
    code: string;
    stack?: string;
    metadata?: unknown;
}

export abstract class AppError extends Error {
    constructor(message: string, readonly metadata?: unknown) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
    }

    abstract code: string;

    toJSON(): SerializedException {
        return {
            message: this.message,
            code: this.code,
            stack: this.stack,
            metadata: this.metadata,
        };
    }
}
