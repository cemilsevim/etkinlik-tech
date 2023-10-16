import { UserResponseDto } from 'src/modules/users/dto/user.response.dto';
import { EventResponseDto } from './event.response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ParticipantResponseDto {
    @ApiProperty()
    event: EventResponseDto;

    @ApiProperty()
    user: UserResponseDto;

    @ApiProperty()
    willAttend: boolean;

    @ApiProperty()
    attended: boolean;
}
