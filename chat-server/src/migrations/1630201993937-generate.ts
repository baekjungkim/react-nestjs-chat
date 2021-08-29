import {MigrationInterface, QueryRunner} from "typeorm";

export class generate1630201993937 implements MigrationInterface {
    name = 'generate1630201993937'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chat\`.\`chat\` CHANGE \`msg\` \`msg\` text NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`chat\`.\`chat\` CHANGE \`msgType\` \`msgType\` varchar(255) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chat\`.\`chat\` CHANGE \`msgType\` \`msgType\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`chat\`.\`chat\` CHANGE \`msg\` \`msg\` text NOT NULL`);
    }

}
