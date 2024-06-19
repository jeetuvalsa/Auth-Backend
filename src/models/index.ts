import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import dotenv from 'dotenv';

dotenv.config();

const database = process.env.DB_NAME || 'postgres';
const username = process.env.DB_USER || 'root';
const password = process.env.DB_PASSWORD || '1234';
const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432;

let sequelize: Sequelize;

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
  });
} else {
  sequelize = new Sequelize(database, username, password, {
    host,
    port,
    dialect: 'postgres',
  });
}

const db: any = {
  sequelize,
  Sequelize,
};

// Import your models here
db.User = UserFactory(sequelize);

export { db };
