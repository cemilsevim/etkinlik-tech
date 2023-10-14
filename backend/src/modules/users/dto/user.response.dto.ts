import { Users } from 'src/modules/users/entities/users.entity';

export class UserResponseDto {
    firstName: string;
    lastName: string;
    email: string;
    mobilePhone: string;

    constructor({ firstName, lastName, email, mobilePhone }: Users) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.mobilePhone = mobilePhone;
    }
}
