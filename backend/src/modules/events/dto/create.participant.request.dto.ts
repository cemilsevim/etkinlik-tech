import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';

export class CreateParticipantRequestDto {
    @ApiProperty()
    @IsNumber()
    eventId: number;

    @ApiProperty()
    @IsNumber()
    userId: number;

    @ApiProperty()
    @IsBoolean()
    willAttend: boolean;

    @ApiProperty()
    @IsBoolean()
    attended: boolean;
}
