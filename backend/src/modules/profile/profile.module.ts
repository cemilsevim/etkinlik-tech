import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { EventsModule } from '../events/events.module';
import { ProfileService } from './services/profile.service';
import { ProfileController } from './controllers/profile.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [UsersModule, EventsModule, AuthModule],
    providers: [ProfileService],
    controllers: [ProfileController],
})
export class ProfileModule {}
