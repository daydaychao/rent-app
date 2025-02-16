import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1739540804161 implements MigrationInterface {
    name = 'Init1739540804161'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password2\` \`account\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`account\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`account\` varchar(255) NOT NULL COMMENT '帳號'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NOT NULL COMMENT '密碼'`);
        await queryRunner.query(`CREATE INDEX \`IDX_6eafbec298c9c42bb049b6cdda\` ON \`rent\` (\`end_time\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_6eafbec298c9c42bb049b6cdda\` ON \`rent\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`account\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`account\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`account\` \`password2\` varchar(255) NOT NULL`);
    }

}
