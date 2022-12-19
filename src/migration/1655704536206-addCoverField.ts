import { MigrationInterface, QueryRunner } from 'typeorm';

export class addCoverField1655704536206 implements MigrationInterface {
  name = 'addCoverField1655704536206';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "request" ADD "cover" character varying NOT NULL DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "cover"`);
  }
}
