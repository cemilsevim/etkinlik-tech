import {
    IsEmail,
    IsMobilePhone,
    IsNotEmpty,
    IsString,
    MinLength,
} from 'class-validator';

export class CreateUserRequestDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsMobilePhone()
    @IsNotEmpty()
    mobilePhone: string;
}
