import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/modules/auth/services/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private authService: AuthService) {}

    async use(request: Request, response: Response, next: NextFunction) {
        const token = this.extractTokenFromHeader(request);

        if (token) {
            try {
                const user = await this.authService.authControl(token);

                request['user'] = { user };
            } catch {}
        }

        next();
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
