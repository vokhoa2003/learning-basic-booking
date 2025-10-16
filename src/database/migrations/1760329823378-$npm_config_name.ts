import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1760329823378 implements MigrationInterface {
    name = ' $npmConfigName1760329823378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`booking\` ADD \`payment_method\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`booking\` CHANGE \`status\` \`status\` enum ('pending', 'paid', 'cancelled') NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE \`booking\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`booking\` CHANGE \`updated_at\` \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`service_option\` DROP FOREIGN KEY \`FK_5c146462b162d08278f156bde7d\``);
        await queryRunner.query(`ALTER TABLE \`service_option\` CHANGE \`description\` \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`service_option\` CHANGE \`create_by\` \`create_by\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`service_option\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`service_option\` CHANGE \`updated_at\` \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`service\` DROP FOREIGN KEY \`FK_ccbee0aa9ad591ce74809433d5f\``);
        await queryRunner.query(`ALTER TABLE \`service\` CHANGE \`description\` \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`service\` CHANGE \`create_by\` \`create_by\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`service\` CHANGE \`create_at\` \`create_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`service\` CHANGE \`update_at\` \`update_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`create_at\` \`create_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`update_at\` \`update_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`create_at\` \`create_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`update_at\` \`update_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`service_option\` ADD CONSTRAINT \`FK_5c146462b162d08278f156bde7d\` FOREIGN KEY (\`create_by\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`service\` ADD CONSTRAINT \`FK_ccbee0aa9ad591ce74809433d5f\` FOREIGN KEY (\`create_by\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`service\` DROP FOREIGN KEY \`FK_ccbee0aa9ad591ce74809433d5f\``);
        await queryRunner.query(`ALTER TABLE \`service_option\` DROP FOREIGN KEY \`FK_5c146462b162d08278f156bde7d\``);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`update_at\` \`update_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`create_at\` \`create_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`update_at\` \`update_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`create_at\` \`create_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`service\` CHANGE \`update_at\` \`update_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`service\` CHANGE \`create_at\` \`create_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`service\` CHANGE \`create_by\` \`create_by\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`service\` CHANGE \`description\` \`description\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`service\` ADD CONSTRAINT \`FK_ccbee0aa9ad591ce74809433d5f\` FOREIGN KEY (\`create_by\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`service_option\` CHANGE \`updated_at\` \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`service_option\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`service_option\` CHANGE \`create_by\` \`create_by\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`service_option\` CHANGE \`description\` \`description\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`service_option\` ADD CONSTRAINT \`FK_5c146462b162d08278f156bde7d\` FOREIGN KEY (\`create_by\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`booking\` CHANGE \`updated_at\` \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`booking\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`booking\` CHANGE \`status\` \`status\` enum ('pending', 'confirmed', 'cancelled') NOT NULL DEFAULT ''pending''`);
        await queryRunner.query(`ALTER TABLE \`booking\` DROP COLUMN \`payment_method\``);
    }

}
