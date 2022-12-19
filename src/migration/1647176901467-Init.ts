import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1647176901467 implements MigrationInterface {
  name = 'Init1647176901467';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "request" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "description" character varying NOT NULL, "budget" integer array NOT NULL, "tags" character varying array NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_167d324701e6867f189aed52e18" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_38554ade327a061ba620eee948" ON "request" ("userId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_38554ade327a061ba620eee948"`,
    );
    await queryRunner.query(`DROP TABLE "request"`);
  }
}
