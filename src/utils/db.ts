import mysql from 'mysql';
import logger from './logger';

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    logger.error(err);
    throw err;
  }
  logger.info('Connected to the db');
});

export default db
