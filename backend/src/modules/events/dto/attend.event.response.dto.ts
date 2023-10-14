import { EventParticipants } from '../entities/event.participants.entity';

export class AttendEventResponseDto {
    id: number;
    eventId: number;
    willAttend: boolean;

    constructor(eventParticipant: EventParticipants) {
        this.id = eventParticipant.id;
        this.eventId = eventParticipant.eventId;
        this.willAttend = eventParticipant.willAttend;
    }
}
