import { AppError } from "./error-handler";

// centralized error handler encapsulates error-handling related logic
class ErrorHandler {

  public async handleError(err: Error): Promise<void> {
    console.log('handle error')
    console.log(err.message);
  }

  public isTrustedError(error: Error) {
    if (error instanceof AppError) {
      return error.isOperational;
    }
    return false;
  }
}

export const handleError = new ErrorHandler();