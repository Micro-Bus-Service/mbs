import 'module-alias/register';
import Server from "@/utils/server";

const port = 9000;

require('dotenv').config();
require('@/utils/db');

global.serviceName = "bus";
global.version = "v" + process.env.npm_package_version;

// Instanciate a new Server
const server = new Server(port);

server.start();
