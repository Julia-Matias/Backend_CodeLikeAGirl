import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { HttpStatus } from '../utils/enums/http-status.enum';
import { ErrorHandler } from '../handler-exceptions/error-handler';

export function validator(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response
      .status(HttpStatus.BAD_REQUEST)
      .json({ errors: errors.array() });
  }
  next();
}

export function errorHandler(
  error: ErrorHandler,
  _request: Request,
  response: Response,
  _next: NextFunction,
) {
  const errorDto = {
    message: 'Internal server error',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  };
  if (error.name === 'Error') {
    if (!error.message) {
      return response.status(errorDto.statusCode).json(errorDto);
    }
    errorDto.message = error.message;
    return response.status(errorDto.statusCode).json(errorDto);
  }
  errorDto.message = error.message;
  errorDto.statusCode = error.statusCode;
  return response.status(error.statusCode).json(errorDto);
}
