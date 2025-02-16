import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1739433611751 implements MigrationInterface {
  name = "Init1739433611751";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`scooter\` CHANGE \`license_plate\` \`license_plate\` varchar(255) NOT NULL COMMENT '車牌號碼'`,
    );
    await queryRunner.query(`ALTER TABLE \`rent\` DROP COLUMN \`start_time\``);
    await queryRunner.query(
      `ALTER TABLE \`rent\` ADD \`start_time\` timestamp NOT NULL COMMENT '開始租借時間'`,
    );
    await queryRunner.query(`ALTER TABLE \`rent\` DROP COLUMN \`end_time\``);
    await queryRunner.query(
      `ALTER TABLE \`rent\` ADD \`end_time\` timestamp NULL COMMENT '結束租借時間'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`rent\` DROP COLUMN \`end_time\``);
    await queryRunner.query(
      `ALTER TABLE \`rent\` ADD \`end_time\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`rent\` DROP COLUMN \`start_time\``);
    await queryRunner.query(
      `ALTER TABLE \`rent\` ADD \`start_time\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`scooter\` CHANGE \`license_plate\` \`license_plate\` varchar(255) NOT NULL`,
    );
  }
}
