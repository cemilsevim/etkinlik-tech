import { CreateFeedbackRequestDto } from '../dto/create.feedback.request.dto';
import { CreateEventRequestDto } from '../dto/create.event.request.dto';
import { ListFeedbacksRequestDto } from '../dto/list.comments.request.dto';
import { EventParticipants } from '../entities/event.participants.entity';
import { Events } from '../entities/events.entity';
import { EventsTime } from '../enums/events.enum';
import { EventFeedbacks } from '../entities/event.feedbacks.entity';

export interface IEventsService {
    listEventsByTime(
        userId: number,
        time: EventsTime,
    ): Promise<IEventsResult[]>;
    getEventDetail(id: number, userId: number): Promise<IEventsResult>;
    createEvent(createEventRequestDto: CreateEventRequestDto): Promise<Events>;
    attendEvent(eventId: number, userId: number): Promise<EventParticipants>;
    deleteAttendEvent(
        eventId: number,
        userId: number,
    ): Promise<EventParticipants>;
    createFeedback(
        createFeedbackRequestDto: CreateFeedbackRequestDto,
        eventId: number,
        userId: number,
    ): Promise<EventFeedbacks>;
    listFeedbacksByEventId(eventId: number): Promise<EventFeedbacks[]>;
}

export interface IEventsResult extends Events {
    will_attend: boolean | null;
    attended: boolean | null;
}
