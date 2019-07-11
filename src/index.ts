import Server from "./server";

// No need to specify type.
// Typescript can guess it is a number 
// because of the initial value (9000).
const port = 9000;

// Instanciate a new Server
const server = new Server(port);

server.start();