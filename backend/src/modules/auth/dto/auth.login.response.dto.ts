import { UserResponseDto } from 'src/modules/users/dto/user.response.dto';
import { IAuthLoginResult } from '../interfaces/auth.service.interface';
import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginResponseDto extends UserResponseDto {
    @ApiProperty()
    accessToken: string;

    constructor({ user, accessToken }: IAuthLoginResult) {
        super(user);

        this.accessToken = accessToken;
    }
}
