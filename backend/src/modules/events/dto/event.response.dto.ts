import { ApiProperty } from '@nestjs/swagger';
import { Events } from '../entities/events.entity';

export class EventResponseDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    coverImage: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    location: string;

    @ApiProperty()
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
