import { IEventsResult } from '../interfaces/events.service.interface';
import { EventResponseDto } from './event.response.dto';

export class ListEventsResponseDto extends EventResponseDto {
    willAttend: boolean | null;
    attend: boolean | null;

    constructor(listEventsResult: IEventsResult) {
        super(listEventsResult);

        this.willAttend = listEventsResult.will_attend;
        this.attend = listEventsResult.attended;
    }
}
