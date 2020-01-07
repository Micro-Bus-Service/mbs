import "module-alias/register";
// tslint:disable-next-line: ordered-imports
import Server from "@/utils/server";

// import pjson from "../package.json";

const port = 9000;

global.serviceName = "bus";
global.version = "v" + process.env.npm_package_version;

// Instanciate a new Server
const server = new Server(port);

server.start();
