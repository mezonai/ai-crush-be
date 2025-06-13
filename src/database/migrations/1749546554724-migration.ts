import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1749546554724 implements MigrationInterface {
  name = 'Migration1749546554724';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "character_emotions" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "character_id" uuid NOT NULL, "emotion_type" smallint NOT NULL, "video_url" character varying NOT NULL, CONSTRAINT "PK_72873ca3d50f2273672ed72fe6d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "betting_room_users" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "betting_room_id" uuid NOT NULL, "points" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_4b673cb27ca56e5fad4984fb2eb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "betting_room_characters" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "character_id" uuid NOT NULL, "betting_room_id" uuid NOT NULL, CONSTRAINT "PK_db5a827f8aad8c2af7d33bf633a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "betting_rooms" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bet_amount" character varying(255) NOT NULL, "status" character varying(50) NOT NULL, "winner_user_id" uuid, "owner_user_id" uuid NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, CONSTRAINT "PK_18710dceb52afc7a3276fa915cb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_question_histories" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "character_id" uuid NOT NULL, "question" jsonb NOT NULL, "answer" jsonb, "betting_room_id" uuid, "affection_change" smallint NOT NULL, CONSTRAINT "PK_d32ae6cd77664c47bf7cd77a373" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_character_rewards" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "character_reward_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_103b774f1692b775fab340e1a09" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "character_rewards" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "character_id" uuid NOT NULL, "required_progress" smallint NOT NULL, "reward_type" character varying(50) NOT NULL, "reward_amount" character varying(255) DEFAULT '0', "reward_media_url" character varying, CONSTRAINT "PK_3b488796bc06937950b8e9b8257" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "characters" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "character_name" character varying(255) NOT NULL, "avatar_url" character varying, "preview_video_url" character varying, "level" character varying(20), "major" character varying(255), "gender" character varying(50), "description" character varying, "unlock_token_amount" character varying(255), CONSTRAINT "PK_9d731e05758f26b9315dac5e378" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_characters" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "character_id" uuid NOT NULL, "user_id" uuid NOT NULL, "progress" smallint NOT NULL DEFAULT '0', "status" smallint NOT NULL, CONSTRAINT "PK_8da86c35d0f7bc129e3264ffabd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_extra_rewards" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "reward_type" smallint NOT NULL, "reward_amount" character varying(255) NOT NULL, CONSTRAINT "PK_99e0cd9ec74c8d48a1478f95af0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_transactions" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "transaction_type" smallint NOT NULL, "token_amount" character varying(255) NOT NULL, "status" character varying(50) NOT NULL, CONSTRAINT "PK_21325240e8a1f55f22a6f35df4f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "avatar_url" character varying, "identity_id" character varying(255) NOT NULL, "user_name" character varying(255) NOT NULL, "language" character varying(20), "token_balance" character varying(255) NOT NULL DEFAULT '0', "game_turns" integer NOT NULL DEFAULT '0', "game_turn_last_used" TIMESTAMP, "email" character varying(255), "age" smallint, "gender" character varying(50), "favorites" jsonb, CONSTRAINT "UQ_e134fffcefe19f60750bfc3ab87" UNIQUE ("identity_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "character_emotions" ADD CONSTRAINT "FK_8c9bfd9b0bc5624cc0af31aaf9a" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "betting_room_users" ADD CONSTRAINT "FK_e168296661a54aef394022e0ad4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "betting_room_users" ADD CONSTRAINT "FK_b66eb89554272c4dd4cf671c652" FOREIGN KEY ("betting_room_id") REFERENCES "betting_rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "betting_room_characters" ADD CONSTRAINT "FK_34228f23836e51d6b07b57795b7" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "betting_room_characters" ADD CONSTRAINT "FK_9773aacac65b387225c083f1062" FOREIGN KEY ("betting_room_id") REFERENCES "betting_rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "betting_rooms" ADD CONSTRAINT "FK_919294912822f1114ef6a636685" FOREIGN KEY ("owner_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "betting_rooms" ADD CONSTRAINT "FK_f27b096320b27b88ee7bc17ee5a" FOREIGN KEY ("winner_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_question_histories" ADD CONSTRAINT "FK_4ffe57001cf6a8a5e253fd1977d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_question_histories" ADD CONSTRAINT "FK_d3ea7d957afee1d4e21d65c326f" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_question_histories" ADD CONSTRAINT "FK_69d784e587d789a272e3d387e80" FOREIGN KEY ("betting_room_id") REFERENCES "betting_rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_character_rewards" ADD CONSTRAINT "FK_8d62128e1fd00b28210435d0a33" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_character_rewards" ADD CONSTRAINT "FK_56123746ef8bbdb137ac6c268ae" FOREIGN KEY ("character_reward_id") REFERENCES "character_rewards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "character_rewards" ADD CONSTRAINT "FK_1bbf4735f7f342df2bf1371d7ad" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_characters" ADD CONSTRAINT "FK_ce5db496e6d78d4f71036db2c0f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_characters" ADD CONSTRAINT "FK_7e55d7be06ffd0ec23dd58934e6" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_extra_rewards" ADD CONSTRAINT "FK_cf295250a04b2b0fae648c00bed" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_transactions" ADD CONSTRAINT "FK_7f43ef713235c4c16e4bda96ca8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_transactions" DROP CONSTRAINT "FK_7f43ef713235c4c16e4bda96ca8"`);
    await queryRunner.query(`ALTER TABLE "user_extra_rewards" DROP CONSTRAINT "FK_cf295250a04b2b0fae648c00bed"`);
    await queryRunner.query(`ALTER TABLE "user_characters" DROP CONSTRAINT "FK_7e55d7be06ffd0ec23dd58934e6"`);
    await queryRunner.query(`ALTER TABLE "user_characters" DROP CONSTRAINT "FK_ce5db496e6d78d4f71036db2c0f"`);
    await queryRunner.query(`ALTER TABLE "character_rewards" DROP CONSTRAINT "FK_1bbf4735f7f342df2bf1371d7ad"`);
    await queryRunner.query(`ALTER TABLE "user_character_rewards" DROP CONSTRAINT "FK_56123746ef8bbdb137ac6c268ae"`);
    await queryRunner.query(`ALTER TABLE "user_character_rewards" DROP CONSTRAINT "FK_8d62128e1fd00b28210435d0a33"`);
    await queryRunner.query(`ALTER TABLE "user_question_histories" DROP CONSTRAINT "FK_69d784e587d789a272e3d387e80"`);
    await queryRunner.query(`ALTER TABLE "user_question_histories" DROP CONSTRAINT "FK_d3ea7d957afee1d4e21d65c326f"`);
    await queryRunner.query(`ALTER TABLE "user_question_histories" DROP CONSTRAINT "FK_4ffe57001cf6a8a5e253fd1977d"`);
    await queryRunner.query(`ALTER TABLE "betting_rooms" DROP CONSTRAINT "FK_f27b096320b27b88ee7bc17ee5a"`);
    await queryRunner.query(`ALTER TABLE "betting_rooms" DROP CONSTRAINT "FK_919294912822f1114ef6a636685"`);
    await queryRunner.query(`ALTER TABLE "betting_room_characters" DROP CONSTRAINT "FK_9773aacac65b387225c083f1062"`);
    await queryRunner.query(`ALTER TABLE "betting_room_characters" DROP CONSTRAINT "FK_34228f23836e51d6b07b57795b7"`);
    await queryRunner.query(`ALTER TABLE "betting_room_users" DROP CONSTRAINT "FK_b66eb89554272c4dd4cf671c652"`);
    await queryRunner.query(`ALTER TABLE "betting_room_users" DROP CONSTRAINT "FK_e168296661a54aef394022e0ad4"`);
    await queryRunner.query(`ALTER TABLE "character_emotions" DROP CONSTRAINT "FK_8c9bfd9b0bc5624cc0af31aaf9a"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "user_transactions"`);
    await queryRunner.query(`DROP TABLE "user_extra_rewards"`);
    await queryRunner.query(`DROP TABLE "user_characters"`);
    await queryRunner.query(`DROP TABLE "characters"`);
    await queryRunner.query(`DROP TABLE "character_rewards"`);
    await queryRunner.query(`DROP TABLE "user_character_rewards"`);
    await queryRunner.query(`DROP TABLE "user_question_histories"`);
    await queryRunner.query(`DROP TABLE "betting_rooms"`);
    await queryRunner.query(`DROP TABLE "betting_room_characters"`);
    await queryRunner.query(`DROP TABLE "betting_room_users"`);
    await queryRunner.query(`DROP TABLE "character_emotions"`);
  }
}
