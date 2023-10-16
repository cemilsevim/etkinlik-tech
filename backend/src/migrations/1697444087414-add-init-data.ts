import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddInitData1697444087414 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            insert into users (id, first_name, last_name, email, password, mobile_phone)
            values (1, 'John', 'Doe', 'john.doe@etkinlik.tech', ''$2b$10$okH3LfX93dgKBps046VoHO4VHztvxuOemcbSVMYCUg28SyH9tHYKa'
            ', '5341111111')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`delete from users where id = 1`);
    }
}
