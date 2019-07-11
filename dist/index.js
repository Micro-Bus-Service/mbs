"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
// No need to specify type.
// Typescript can guess it is a number 
// because of the initial value (9000).
const port = 9000;
// Instanciate a new Server
const server = new server_1.default(port);
server.start();
