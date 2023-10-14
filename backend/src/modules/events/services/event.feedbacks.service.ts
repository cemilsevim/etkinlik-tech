import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IEventFeedbacksService } from '../interfaces/event.feedbacks.interface';
import { EventFeedbacks } from '../entities/event.feedbacks.entity';
import { CreateFeedbackRequestDto } from '../dto/create.feedback.request.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class EventFeedbacksService implements IEventFeedbacksService {
    constructor(
        @InjectRepository(EventFeedbacks)
        private eventFeedbacksRepository: Repository<EventFeedbacks>,
    ) {}

    async createFeedback(
        createFeedbackRequestDto: CreateFeedbackRequestDto,
        eventId: number,
        userId: number,
    ): Promise<EventFeedbacks> {
        const feedback = this.eventFeedbacksRepository.create(
            plainToClass(EventFeedbacks, {
                ...createFeedbackRequestDto,
                eventId,
                userId,
            }),
        );

        const createdFeedback = await this.eventFeedbacksRepository.save(
            feedback,
        );
        return createdFeedback;
    }

    async listFeedbacksByEventId(eventId: number): Promise<EventFeedbacks[]> {
        const feedbacks = await this.eventFeedbacksRepository.find({
            where: { eventId },
            relations: ['user'],
        });

        return feedbacks;
    }
}
