import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1759808902094 implements MigrationInterface {
    name = ' $npmConfigName1759808902094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`booking\` (\`booking_id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`option_id\` int NOT NULL, \`quantity\` int NOT NULL DEFAULT '1', \`total_price\` decimal(10,2) NOT NULL, \`status\` enum ('pending', 'confirmed', 'cancelled') NOT NULL DEFAULT 'pending', \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`booking_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`service_option\` (\`id\` int NOT NULL AUTO_INCREMENT, \`service_id\` int NOT NULL, \`option_name\` varchar(150) NOT NULL, \`description\` text NULL, \`price\` decimal(10,2) NOT NULL, \`available_slot\` int NOT NULL, \`create_by\` int NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`service\` (\`id\` int NOT NULL AUTO_INCREMENT, \`service\` varchar(255) NOT NULL, \`description\` text NULL, \`create_by\` int NOT NULL, \`create_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`update_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`refresh_token\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`refresh_token\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`create_at\` \`create_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`update_at\` \`update_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`create_at\` \`create_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`update_at\` \`update_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`booking\` ADD CONSTRAINT \`FK_276896d1a1a30be6de9d7d43f53\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`booking\` ADD CONSTRAINT \`FK_2a634c9fc53d23259280c107a92\` FOREIGN KEY (\`option_id\`) REFERENCES \`service_option\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`service_option\` ADD CONSTRAINT \`FK_bb3b09010f490f34dc94944457f\` FOREIGN KEY (\`service_id\`) REFERENCES \`service\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`service_option\` ADD CONSTRAINT \`FK_5c146462b162d08278f156bde7d\` FOREIGN KEY (\`create_by\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`service\` ADD CONSTRAINT \`FK_ccbee0aa9ad591ce74809433d5f\` FOREIGN KEY (\`create_by\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`service\` DROP FOREIGN KEY \`FK_ccbee0aa9ad591ce74809433d5f\``);
        await queryRunner.query(`ALTER TABLE \`service_option\` DROP FOREIGN KEY \`FK_5c146462b162d08278f156bde7d\``);
        await queryRunner.query(`ALTER TABLE \`service_option\` DROP FOREIGN KEY \`FK_bb3b09010f490f34dc94944457f\``);
        await queryRunner.query(`ALTER TABLE \`booking\` DROP FOREIGN KEY \`FK_2a634c9fc53d23259280c107a92\``);
        await queryRunner.query(`ALTER TABLE \`booking\` DROP FOREIGN KEY \`FK_276896d1a1a30be6de9d7d43f53\``);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`update_at\` \`update_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`create_at\` \`create_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`update_at\` \`update_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`create_at\` \`create_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`refresh_token\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`refresh_token\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP TABLE \`service\``);
        await queryRunner.query(`DROP TABLE \`service_option\``);
        await queryRunner.query(`DROP TABLE \`booking\``);
    }

}
