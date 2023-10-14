import { IEventsResult } from '../interfaces/events.service.interface';
import { EventResponseDto } from './event.response.dto';

export class GetEventResponseDto extends EventResponseDto {
    willAttend: boolean | null;
    attend: boolean | null;

    constructor(getEventResult: IEventsResult) {
        super(getEventResult);

        this.willAttend = getEventResult.will_attend;
        this.attend = getEventResult.attended;
    }
}
