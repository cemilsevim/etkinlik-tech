import {
    CanActivate,
    ExecutionContext,
    HttpException,
    Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        const exceptionResponse = {
            error: true,
            errorCode: 'UNAUTHORIZED_ERROR',
            message: 'Unauthorized.',
        };
        const exceptionStatus = 401;

        if (!token) {
            throw new HttpException(exceptionResponse, exceptionStatus);
        }

        try {
            const user = await this.authService.authControl(token);

            request['user'] = { user };
        } catch {
            throw new HttpException(exceptionResponse, exceptionStatus);
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
