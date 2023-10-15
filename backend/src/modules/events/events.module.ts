import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Events } from './entities/events.entity';
import { EventsService } from './services/events.service';
import { EventsController } from './controllers/events.controller';
import { AuthModule } from '../auth/auth.module';
import { EventParticipants } from './entities/event.participants.entity';
import { EventParticipantsService } from './services/event.participants.service';
import { EventFeedbacks } from './entities/event.feedbacks.entity';
import { EventFeedbacksService } from './services/event.feedbacks.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Events, EventParticipants, EventFeedbacks]),
        AuthModule,
    ],
    providers: [EventsService, EventParticipantsService, EventFeedbacksService],
    controllers: [EventsController],
    exports: [EventsService, EventParticipantsService, EventFeedbacksService],
})
export class EventsModule {}
