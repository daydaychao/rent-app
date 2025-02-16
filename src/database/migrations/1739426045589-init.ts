import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1739426045589 implements MigrationInterface {
  name = "Init1739426045589";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`scooter\` ADD \`license_plate\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`scooter\` DROP COLUMN \`license_plate\``,
    );
  }
}
