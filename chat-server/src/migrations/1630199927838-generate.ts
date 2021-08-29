import {MigrationInterface, QueryRunner} from "typeorm";

export class generate1630199927838 implements MigrationInterface {
    name = 'generate1630199927838'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chat\`.\`chat\` ADD \`msg\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`chat\`.\`chat\` ADD \`msgType\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chat\`.\`chat\` DROP COLUMN \`msgType\``);
        await queryRunner.query(`ALTER TABLE \`chat\`.\`chat\` DROP COLUMN \`msg\``);
    }

}
