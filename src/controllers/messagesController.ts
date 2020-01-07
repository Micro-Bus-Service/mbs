import Service from "@/entity/Service";
import Services from "@/store/Services";
import { RequestMessage } from "@/types/Request";
import { ServicesInterface } from "@/types/Service";
import logger from "@/utils/logger";
import { Request, Response } from "express";

export default class MessagesController {
  private lastUuid: {[name: string]: string} = {};

  /**
   * Retrieve a message and send it to the corresponding services
   *
   * @param {Request} request The request
   * @param {Response} response The Response
   */
  public async getMessage(request: Request, response: Response) {
    const messageType = request.params.messageType;
    const data = request.body as RequestMessage;
    const errors: string[] = [];

    if (!Services.isListened(messageType)) {
      errors.push("No registered service listens to this messageType");
    }

    if (data !== undefined) {
      if (data.message === undefined) {
        errors.push("No message defined");
      }
      if (data.uuid === undefined) {
        errors.push("No uuid defined");
      } else if (!Services.haveUUID(data.uuid)) {
        errors.push("This uuid isn't registered");
      }
    } else {
      errors.push("Problem with request : no body");
    }

    if (errors.length > 0) {
      logger.error({messageType, data, errors});

      response.status(422);
      response.json(errors);
    } else {
      const servicesByName = Services.getByMessageType(messageType);
      logger.info({messageType, data});

      const responses: {[serviceName: string]: JSON} = {};

      for (const name in servicesByName) {
        if (servicesByName.hasOwnProperty(name)) {
          const service = this.getNextService(name, servicesByName[name]);
          const res = await service.sendMessage(data.message);
          const serviceName = service.getName();

          if (data.responseFrom !== undefined && data.responseFrom.indexOf(serviceName) !== -1) {
            responses[serviceName] = res;
          }
        }
      }

      response.status(201);
      response.json({
        responses,
        serviceName: global.serviceName,
        version: global.version,
      });
    }
  }

  /**
   * Return the next service to call
   *
   * @param name The name of service
   * @param services The list of services with this name
   */
  private getNextService(name: string, services: ServicesInterface): Service {
    if (this.lastUuid[name] === undefined) {
      this.lastUuid[name] = Object.keys(services)[0];
      return services[this.lastUuid[name]];
    }

    const position = Object.keys(services).indexOf(this.lastUuid[name]);
    if (position === -1 || position === Object.keys(services).length + 1) {
      this.lastUuid[name] = Object.keys(services)[0];
    } else {
      this.lastUuid[name] = Object.keys(services)[position + 1];
    }

    return services[this.lastUuid[name]];
  }
}
