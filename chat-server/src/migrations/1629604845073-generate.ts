import {MigrationInterface, QueryRunner} from "typeorm";

export class generate1629604845073 implements MigrationInterface {
    name = 'generate1629604845073'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`chat\`.\`user\` (\`id\` int NOT NULL AUTO_INCREMENT, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`chat\`.\`user\``);
    }

}
