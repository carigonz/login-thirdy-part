export class AppError extends Error {
	public readonly isOperational: boolean;

	constructor(message: string, isOperational: boolean) {
		super(message);
		Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
		this.isOperational = isOperational;
		Error.captureStackTrace(this);
	}
}

export class ApiError extends AppError {
	public status: number;
	public message: string;

	constructor(httpStatusCode: number, message: string, isOperational: boolean) {
		super(message, isOperational);
		this.status = httpStatusCode;
		this.message = message;
	}
}

export class BadRequestError extends ApiError {
	constructor(message: string) {
		super(400, message, true);
		this.message = message || 'Bad request';
	}
}

export class UnauthorizedError extends ApiError {
	constructor(message: string) {
		super(401, message, true);
		this.message = message || 'Authorization required';
	}
}

export class ForbiddenError extends ApiError {
	constructor(message: string) {
		super(403, message, true);
		this.message = message || 'Forbidden';
	}
}

export class NotFoundError extends ApiError {
	constructor(message: string) {
		super(404, message, true);
		this.message = message || 'Resource not found';
	}
}

export class ConflictError extends ApiError {
	constructor(message: string) {
		super(409, message, true);
		this.message = message || 'Conflict';
	}
}