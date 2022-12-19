import { MigrationInterface, QueryRunner } from 'typeorm';

export class addStatusField1660716536864 implements MigrationInterface {
  name = 'addStatusField1660716536864';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "request" ADD "status" character varying NOT NULL DEFAULT 'IN_PROGRESS'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "status"`);
  }
}
