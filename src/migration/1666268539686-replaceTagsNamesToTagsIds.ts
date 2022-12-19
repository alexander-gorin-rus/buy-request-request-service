import { MigrationInterface, QueryRunner } from 'typeorm';

export class replaceTagsNamesToTagsIds1666268539686
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION dblink;`);

    const tags = await queryRunner.query(
      `SELECT * FROM dblink('dbname=product_service', 'select id, name from public.tag tags') tags (id uuid, name text)`,
    );
    const requests = await queryRunner.query(`SELECT * FROM public.request`);

    for (const request of requests) {
      const newTags = tags.filter((tag) => request.tags.includes(tag.name));
      await queryRunner.query(
        `UPDATE public.request SET tags='{${newTags.map(
          (tag) => tag.id,
        )}}' WHERE id='${request.id}'`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const tags = await queryRunner.query(
      `SELECT * FROM dblink('dbname=product_service', 'select id, name from public.tag tags') tags (id uuid, name text)`,
    );
    const requests = await queryRunner.query(`SELECT * FROM public.request`);

    for (const request of requests) {
      const newTags = tags.filter((tag) => request.tags.includes(tag.id));
      await queryRunner.query(
        `UPDATE public.request SET tags='{${newTags.map(
          (tag) => tag.name,
        )}}' WHERE id='${request.id}'`,
      );
    }

    await queryRunner.query(`DROP EXTENSION dblink;`);
  }
}
