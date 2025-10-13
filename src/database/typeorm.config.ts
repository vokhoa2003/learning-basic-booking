import { DataSource } from 'typeorm';
import 'dotenv/config';

const AppDataSource = new DataSource({
  // type: 'mysql', // hoặc 'postgres'
  // host: 'localhost',
  // port: 3306, // postgres thì 5432
  // username: 'test',
  // password: '123456',
  // database: 'nestjs_test',
  type: process.env.DB_TYPE as any, // 'mysql' | 'postgres'
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false, // ❌ luôn false khi dùng migration
});

export default AppDataSource;
