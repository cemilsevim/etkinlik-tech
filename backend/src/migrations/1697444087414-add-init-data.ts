import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddInitData1697444087414 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            insert into users (id, first_name, last_name, email, password, mobile_phone)
            values (1, 'John', 'Doe', 'john.doe@etkinlik.tech', '$2b$10$okH3LfX93dgKBps046VoHO4VHztvxuOemcbSVMYCUg28SyH9tHYKa', '5341111111');
            
            insert into events (id, name, cover_image, description, location, date)
            values (1, 'Webrazzi Summit 2023', 'https://cdn.webrazzi.com/uploads/2023/10/etkinlik-transparan-705.png', 'Webrazzi Summit, hem online hem de fiziksel olarak gerçekleşecek!
            Türkiye girişimcilik ve teknoloji ekosisteminin buluşma noktası olan ve yılda sadece bir defa gerçekleşen Webrazzi Summit''''''''te, her yıl olduğu gibi birbirinden önemli yerli/yabancı konuşmacılara ve binlerce katılımcıya ev sahipliği yapacağız.
            Tercihini online katılımdan yana kullanan katılımcılarımız; fiziksel olarak etkinlik alanında bulunan katılımcılarımız gibi tüm oturumlara, online fuaye alanına ve networking seçeneklerine erişerek Webrazzi Summit 2023’ün tadını çıkarabilecekler.
            Geç kalmadan Webrazzi Summit 2023''''''''te yerinizi ayırtın.', 'Istanbul', '2023-10-25 10:00:00');

            insert into events (id, name, cover_image, description, location, date)
            values (2, 'Webrazzi Summit 2024', 'https://cdn.webrazzi.com/uploads/2023/10/etkinlik-transparan-705.png', 'Webrazzi Summit, hem online hem de fiziksel olarak gerçekleşecek!
            Türkiye girişimcilik ve teknoloji ekosisteminin buluşma noktası olan ve yılda sadece bir defa gerçekleşen Webrazzi Summit''''''''te, her yıl olduğu gibi birbirinden önemli yerli/yabancı konuşmacılara ve binlerce katılımcıya ev sahipliği yapacağız.
            Tercihini online katılımdan yana kullanan katılımcılarımız; fiziksel olarak etkinlik alanında bulunan katılımcılarımız gibi tüm oturumlara, online fuaye alanına ve networking seçeneklerine erişerek Webrazzi Summit 2023’ün tadını çıkarabilecekler.
            Geç kalmadan Webrazzi Summit 2024''''''''te yerinizi ayırtın.', 'Istanbul', '2024-10-25 10:00:00');

            insert into events (id, name, cover_image, description, location, date)
            values (3, 'Webrazzi Summit 2022', 'https://cdn.webrazzi.com/uploads/2023/10/etkinlik-transparan-705.png', 'Webrazzi Summit, hem online hem de fiziksel olarak gerçekleşecek!
            Türkiye girişimcilik ve teknoloji ekosisteminin buluşma noktası olan ve yılda sadece bir defa gerçekleşen Webrazzi Summit''''''''te, her yıl olduğu gibi birbirinden önemli yerli/yabancı konuşmacılara ve binlerce katılımcıya ev sahipliği yapacağız.
            Tercihini online katılımdan yana kullanan katılımcılarımız; fiziksel olarak etkinlik alanında bulunan katılımcılarımız gibi tüm oturumlara, online fuaye alanına ve networking seçeneklerine erişerek Webrazzi Summit 2023’ün tadını çıkarabilecekler.
            Geç kalmadan Webrazzi Summit 2022''''''''te yerinizi ayırtın.', 'Istanbul', '2022-10-25 10:00:00');

            insert into event_participants (id, event_id, user_id, will_attend, attended)
            values (1, 1, 1, true, false);
            insert into event_participants (id, event_id, user_id, will_attend, attended)
            values (2, 2, 1, true, false);
            insert into event_participants (id, event_id, user_id, will_attend, attended)
            values (3, 3, 1, true, true);
            
            insert into event_feedbacks (id, event_id, user_id, feedback)
            values(1, 1, 1, 'test feedback 1');
            insert into event_feedbacks (id, event_id, user_id, feedback)
            values(2, 2, 1, 'test feedback 2');
            insert into event_feedbacks (id, event_id, user_id, feedback)
            values(3, 3, 1, 'test feedback 3');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            delete from users where id = 1;
            delete from events where id = any('{1,2,3}');
            delete from event_participants where id =  any('{1,2,3});
            delete from event_feedbacks where id =  any('{1,2,3}');
        `);
    }
}
