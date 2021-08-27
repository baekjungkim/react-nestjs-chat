import {MigrationInterface, QueryRunner} from "typeorm";

export class generate1630071282742 implements MigrationInterface {
    name = 'generate1630071282742'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chat\`.\`user\` ADD \`profileImage\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chat\`.\`user\` DROP COLUMN \`profileImage\``);
    }

}
