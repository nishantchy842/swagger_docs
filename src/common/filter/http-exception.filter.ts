import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { IncomingMessage } from 'http';
import { HttpException, HttpStatus } from '@nestjs/common';

export const getStatusCode = (exception: unknown): number => {
  return exception instanceof HttpException
    ? exception.getStatus()
    : HttpStatus.INTERNAL_SERVER_ERROR;
};

export const getErrorMessage = (exception: HttpException): string => {
  return String(exception);
};

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<IncomingMessage>();
    const code = getStatusCode(exception);
    const message = getErrorMessage(exception);

    response.status(code).json({
      error: {
        timestamp: new Date().toISOString(),
        path: request.url,
        code,
        message,
      },
    });
  }
}
