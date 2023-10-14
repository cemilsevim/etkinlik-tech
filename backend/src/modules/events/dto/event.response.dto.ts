import { Events } from '../entities/events.entity';

export class EventResponseDto {
    id: number;
    name: string;
    coverImage: string;
    description: string;
    location: string;
    date: Date;

    constructor(event: Events) {
        this.id = event.id;
        this.name = event.name;
        this.coverImage = event.coverImage;
        this.description = event.description;
        this.location = event.location;
        this.date = event.date;
    }
}
