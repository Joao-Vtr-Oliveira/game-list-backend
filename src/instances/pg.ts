import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const postgresDB = process.env.POSTGRES_DB as string;
const postgresUser = process.env.POSTGRES_USER as string;
const postgresPassword = process.env.POSTGRES_PASSWORD as string;
const postgresHost = process.env.POSTGRES_HOST as string;
const postgresPort = 5432;


export const sequelize = new Sequelize(
  postgresDB,
  postgresUser,
  postgresPassword,
  {
    host: postgresHost || "localhost",
    dialect: 'postgres',
    port: postgresPort,
  }
); 