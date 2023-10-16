import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config as dotenvConfig } from 'dotenv';
import { AddInitData1697444087414 } from 'src/migrations/1697444087414-add-init-data';
import { EventFeedbacks } from 'src/modules/events/entities/event.feedbacks.entity';
import { EventParticipants } from 'src/modules/events/entities/event.participants.entity';
import { Events } from 'src/modules/events/entities/events.entity';
import { Users } from 'src/modules/users/entities/users.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const config = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Events, EventParticipants, Users, EventFeedbacks],
    synchronize: true,
    dateStrings: ['timestamp without time zone'],
    timezone: 'UTC',
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
