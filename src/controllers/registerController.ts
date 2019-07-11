/// <reference types="../types/Request" />

import { Request, Response, Application } from 'express';

export default class registerController {
  private app: Application;

  constructor (app: Application) {
    this.app = app;
  }

  public register (request: Request, response: Response) {
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
        response.json({success: true});
      }
  }
}