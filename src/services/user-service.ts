import { Pool } from 'pg';
import { DatabaseConnection } from '../commons/database/connection';

interface User {
    id: number;
    name: string;
    email: string;
}

export default class UserService {
    private pool: Pool;

    constructor() {
        this.pool = DatabaseConnection.getInstance();
    }

    async getAllUsers(): Promise<User[]> {
        const client = await this.pool.connect();
        try {
            const result = await client.query('SELECT * FROM users');
            return result.rows;
        } finally {
            client.release();
        }
    }

    async createUser(name: string, email: string): Promise<User> {
        const client = await this.pool.connect();
        try {
            const result = await client.query(
                'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
                [name, email]
            );
            return result.rows[0];
        } finally {
            client.release();
        }
    }

    async deleteUser(id: number): Promise<void> {
        const client = await this.pool.connect();
        try {
            await client.query('DELETE FROM users WHERE id = $1', [id]);
        } finally {
            client.release();
        }
    }
}
