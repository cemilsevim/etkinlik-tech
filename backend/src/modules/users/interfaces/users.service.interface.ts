import { CreateUserRequestDto } from '../dto/create.user.request.dto';
import { Users } from '../entities/users.entity';

export interface IUsersService {
    findUserByEmail(email: string): Promise<Users>;
    checkUserExistsByEmail(email: string): Promise<void>;
    createUser(createUserRequestDto: CreateUserRequestDto): Promise<Users>;
}
