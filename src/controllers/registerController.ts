/// <reference types="../types/Request" />

import { Request, Response, Application } from 'express';
import Services from '../data/services';
const uuidv4 = require('uuid/v4');

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
  
        if (data.ip === undefined) {
          errors.push('No ip defined');
        }
  
        if (data.port === undefined) {
          errors.push('No port defined');
        }
  
        if (data.url === undefined) {
          errors.push('No url defined');
        }
        if (data.messageType === undefined) {
          errors.push('No message type defined');
        }
      } else {
        errors.push('Problem with request : no body')
      }

      if (errors.length > 0) {
        response.status(422);
        response.json(errors);
      } else {
        data.uuid = uuidv4();
        const isAdded = Services.add(data);
        if (isAdded) {
          response.status(201);
          response.json({
            serviceName: global.serviceName,
            version: global.version,
            uuid: data.uuid
          });
        } else {
          errors.push('Problem when adding the service, maybe he is already added')
          response.status(422);
          response.json(errors);
        }
      }
  }
}