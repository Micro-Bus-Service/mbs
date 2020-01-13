import { Db } from "@/types/Database";

import logger from "./logger";

import MessageType from "../models/MessageType";
import Service from "../models/Service";

import path from "path";
import { Sequelize } from "sequelize";

const p = path.resolve(process.cwd(), ".env");

require("dotenv").config({ path: p });

const dialect =
  (process.env.DB_ENGINE as
    | "sqlite"
    | "mysql"
    | "postgres"
    | "mariadb"
    | "mssql"
    | undefined) || "mysql";
const host = process.env.DB_HOST || undefined;
const port = process.env.DB_PORT
  ? parseInt(process.env.DB_PORT, 10)
  : undefined;
const name = process.env.DB_NAME || "mbs";
const storage = process.env.DB_PATH || undefined;
const user = process.env.DB_USER || "";
const password = process.env.DB_PASSWORD;

export const sequelize = new Sequelize(name, user, password, {
  dialect,
  host,
  logging: (...msg) => {
    logger.debug(msg);
  },
  pool: {
    acquire: 20000,
    idle: 20000,
    max: 5,
    min: 0,
  },
  port,
  retry: {
    match: [/SQLITE_BUSY/],
    max: 5,
  },
  storage,
});

const db: Db = {
  messageType: MessageType(sequelize),
  sequelize,
  service: Service(sequelize),
};

db.service.belongsToMany(db.messageType, {
  foreignKey: "serviceId",
  through: "messagetypeservice",
});
db.messageType.belongsToMany(db.service, {
  foreignKey: "messageTypeId",
  through: "messagetypeservice",
});

export default db;
