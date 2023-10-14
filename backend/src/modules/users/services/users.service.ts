import { Injectable } from '@nestjs/common';
import { Users } from '../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUsersService } from '../interfaces/users.service.interface';
import { CreateUserRequestDto } from '../dto/create.user.request.dto';
import { UserAlreadyExistsError } from '../errors/user.already.exists.error';
import { UserNotFoundError } from '../errors/user.not.found.error';

@Injectable()
export class UsersService implements IUsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) {}

    async findUser(id: number): Promise<Users> {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) {
            throw new UserNotFoundError();
        }

        return user;
    }

    async findUserByEmail(email: string): Promise<Users> {
        const user = await this.usersRepository.findOneBy({ email });
        if (!user) {
            throw new UserNotFoundError();
        }

        return user;
    }

    async checkUserExistsByEmail(email: string): Promise<void> {
        const user = await this.usersRepository.findOneBy({
            email,
        });
        if (user) {
            throw new UserAlreadyExistsError(user);
        }
    }

    async createUser(
        createUserRequestDto: CreateUserRequestDto,
    ): Promise<Users> {
        await this.checkUserExistsByEmail(createUserRequestDto.email);

        const newUser = this.usersRepository.create(createUserRequestDto);
        const createdUser = await this.usersRepository.save(newUser);

        return createdUser;
    }
}
