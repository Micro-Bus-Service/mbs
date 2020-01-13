import { Sequelize, Model } from "sequelize/types";
import { MessageType } from "../models/MessageType";
import { Service } from "../models/Service";

export interface db {
  sequelize: Sequelize,
  messageType: typeof MessageType,
  service: typeof Service
}