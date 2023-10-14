import { CreateFeedbackRequestDto } from '../dto/create.feedback.request.dto';
import { EventFeedbacks } from '../entities/event.feedbacks.entity';

export interface IEventFeedbacksService {
    createFeedback(
        createFeedbackRequestDto: CreateFeedbackRequestDto,
        eventId: number,
        userId: number,
    ): Promise<EventFeedbacks>;
    listFeedbacksByEventId(eventId: number): Promise<EventFeedbacks[]>;
}
