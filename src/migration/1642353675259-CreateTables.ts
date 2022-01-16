import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTables1642353675259 implements MigrationInterface {
    name = 'CreateTables1642353675259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "column_model" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "order" integer NOT NULL, "boardId" uuid, CONSTRAINT "PK_f70f8c154b33656159972603437" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "board_model" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, CONSTRAINT "PK_71cebae868bfcdc87f037c3bf22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task_model" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "order" integer NOT NULL, "description" character varying NOT NULL, "columnId" character varying, "userId" uuid, "boardId" uuid, CONSTRAINT "PK_fe623649412a3fdad5899896d9c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_model" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_7d6bfa71f4d6a1fa0af1f688327" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "column_model" ADD CONSTRAINT "FK_d8c0953f182130fa51ffb461e79" FOREIGN KEY ("boardId") REFERENCES "board_model"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_model" ADD CONSTRAINT "FK_e9446323421abd86f311220e288" FOREIGN KEY ("userId") REFERENCES "user_model"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_model" ADD CONSTRAINT "FK_6ce09a705382729b188e6145363" FOREIGN KEY ("boardId") REFERENCES "board_model"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_model" DROP CONSTRAINT "FK_6ce09a705382729b188e6145363"`);
        await queryRunner.query(`ALTER TABLE "task_model" DROP CONSTRAINT "FK_e9446323421abd86f311220e288"`);
        await queryRunner.query(`ALTER TABLE "column_model" DROP CONSTRAINT "FK_d8c0953f182130fa51ffb461e79"`);
        await queryRunner.query(`DROP TABLE "user_model"`);
        await queryRunner.query(`DROP TABLE "task_model"`);
        await queryRunner.query(`DROP TABLE "board_model"`);
        await queryRunner.query(`DROP TABLE "column_model"`);
    }

}
