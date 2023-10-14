import { Injectable } from '@nestjs/common';
import {
    IEventsResult,
    IEventsService,
} from '../interfaces/events.service.interface';
import { CreateEventRequestDto } from '../dto/create.event.request.dto';
import { Events } from '../entities/events.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventsTime } from '../enums/events.enum';
import { EventNotFoundError } from '../errors/event.not.found.error';
import { EventParticipantsService } from './event.participants.service';
import { EventParticipants } from '../entities/event.participants.entity';
import { CreateParticipantRequestDto } from '../dto/create.participant.request.dto';
import { plainToClass } from 'class-transformer';
import { CreateFeedbackRequestDto } from '../dto/create.feedback.request.dto';
import { EventFeedbacksService } from './event.feedbacks.service';
import { EventFeedbacks } from '../entities/event.feedbacks.entity';

@Injectable()
export class EventsService implements IEventsService {
    constructor(
        @InjectRepository(Events)
        private eventsRepository: Repository<Events>,
        private eventParticipantService: EventParticipantsService,
        private eventFeedbackService: EventFeedbacksService,
    ) {}

    async createEvent(
        createEventRequestDto: CreateEventRequestDto,
    ): Promise<Events> {
        const event = this.eventsRepository.create(createEventRequestDto);
        const createdEvent = await this.eventsRepository.save(event);

        return createdEvent;
    }

    async findEvent(id: number): Promise<Events> {
        const event = await this.eventsRepository.findOneBy({ id });
        if (!event) {
            throw new EventNotFoundError();
        }

        return event;
    }

    async listEventsByTime(
        userId: number,
        time: EventsTime = EventsTime.todays,
    ): Promise<IEventsResult[]> {
        const timeToQuery = {
            todays: `e.date::date = now()::date`,
            upcoming: `e.date::date > now()::date`,
            past: `e.date::date < now()::date`,
        };

        const events = await this.eventsRepository.query(
            `select e.*, ep.will_attend from events e
            left join event_participants ep on ep.event_id = e.id and ep.user_id = $1
            where ${timeToQuery[time] || timeToQuery.todays}`,
            [userId],
        );

        return events;
    }

    async getEventDetail(id: number, userId: number): Promise<IEventsResult> {
        const eventQuery = await this.eventsRepository.query(
            `select e.*, ep.will_attend from events e
            left join event_participants ep on ep.event_id = e.id and ep.user_id = $2
            where e.id = $1`,
            [id, userId],
        );
        if (eventQuery.length === 0) {
            throw new EventNotFoundError();
        }

        return eventQuery[0];
    }

    async attendEvent(
        eventId: number,
        userId: number,
    ): Promise<EventParticipants> {
        const event = await this.findEvent(eventId);
        const createdParticipant =
            await this.eventParticipantService.createParticipant(
                plainToClass(CreateParticipantRequestDto, {
                    eventId: event.id,
                    userId,
                    willAttend: true,
                    attended: false,
                }),
            );

        return createdParticipant;
    }

    async deleteAttendEvent(
        eventId: number,
        userId: number,
    ): Promise<EventParticipants> {
        const event = await this.findEvent(eventId);
        const deletedParticipant =
            await this.eventParticipantService.deleteParticipantByUserId(
                event.id,
                userId,
            );

        return deletedParticipant;
    }

    async createFeedback(
        createFeedbackRequestDto: CreateFeedbackRequestDto,
        eventId: number,
        userId: number,
    ): Promise<EventFeedbacks> {
        await this.findEvent(eventId);
        await this.eventParticipantService.findParticipantsByUserId(
            eventId,
            userId,
        );

        const createdFeedback = await this.eventFeedbackService.createFeedback(
            createFeedbackRequestDto,
            eventId,
            userId,
        );
        return createdFeedback;
    }

    async listFeedbacksByEventId(eventId: number): Promise<EventFeedbacks[]> {
        const event = await this.findEvent(eventId);
        const feedbacks =
            await this.eventFeedbackService.listFeedbacksByEventId(event.id);

        return feedbacks;
    }
}
