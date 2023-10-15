import { UserResponseDto } from 'src/modules/users/dto/user.response.dto';
import { EventResponseDto } from './event.response.dto';

export class ParticipantResponseDto {
    event: EventResponseDto;
    user: UserResponseDto;
    willAttend: boolean;
    attended: boolean;
}
