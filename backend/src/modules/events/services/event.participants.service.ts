import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IEventParticipantsService } from '../interfaces/event.participants.interface';
import { EventParticipants } from '../entities/event.participants.entity';
import { ParticipantNotFoundError } from '../errors/participant.not.found.error';
import { ParticipantAlreadyExistsError } from '../errors/participant.already.exists.error';
import { CreateParticipantRequestDto } from '../dto/create.participant.request.dto';

@Injectable()
export class EventParticipantsService implements IEventParticipantsService {
    constructor(
        @InjectRepository(EventParticipants)
        private eventParticipantsRepository: Repository<EventParticipants>,
    ) {}

    async createParticipant(
        createParticipantRequestDto: CreateParticipantRequestDto,
    ): Promise<EventParticipants> {
        const eventId = createParticipantRequestDto.eventId;
        const userId = createParticipantRequestDto.userId;

        await this.checkParticipantByUserId(eventId, userId);

        const participant = this.eventParticipantsRepository.create(
            createParticipantRequestDto,
        );
        const createdParticipant = await this.eventParticipantsRepository.save(
            participant,
        );
        return createdParticipant;
    }

    async deleteParticipantByUserId(
        eventId: number,
        userId: number,
    ): Promise<EventParticipants> {
        const participant = await this.findParticipantsByUserId(
            eventId,
            userId,
        );

        await this.eventParticipantsRepository.delete(participant.id);

        participant.willAttend = false;
        return participant;
    }

    async checkParticipantByUserId(
        eventId: number,
        userId: number,
    ): Promise<void> {
        const participant = await this.eventParticipantsRepository.findOneBy({
            eventId,
            userId,
        });

        if (participant) {
            throw new ParticipantAlreadyExistsError(participant);
        }
    }

    async findParticipantsByUserId(
        eventId: number,
        userId: number,
    ): Promise<EventParticipants> {
        const participant = await this.eventParticipantsRepository.findOneBy({
            eventId,
            userId,
        });

        if (!participant) {
            throw new ParticipantNotFoundError();
        }

        return participant;
    }
}
