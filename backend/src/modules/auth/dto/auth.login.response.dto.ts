import { UserResponseDto } from 'src/modules/users/dto/user.response.dto';
import { IAuthLoginResult } from '../interfaces/auth.service.interface';

export class AuthLoginResponseDto extends UserResponseDto {
    accessToken: string;

    constructor({ user, accessToken }: IAuthLoginResult) {
        super(user);

        this.accessToken = accessToken;
    }
}
