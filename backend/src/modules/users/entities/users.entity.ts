import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
} from 'typeorm';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({
        name: 'first_name',
    })
    firstName: string;

    @Index()
    @Column({
        name: 'last_name',
    })
    lastName: string;

    @Index()
    @Column({
        unique: true,
    })
    email: string;

    @Column()
    password: string;

    @Index()
    @Column({
        name: 'mobile_phone',
        length: 10,
    })
    mobilePhone: string;

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt: Date;
}
