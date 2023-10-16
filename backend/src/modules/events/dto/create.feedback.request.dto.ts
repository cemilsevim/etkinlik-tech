import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFeedbackRequestDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    feedback: string;
}
