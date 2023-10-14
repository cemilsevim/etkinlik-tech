import { LogLevel, ConsoleLogger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LoggerService extends ConsoleLogger {
    private logger: winston.Logger;

    constructor() {
        super();
        this.logger = winston.createLogger({});
    }

    log(message: any, ...optionalParams: any[]): this {
        this.logger.info(message, ...optionalParams);
        return this;
    }

    error(message: any, ...optionalParams: any[]): this {
        this.logger.error(message, ...optionalParams);
        return this;
    }

    warn(message: any, ...optionalParams: any[]): this {
        this.logger.error(message, ...optionalParams);
        return this;
    }

    debug(message: any, ...optionalParams: any[]): this {
        this.logger.debug(message, ...optionalParams);
        return this;
    }

    verbose(message: any, ...optionalParams: any[]): this {
        this.logger.verbose(message, ...optionalParams);
        return this;
    }
}
