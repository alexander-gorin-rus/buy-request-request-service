import { MigrationInterface, QueryRunner } from 'typeorm';

export class truncateRequests1656485228258 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE "request"`);
  }
  down(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
