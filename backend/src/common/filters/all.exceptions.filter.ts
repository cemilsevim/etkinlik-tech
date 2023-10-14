import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { LoggerService } from '../modules/logger/logger.service';
import ExceptionMapperJson from '../resources/exception-mapper.json';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(
        private httpAdapterHost: HttpAdapterHost,
        private loggerService: LoggerService,
    ) {}

    catch(exception: unknown, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();

        let responseBody = {};
        let httpStatus;

        if (!(exception instanceof HttpException)) {
            responseBody = {
                error: true,
                errorCode: 'UNKNOWN_ERROR',
                message: 'Internal Server Error',
            };
            httpStatus = ExceptionMapperJson.UNKNOWN_ERROR;
        } else {
            const exceptionResponse: any = exception.getResponse();
            responseBody = {
                error: true,
                errorCode: exceptionResponse?.errorCode || 'UNKNOWN_ERROR',
                message: exceptionResponse?.message || 'Internal Server Error',
            };
            httpStatus = exception.getStatus();
        }

        if (httpStatus === ExceptionMapperJson.UNKNOWN_ERROR) {
            this.loggerService.error(
                `APP ERROR! message: ${JSON.stringify(
                    exception?.['stack'] || exception,
                )}}`,
            );
        }

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}
