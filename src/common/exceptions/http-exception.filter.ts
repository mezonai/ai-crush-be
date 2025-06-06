/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';

@Catch(HttpException)
export class GlobalExceptionFilter extends BaseExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    if (host.getType() === 'http') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      const status = exception.status || HttpStatus.INTERNAL_SERVER_ERROR;
      let message = exception.response?.message || exception.message;
      const message_code = exception?.response?.message_code;
      this.logger.error(`[${request.url}][${request.method}] ${message}`, exception.stack);

      if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
        message = 'Internal server error';
      }

      response.status(status).json({
        message,
        message_code,
      });
    } else {
      super.catch(exception, host);
    }
  }
}
