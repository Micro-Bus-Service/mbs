import { Sequelize } from "sequelize/types";

import { MessageType } from "../models/MessageType";
import { Service } from "../models/Service";

export interface Db {
  sequelize: Sequelize;
  messageType: typeof MessageType;
  service: typeof Service;
}
