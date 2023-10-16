import { ApiProperty } from '@nestjs/swagger';
import { IEventsResult } from '../interfaces/events.service.interface';
import { EventResponseDto } from './event.response.dto';

export class ListEventsResponseDto extends EventResponseDto {
    @ApiProperty()
    willAttend: boolean | null;

    @ApiProperty()
    attend: boolean | null;

    constructor(listEventsResult: IEventsResult) {
        super(listEventsResult);

        this.willAttend = listEventsResult.will_attend;
        this.attend = listEventsResult.attended;
    }
}
