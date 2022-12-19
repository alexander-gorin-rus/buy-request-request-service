import { MigrationInterface, QueryRunner } from 'typeorm';

export class addDeleteField1661935210536 implements MigrationInterface {
  name = 'addDeleteField1661935210536';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "request" ADD "delete" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "delete"`);
  }
}
