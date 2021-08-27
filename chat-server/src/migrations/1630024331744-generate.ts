import {MigrationInterface, QueryRunner} from "typeorm";

export class generate1630024331744 implements MigrationInterface {
    name = 'generate1630024331744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`chat\`.\`message\` (\`id\` int NOT NULL AUTO_INCREMENT, \`msg\` varchar(255) NOT NULL, \`msgType\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, \`chatId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`chat\`.\`check\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`messageId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`chat\`.\`join_chat\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, \`chatId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`chat\`.\`chat\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`chat\`.\`user\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`chat\`.\`message\` ADD CONSTRAINT \`FK_446251f8ceb2132af01b68eb593\` FOREIGN KEY (\`userId\`) REFERENCES \`chat\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chat\`.\`message\` ADD CONSTRAINT \`FK_619bc7b78eba833d2044153bacc\` FOREIGN KEY (\`chatId\`) REFERENCES \`chat\`.\`chat\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chat\`.\`check\` ADD CONSTRAINT \`FK_6ee43c86ea29d3c49d4393a7df1\` FOREIGN KEY (\`messageId\`) REFERENCES \`chat\`.\`message\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chat\`.\`check\` ADD CONSTRAINT \`FK_918560179c0e9aeb24381534b7e\` FOREIGN KEY (\`userId\`) REFERENCES \`chat\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chat\`.\`join_chat\` ADD CONSTRAINT \`FK_25cd69f710f312e7cce223e8144\` FOREIGN KEY (\`userId\`) REFERENCES \`chat\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chat\`.\`join_chat\` ADD CONSTRAINT \`FK_84a9fd390a00b5def73e134f821\` FOREIGN KEY (\`chatId\`) REFERENCES \`chat\`.\`chat\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`chat\`.\`chat\` ADD CONSTRAINT \`FK_52af74c7484586ef4bdfd8e4dbb\` FOREIGN KEY (\`userId\`) REFERENCES \`chat\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`chat\`.\`chat\` DROP FOREIGN KEY \`FK_52af74c7484586ef4bdfd8e4dbb\``);
        await queryRunner.query(`ALTER TABLE \`chat\`.\`join_chat\` DROP FOREIGN KEY \`FK_84a9fd390a00b5def73e134f821\``);
        await queryRunner.query(`ALTER TABLE \`chat\`.\`join_chat\` DROP FOREIGN KEY \`FK_25cd69f710f312e7cce223e8144\``);
        await queryRunner.query(`ALTER TABLE \`chat\`.\`check\` DROP FOREIGN KEY \`FK_918560179c0e9aeb24381534b7e\``);
        await queryRunner.query(`ALTER TABLE \`chat\`.\`check\` DROP FOREIGN KEY \`FK_6ee43c86ea29d3c49d4393a7df1\``);
        await queryRunner.query(`ALTER TABLE \`chat\`.\`message\` DROP FOREIGN KEY \`FK_619bc7b78eba833d2044153bacc\``);
        await queryRunner.query(`ALTER TABLE \`chat\`.\`message\` DROP FOREIGN KEY \`FK_446251f8ceb2132af01b68eb593\``);
        await queryRunner.query(`ALTER TABLE \`chat\`.\`user\` DROP COLUMN \`name\``);
        await queryRunner.query(`DROP TABLE \`chat\`.\`chat\``);
        await queryRunner.query(`DROP TABLE \`chat\`.\`join_chat\``);
        await queryRunner.query(`DROP TABLE \`chat\`.\`check\``);
        await queryRunner.query(`DROP TABLE \`chat\`.\`message\``);
    }

}
