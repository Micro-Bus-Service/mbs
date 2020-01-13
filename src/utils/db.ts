import { Sequelize } from 'sequelize';
import logger from './logger';
import MessageType from '../models/MessageType';
import Service from '../models/Service';
import { db } from '@/types/Database'; 

import path from 'path';

const p = path.resolve(process.cwd(), '.env');
require('dotenv').config({path: p});

const dialect = process.env.DB_ENGINE as "sqlite" | "mysql" | "postgres" | "mariadb" | "mssql" | undefined || 'mysql';
const host = process.env.DB_HOST || undefined;
const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined;
const name = process.env.DB_NAME || 'mbs';
const storage = process.env.DB_PATH || undefined;
const user = process.env.DB_USER || '';
const password = process.env.DB_PASSWORD;

export const sequelize =  new Sequelize(name, user, password, {
  dialect,
  host,
  port,
  storage,
  logging: (...msg) => {
    logger.debug(msg);
  },
  retry: {
    match: [
      /SQLITE_BUSY/,
    ],
    max: 5
  },
  pool: {
    max: 5,
    min: 0,
    idle: 20000,
    acquire: 20000
  }
});

const db: db = {
  sequelize,
  messageType: MessageType(sequelize),
  service: Service(sequelize),
};

db.service.belongsToMany(db.messageType, {
  through: 'messagetypeservice',
  foreignKey: 'serviceId'
});
db.messageType.belongsToMany(db.service, {
  through: 'messagetypeservice',
  foreignKey: 'messageTypeId'
});

export default db;
