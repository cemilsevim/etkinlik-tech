import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateEventRequestDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    coverImage: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsDateString()
    @IsNotEmpty()
    date: Date;
}
