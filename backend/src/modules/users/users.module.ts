import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';

@Module({
    providers: [UsersService],
    imports: [TypeOrmModule.forFeature([Users])],
    exports: [UsersService],
})
export class UsersModule {}
