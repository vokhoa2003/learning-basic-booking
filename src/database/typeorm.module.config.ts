import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

export const  TypeOrmModuleConfig : TypeOrmModuleOptions = {
  // type: 'mysql',
  // host: 'localhost',
  // port: 3306,
  // username: 'test',
  // password: '123456',
  // database: 'nestjs_test',
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
};