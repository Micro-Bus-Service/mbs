import { Request, Response, Application } from 'express';

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
  }
}