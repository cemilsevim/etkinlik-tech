import { IsBoolean, IsNumber } from 'class-validator';

export class CreateParticipantRequestDto {
    @IsNumber()
    eventId: number;

    @IsNumber()
    userId: number;

    @IsBoolean()
    willAttend: boolean;

    @IsBoolean()
    attended: boolean;
}
