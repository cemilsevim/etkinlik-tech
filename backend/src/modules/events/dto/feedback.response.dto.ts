import { EventFeedbacks } from '../entities/event.feedbacks.entity';
import { EventResponseDto } from './event.response.dto';

export class FeedbackResponseDto {
    eventId: number;
    userId: number;
    feedback: string;
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
