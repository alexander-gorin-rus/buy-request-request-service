import { MigrationInterface, QueryRunner } from 'typeorm';

export class RequestAddColumn1647587609323 implements MigrationInterface {
  name = 'RequestAddColumn1647587609323';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "request" ADD "products" character varying array`,
    );
    await queryRunner.query(
      `ALTER TABLE "request" ADD "isDraft" boolean NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "isDraft"`);
    await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "products"`);
  }
}
