import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { Users } from 'src/modules/users/entities/users.entity';

export class UserResponseDto {
    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    mobilePhone: string;

    constructor({ firstName, lastName, email, mobilePhone }: Users) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.mobilePhone = mobilePhone;
    }
}
