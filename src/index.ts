import "module-alias/register";
// tslint:disable-next-line: ordered-imports
import Server from "@/utils/server";
import db from "./utils/db";

const port = 9000;

db.sequelize.sync();

global.serviceName = "bus";
global.version = "v" + process.env.npm_package_version;

// Instanciate a new Server
const server = new Server(port);

server.start();
