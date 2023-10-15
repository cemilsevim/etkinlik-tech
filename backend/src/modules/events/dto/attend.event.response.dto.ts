import { EventParticipants } from '../entities/event.participants.entity';
import { EventResponseDto } from './event.response.dto';

export class AttendEventResponseDto {
    id: number;
    eventId: number;
    willAttend: boolean;
    attended: boolean;
    event: EventResponseDto;

    constructor(eventParticipant: EventParticipants) {
        this.id = eventParticipant.id;
        this.eventId = eventParticipant.eventId;
        this.willAttend = eventParticipant.willAttend;
        this.attended = eventParticipant.attended;
        this.event = eventParticipant.event
            ? new EventResponseDto(eventParticipant.event)
            : null;
    }
}
