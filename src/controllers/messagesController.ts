import Services from "@/store/Services";
import { RequestMessage } from "@/types/Request";
import logger from "@/utils/logger";
import { Request, Response } from "express";

export default class MessagesController {
  /**
   * Retrieve a message and send it to the corresponding services
   *
   * @param {Request} request The request
   * @param {Response} response The Response
   */
  public getMessage(request: Request, response: Response) {
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
      const services = Services.getByMessageType(messageType);
      logger.info({messageType, data});

      for (const key in services) {
        if (services.hasOwnProperty(key)) {
          const service = services[key];
          service.sendMessage(data.message);
        }
      }
      response.status(201);
      response.json({
        serviceName: global.serviceName,
        version: global.version,
      });
    }
  }
}
