/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Response } from 'express';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class ReqLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP_REQUEST');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const startTime = Date.now();
    return next.handle().pipe(
      tap(() => {
        this.logger.log(this.logRequest(req, res, startTime, Date.now()));
      }),
      tap((responseBody) => {
        this.logger.log(this.logResponse(req, responseBody));
      }),
      catchError((error) => {
        this.logger.error(this.logRequest(req, res, startTime, Date.now()), error.stack);
        throw error;
      }),
    );
  }

  private logRequest(req: any, res: Response, startTime: number, endTime: number): string {
    return (
      `[${moment().format('YYYY-MM-DD, hh:mm:ss a')}] API: ${req.url} - METHOD: ${req.method} ` +
      ' - ' +
      `USER_ID: ${req.user ? req.user.id : null} ` +
      ' - ' +
      `REQ_BODY: ${JSON.stringify(req.body)}` +
      ' - ' +
      `TIME: ${endTime - startTime} ms`
    );
  }

  private logResponse(req: any, responseBody: any): string {
    return (
      `[${moment().format('YYYY-MM-DD, hh:mm:ss a')}] API: ${req.url} - METHOD: ${req.method} ` +
      ' - ' +
      `USER_ID: ${req.user ? req.user.id : null} ` +
      ' - ' +
      `RES_BODY: ${JSON.stringify(responseBody)}`
    );
  }
}
