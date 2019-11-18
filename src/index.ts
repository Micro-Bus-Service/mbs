import Server from "@/utils/server";

import pjson from "../package.json";
import logger from "./utils/logger.js";

const port = 9000;

global.serviceName = "bus";
global.version = "v" + pjson.version;

logger.info("Start MBS in version " + global.version);

// Instanciate a new Server
const server = new Server(port);

server.start();
