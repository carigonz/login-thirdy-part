export interface CustomError extends Error {
  isOperational: string,
  status: number;
}