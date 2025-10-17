import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1760588299121 implements MigrationInterface {
    name = ' $npmConfigName1760588299121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`FK_276896d1a1a30be6de9d7d43f53\` ON \`booking\``);
        await queryRunner.query(`DROP INDEX \`FK_2a634c9fc53d23259280c107a92\` ON \`booking\``);
        await queryRunner.query(`ALTER TABLE \`booking\` CHANGE \`user_id\` \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`booking\` CHANGE \`option_id\` \`option_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`booking\` CHANGE \`payment_method\` \`payment_method\` varchar(255) NULL`);
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
        await queryRunner.query(`ALTER TABLE \`booking\` ADD CONSTRAINT \`FK_276896d1a1a30be6de9d7d43f53\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`booking\` ADD CONSTRAINT \`FK_2a634c9fc53d23259280c107a92\` FOREIGN KEY (\`option_id\`) REFERENCES \`service_option\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`service_option\` ADD CONSTRAINT \`FK_5c146462b162d08278f156bde7d\` FOREIGN KEY (\`create_by\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`service\` ADD CONSTRAINT \`FK_ccbee0aa9ad591ce74809433d5f\` FOREIGN KEY (\`create_by\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`service\` DROP FOREIGN KEY \`FK_ccbee0aa9ad591ce74809433d5f\``);
        await queryRunner.query(`ALTER TABLE \`service_option\` DROP FOREIGN KEY \`FK_5c146462b162d08278f156bde7d\``);
        await queryRunner.query(`ALTER TABLE \`booking\` DROP FOREIGN KEY \`FK_2a634c9fc53d23259280c107a92\``);
        await queryRunner.query(`ALTER TABLE \`booking\` DROP FOREIGN KEY \`FK_276896d1a1a30be6de9d7d43f53\``);
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
        await queryRunner.query(`ALTER TABLE \`booking\` CHANGE \`payment_method\` \`payment_method\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`booking\` CHANGE \`option_id\` \`option_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`booking\` CHANGE \`user_id\` \`user_id\` int NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`FK_2a634c9fc53d23259280c107a92\` ON \`booking\` (\`option_id\`)`);
        await queryRunner.query(`CREATE INDEX \`FK_276896d1a1a30be6de9d7d43f53\` ON \`booking\` (\`user_id\`)`);
    }

}
