/// <reference types="./types/Request" />
import { Request, Response, Application } from 'express';
import registerController from './controllers/registerController';

/**
 * Define all routes for this application
 */
export default class Router {
  /**
   * Instance of server's application
   * @var {Application} app
   */
  private app: Application; 

  /** 
   * Router's constructor. 
   */
  constructor(app:Application){
    this.app = app;

    this.getRoutes();
  }

  private getRoutes(): void {
    // route for GET /
    // returns a string to the client
    this.app.get('/', (request: Request, response: Response) => {
      response.send("Hello user");
    });

    this.app.post('/api/microservices/v1/services', (request: Request, response: Response) => {
      const controller = new registerController(this.app);
      controller.register(request, response);
    })
  }
}
