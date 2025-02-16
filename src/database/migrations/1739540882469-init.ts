import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1739540882469 implements MigrationInterface {
    name = 'Init1739540882469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_4ab2df0a57a74fdf904e0e2708\` (\`account\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_4ab2df0a57a74fdf904e0e2708\``);
    }

}
