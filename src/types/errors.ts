/* eslint-disable max-classes-per-file */
export class CustomValidationError extends Error {
    status: number;

    constructor(message: string, status = 400) {
        super(message);
        this.name = "CustomValidationError";
        this.status = status;
    }
}

export class UnauthorizedError extends Error {
    status: number;

    constructor(message: string, status = 403) {
        super(message);
        this.name = "UnauthorizedError";
        this.status = status;
    }
}

