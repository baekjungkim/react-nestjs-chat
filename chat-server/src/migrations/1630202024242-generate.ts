import {MigrationInterface, QueryRunner} from "typeorm";

export class generate1630202024242 implements MigrationInterface {
    name = 'generate1630202024242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chat\`.\`chat\` CHANGE \`msg\` \`msg\` text NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`chat\`.\`chat\` CHANGE \`msgType\` \`msgType\` varchar(255) NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chat\`.\`chat\` CHANGE \`msgType\` \`msgType\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`chat\`.\`chat\` CHANGE \`msg\` \`msg\` text NOT NULL`);
    }

}
