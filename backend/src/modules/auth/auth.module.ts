import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LoggerModule } from 'src/common/modules/logger/logger.module';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from '../users/users.module';
import { AuthGuard } from './guards/auth.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@Module({
    imports: [LoggerModule, UsersModule],
    providers: [AuthService, AuthGuard, AuthInterceptor],
    controllers: [AuthController],
    exports: [AuthService, AuthGuard, AuthInterceptor],
})
export class AuthModule {}
