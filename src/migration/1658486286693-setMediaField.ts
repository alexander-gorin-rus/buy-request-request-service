import { MigrationInterface, QueryRunner } from 'typeorm';

export class setMediaField1658486286693 implements MigrationInterface {
  name = 'setMediaField1658486286693';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "request" ADD "media" jsonb NOT NULL DEFAULT '[]'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "media"`);
  }
}
