import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Fazenda } from '@/common/entities/fazenda.entity';
import { Produtor } from '@/common/entities/produtor.entity';
import { Safra } from '@/common/entities/safra.entity';
import dotenv from 'dotenv';

dotenv.config();

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.APP_DB_HOST,
  port: Number(process.env.APP_DB_PORT),
  logging: process.env.APP_DB_LOGGING === 'true' || false,
  username: process.env.APP_DB_USER,
  password: process.env.APP_DB_PASSWORD,
  database: process.env.APP_DB_NAME,
  entities: [Fazenda, Produtor, Safra],
  synchronize: process.env.APP_DB_SYNC ==='true' || false, // Set to false in production
  migrations: ['@common/migrations/*.ts'],
  migrationsRun: process.env.APP_DB_RUN_MIGRATIONS === 'true' || false,
};

export default config;
