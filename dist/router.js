"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Define all routes for this application
 */
class Router {
    /**
     * Router's constructor.
     */
    constructor(app) {
        this.app = app;
        this.getRoutes();
    }
    getRoutes() {
        // route for GET /
        // returns a string to the client
        this.app.get('/', (request, response) => {
            response.send("Hello user");
        });
    }
}
exports.default = Router;
