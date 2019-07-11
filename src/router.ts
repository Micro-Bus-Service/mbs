/// <reference types="./types/Request" />
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

    this.app.post('/api/microservices/v1/services', (request: Request, response: Response) => {
      console.log(request.body);
      const data = request.body as RequestRegister;
      let errors: string[] = [];

      if (data !== undefined) {
        if (data.serviceName === undefined) {
          errors.push('No servicename defined');
        }
  
        if (data.version === undefined) {
          errors.push('No version defined');
        }
  
        if (data.url === undefined) {
          errors.push('No url defined');
        }
  
        if (data.protocol === undefined) {
          errors.push('No protocol defined');
        }
  
        if (data.path === undefined) {
          errors.push('No path defined');
        }
      } else {
        errors.push('Problem with request : no body')
      }

      if (errors.length > 0) {
        response.status(422);
        response.json(errors);
      } else {

        response.status(201);
        response.json(errors);
      }
    })
  }
}
