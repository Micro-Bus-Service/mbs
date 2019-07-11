"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
/**
 * Allows to start an Express server
 */
class Server {
    /**
     * Server's constructor.
     * It takes a number as parameter.
     * It cannot take any other type else the project won't compile
     */
    constructor(port) {
        this.port = port;
    }
    /**
     * Starts the server and does not return anything
     */
    start() {
        const app = express_1.default();
        new router_1.default(app);
        // Server is listening to port defined when Server was initiated
        app.listen(this.port, () => {
            console.log("Server is running on port " + this.port);
        });
    }
}
exports.default = Server;
