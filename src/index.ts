import Server from "./server";

const port = 9000;

global.serviceName = "bus";
global.version = "v1";

// Instanciate a new Server
const server = new Server(port);

server.start();