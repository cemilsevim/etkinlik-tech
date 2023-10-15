import { CreateParticipantRequestDto } from '../dto/create.participant.request.dto';
import { EventParticipants } from '../entities/event.participants.entity';

export interface IEventParticipantsService {
    createParticipant(
        createParticipantRequestDto: CreateParticipantRequestDto,
    ): Promise<EventParticipants>;
    deleteParticipantByUserId(
        eventId: number,
        userId: number,
    ): Promise<EventParticipants>;
    checkParticipantByUserId(eventId: number, userId: number): Promise<void>;
    findParticipantsByUserId(
        eventId: number,
        userId: number,
    ): Promise<EventParticipants>;
    listParticipantsByUserId(userId: number): Promise<EventParticipants[]>;
}
