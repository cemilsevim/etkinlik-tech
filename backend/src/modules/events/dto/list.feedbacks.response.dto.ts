import { UserResponseDto } from 'src/modules/users/dto/user.response.dto';
import { FeedbackResponseDto } from './feedback.response.dto';
import { EventFeedbacks } from '../entities/event.feedbacks.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ListFeedbacksResponseDto extends FeedbackResponseDto {
    @ApiProperty()
    user: {
        id: number;
        firstName: string;
        lastName: string;
    } = {
        id: null,
        firstName: null,
        lastName: null,
    };

    constructor(eventFeedback: EventFeedbacks) {
        super(eventFeedback);

        this.user.id = eventFeedback.user.id;
        this.user.firstName = eventFeedback.user.firstName;
        this.user.lastName = eventFeedback.user.lastName;
    }
}
