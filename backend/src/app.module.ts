import { Module, Scope } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventsModule } from './modules/events/events.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Events } from './modules/events/entities/events.entity';
import { Users } from './modules/users/entities/users.entity';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerModule } from './common/modules/logger/logger.module';
import { JwtModule } from '@nestjs/jwt';
import { EventParticipants } from './modules/events/entities/event.participants.entity';
import { EventFeedbacks } from './modules/events/entities/event.feedbacks.entity';
import { ProfileModule } from './modules/profile/profile.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => {
                return {
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT') || 5432,
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_NAME'),
                    entities: [
                        Events,
                        EventParticipants,
                        Users,
                        EventFeedbacks,
                    ],
                    synchronize: true,
                    dateStrings: ['timestamp without time zone'],
                    timezone: 'UTC',
                };
            },
            inject: [ConfigService],
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
