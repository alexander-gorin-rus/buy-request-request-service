import { MigrationInterface, QueryRunner } from 'typeorm';

export class setReadyForAnalagoues1654520801700 implements MigrationInterface {
  name = 'setReadyForAnalagoues1654520801700';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "request" ADD "readyForAnalogues" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "request" DROP COLUMN "readyForAnalogues"`,
    );
  }
}
