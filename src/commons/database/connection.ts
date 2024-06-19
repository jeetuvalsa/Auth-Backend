import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export class DatabaseConnection {
    private static pool: Pool;

    static getInstance(): Pool {
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
