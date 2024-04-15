// error-handler.interceptor.ts

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorHandlerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const controller = context.getClass();
    const isErrorHandler = Reflect.getMetadata('errorHandler', controller);

    if (isErrorHandler) {
      return next.handle().pipe(
        catchError((error) => {
          // Handle the error here
          console.error('An error occurred:', error);
          throw new Error(error);
        }),
      );
    } else {
      return next.handle();
    }
  }
}
