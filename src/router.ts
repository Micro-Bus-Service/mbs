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

  private controllers: {[name: string]: object} = {}

  /** 
   * Router's constructor. 
   */
  constructor(app:Application){
    this.app = app;
    this.instanciateControllers();

    this.getRoutes();
  }

  private instanciateControllers() {
    this.controllers['registerController'] = new registerController(this.app);
  }

  private getRoutes(): void {
    // route for GET /
    // returns a string to the client
    this.app.get('/', (request: Request, response: Response) => {
      response.send("Hello user");
    });

    // route for POST /services
    // Register service to the Microservice Bus
    this.app.post('/services', (request: Request, response: Response) => {
      const controller = this.controllers['registerController'] as registerController;
      controller.register(request, response);
    })

    // route for DELETE /services/{serviceName}/version/{version}/nodes/{ip}/{port}
    // Unregister service from the Microservice Bus
    this.app.delete('/services/{serviceId}', (request: Request, response: Response) => {
      
    })

    // route for GET /services/{serviceName}/version/{version}
    // Query service from the Microservice Bus
    this.app.get('/services/{serviceName}/version/{version}', (request: Request, response: Response) => {
      
    })
  }
}
