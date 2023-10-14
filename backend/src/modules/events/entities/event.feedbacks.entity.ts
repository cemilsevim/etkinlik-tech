import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Events } from './events.entity';
import { Users } from 'src/modules/users/entities/users.entity';

@Entity()
export class EventFeedbacks {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'text',
    })
    feedback: string;

    @Index()
    @Column({
        name: 'event_id',
    })
    eventId: number;

    @ManyToOne(() => Events, (event) => event.id)
    @JoinColumn({ name: 'event_id' })
    event: Events;

    @Index()
    @Column({
        name: 'user_id',
    })
    userId: number;

    @ManyToOne(() => Users, (event) => event.id)
    @JoinColumn({ name: 'user_id' })
    user: Users;

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt: Date;
}
