import { Injectable } from '@nestjs/common';
import {
    IAuthLoginResult,
    IAuthService,
} from '../interfaces/auth.service.interface';
import { AuthLoginRequestDto } from '../dto/auth.login.request.dto';
import { AuthRegisterRequestDto } from '../dto/auth.register.request.dto';
import { UsersService } from '../../users/services/users.service';
import * as bcrypt from 'bcrypt';
import { Users } from '../../users/entities/users.entity';
import { AuthEmailOrPasswordIncorrectError } from '../errors/auth.email.or.password.incorrect.error';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserRequestDto } from 'src/modules/users/dto/create.user.request.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        private configService: ConfigService,
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async login({
        email,
        password,
    }: AuthLoginRequestDto): Promise<IAuthLoginResult> {
        let user: Users;

        try {
            user = await this.usersService.findUserByEmail(email);
        } catch (error) {
            throw new AuthEmailOrPasswordIncorrectError();
        }

        const hashPassword = user.password;
        const isPasswordCorrect = await this.compareHashWithPassword(
            password,
            hashPassword,
        );

        if (!isPasswordCorrect) {
            throw new AuthEmailOrPasswordIncorrectError();
        }

        const accessToken = await this.jwtService.signAsync({ sub: user.id });

        return { user, accessToken };
    }

    async register(
        authRegisterRequestDto: AuthRegisterRequestDto,
    ): Promise<Users> {
        const password = authRegisterRequestDto.password;
        const hashPassword = await this.hashPassword(password);

        const createdUser = await this.usersService.createUser(
            plainToClass(CreateUserRequestDto, {
                ...authRegisterRequestDto,
                password: hashPassword,
            }),
        );

        return createdUser;
    }

    async authControl(token: string): Promise<Users> {
        const payload = await this.jwtService.verifyAsync(token, {
            secret: this.configService.get('JWT_SECRET'),
        });
        const user = await this.usersService.findUser(payload.sub);

        return user;
    }

    async hashPassword(password: string): Promise<string> {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);

        return hash;
    }

    async compareHashWithPassword(
        password: string,
        hash: string,
    ): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}
