import { Users } from 'src/modules/users/entities/users.entity';
import { AuthLoginRequestDto } from '../dto/auth.login.request.dto';
import { AuthRegisterRequestDto } from '../dto/auth.register.request.dto';

export interface IAuthService {
    login(authLoginRequestDto: AuthLoginRequestDto): Promise<IAuthLoginResult>;
    register(authRegisterRequestDto: AuthRegisterRequestDto): Promise<any>;
    authControl(token: string): Promise<Users>;
    hashPassword(password: string): Promise<string>;
    compareHashWithPassword(
        password: string,
        hashPassword: string,
    ): Promise<boolean>;
}

export interface IAuthLoginResult {
    user: Users;
    accessToken: string;
}
