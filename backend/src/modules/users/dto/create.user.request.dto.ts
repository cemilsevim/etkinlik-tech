import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsMobilePhone,
    IsNotEmpty,
    IsString,
    MinLength,
} from 'class-validator';

export class CreateUserRequestDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiProperty()
    @IsMobilePhone()
    @IsNotEmpty()
    mobilePhone: string;
}
