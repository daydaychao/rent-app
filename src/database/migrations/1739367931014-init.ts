import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1739367931014 implements MigrationInterface {
  name = "Init1739367931014";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`scooter\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT '流水號 id', \`created_at\` datetime(6) NOT NULL COMMENT '建立日期' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL COMMENT '更新日期' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL COMMENT '刪除日期', \`status\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`rent\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT '流水號 id', \`created_at\` datetime(6) NOT NULL COMMENT '建立日期' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL COMMENT '更新日期' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL COMMENT '刪除日期', \`start_time\` varchar(255) NOT NULL, \`end_time\` varchar(255) NOT NULL, \`userId\` int NULL COMMENT '流水號 id', \`scooterId\` int NULL COMMENT '流水號 id', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT '流水號 id', \`created_at\` datetime(6) NOT NULL COMMENT '建立日期' DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL COMMENT '更新日期' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL COMMENT '刪除日期', \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`password2\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rent\` ADD CONSTRAINT \`FK_49296d11229074f058b7274ae2e\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rent\` ADD CONSTRAINT \`FK_9f27603c221180fd09baadd83e8\` FOREIGN KEY (\`scooterId\`) REFERENCES \`scooter\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`rent\` DROP FOREIGN KEY \`FK_9f27603c221180fd09baadd83e8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rent\` DROP FOREIGN KEY \`FK_49296d11229074f058b7274ae2e\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`rent\``);
    await queryRunner.query(`DROP TABLE \`scooter\``);
  }
}
