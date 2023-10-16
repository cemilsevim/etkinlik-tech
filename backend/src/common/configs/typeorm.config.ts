import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const config = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['../../modules/**/*.entity{.ts,.js}'],
    migrations: [join(__dirname, '../../migrations/*{.ts,.js}')],
    cli: {
        entitiesDir: 'src',
        migrationsDir: 'src/migrations',
    },
    autoLoadEntities: true,
    synchronize: true,
    dateStrings: ['timestamp without time zone'],
    timezone: 'UTC',
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
