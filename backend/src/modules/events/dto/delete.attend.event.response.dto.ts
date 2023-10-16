import { ApiProperty } from '@nestjs/swagger';
import { EventParticipants } from '../entities/event.participants.entity';

export class DeleteAttendEventResponseDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    eventId: number;

    @ApiProperty()
    willAttend: boolean;

    constructor(eventParticipant: EventParticipants) {
        this.id = eventParticipant.id;
        this.eventId = eventParticipant.eventId;
        this.willAttend = eventParticipant.willAttend;
    }
}
