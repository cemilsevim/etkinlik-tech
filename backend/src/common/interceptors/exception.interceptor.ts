import {
    CallHandler,
    ExecutionContext,
    HttpException,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { AppError } from '../exceptions/app.error';
import ExceptionMapperJson from '../../common/resources/exception-mapper.json';
import { ValidationError } from 'class-validator';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<unknown> {
        return next.handle().pipe(
            catchError((error) => {
                if (error instanceof AppError) {
                    const statusCode = ExceptionMapperJson[error.code];

                    return throwError(
                        () =>
                            new HttpException(
                                {
                                    error: true,
                                    errorCode: error.code,
                                    message: error.message,
                                },
                                statusCode,
                                {
                                    cause: error,
                                },
                            ),
                    );
                }

                if (error instanceof ValidationError) {
                }

                return throwError(() => error);
            }),
        );
    }
}
