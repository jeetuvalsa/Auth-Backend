import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;
type PoolType = typeof Pool;

export class DatabaseConnection {
  private static pool: InstanceType<PoolType>;

  static getInstance(): InstanceType<PoolType> {
    if (!DatabaseConnection.pool) {
      DatabaseConnection.pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT),
      });
    }
    return DatabaseConnection.pool;
  }
}
