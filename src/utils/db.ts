import { Sequelize } from 'sequelize';

const dialect = process.env.DB_ENGINE as "sqlite" | "mysql" | "postgres" | "mariadb" | "mssql" | undefined || 'mysql';
const host = process.env.DB_HOST || undefined;
const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined;
const name = process.env.DB_NAME || 'mbs';
const storage = process.env.DB_PATH || undefined;
const user = process.env.DB_USER || '';
const password = process.env.DB_PASSWORD;

export default new Sequelize(name, user, password, {
  dialect,
  host,
  port,
  storage
});
