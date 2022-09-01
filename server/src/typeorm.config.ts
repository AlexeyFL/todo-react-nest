import { join } from 'path';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

const configService = new ConfigService();

config();

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB'),
  entities: [join(__dirname, 'entities/*{.ts, .js}')],
  migrations: [join(__dirname, 'migrations/*{.ts, .js}')],
  synchronize: true,
});
