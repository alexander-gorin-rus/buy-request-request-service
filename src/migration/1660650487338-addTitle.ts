import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTitle1660650487338 implements MigrationInterface {
  name = 'addTitle1660650487338';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "request" ADD "title" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" ALTER COLUMN "title" DROP DEFAULT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "title"`);
  }
}
