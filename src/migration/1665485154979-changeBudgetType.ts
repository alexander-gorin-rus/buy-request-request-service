import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeBudgetType1665485154979 implements MigrationInterface {
  name = 'changeBudgetType1665485154979';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "budget"`);
    await queryRunner.query(
      `ALTER TABLE "request" ADD "budget" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "budget"`);
    await queryRunner.query(
      `ALTER TABLE "request" ADD "budget" integer array NOT NULL`,
    );
  }
}
