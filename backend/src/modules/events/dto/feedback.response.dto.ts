import { ApiProperty } from '@nestjs/swagger';
import { EventFeedbacks } from '../entities/event.feedbacks.entity';
import { EventResponseDto } from './event.response.dto';

export class FeedbackResponseDto {
    @ApiProperty()
    eventId: number;

    @ApiProperty()
    userId: number;

    @ApiProperty()
    feedback: string;

    @ApiProperty()
    event: EventResponseDto;

    constructor(eventFeedback: EventFeedbacks) {
        this.eventId = eventFeedback.eventId;
        this.userId = eventFeedback.userId;
        this.feedback = eventFeedback.feedback;
        this.event = eventFeedback.event
            ? new EventResponseDto(eventFeedback.event)
            : null;
    }
}
