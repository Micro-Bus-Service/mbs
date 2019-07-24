/// <reference types="../types/Request" />

import { Request, Response, Application } from 'express';
import Services from '../store/Services';

export default class messagesController {
  /**
   * The instance of Express App
   */
  private app: Application;

  constructor (app: Application) {
    this.app = app;
  }

  /**
   * Register Service Controller
   * 
   * @param {Request} request The request
   * @param {Response} response The Response
   */
  public getMessage(request: Request, response: Response) {
    const messageType = request.params.messageType;
    const data = request.body as RequestMessage;
    let errors: string[] = [];

    if (!Services.isListened(messageType)) {
      errors.push('No registered service listens to this messageType');
    }

    if (data !== undefined) {
      if (data.message === undefined) {
        errors.push('No message defined');
      }
      if (data.uuid === undefined) {
        errors.push('No uuid defined');
      } else if (!Services.haveUUID(data.uuid)) {
        errors.push('This uuid isn\'t registered');
      }
    } else {
      errors.push('Problem with request : no body')
    }

    if (errors.length > 0) {
      response.status(422);
      response.json(errors);
    } else {
      response.status(201);
      response.json({
        serviceName: global.serviceName,
        version: global.version,
      });
    }
  }
}