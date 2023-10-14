import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFeedbackRequestDto {
    @IsString()
    @IsNotEmpty()
    feedback: string;
}
