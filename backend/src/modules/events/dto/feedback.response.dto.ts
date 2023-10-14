import { EventFeedbacks } from '../entities/event.feedbacks.entity';

export class FeedbackResponseDto {
    eventId: number;
    userId: number;
    feedback: string;

    constructor(eventFeedback: EventFeedbacks) {
        this.eventId = eventFeedback.eventId;
        this.userId = eventFeedback.userId;
        this.feedback = eventFeedback.feedback;
    }
}
