import { Module, Scope } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventsModule } from './modules/events/events.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerModule } from './common/modules/logger/logger.module';
import { JwtModule } from '@nestjs/jwt';
import { ProfileModule } from './modules/profile/profile.module';
import typeormConfig from './common/configs/typeorm.config';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [typeormConfig] }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) =>
                configService.get('typeorm'),
        }),
        JwtModule.registerAsync({
            global: true,
            useFactory: (configService: ConfigService) => {
                return {
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: configService.get('JWT_EXPIRES_IN'),
                    },
                };
            },
            inject: [ConfigService],
        }),
        LoggerModule,
        EventsModule,
        UsersModule,
        AuthModule,
        ProfileModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
