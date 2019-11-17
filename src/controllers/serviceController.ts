import { RequestRegister } from "../types/Request";

import { Request, Response } from "express";
import uuidv4 from "uuid/v4";
import Services from "../store/Services";

export default class ServiceController {
  /**
   * Register Service Controller
   *
   * @param {Request} request The request
   * @param {Response} response The Response
   */
  public register(request: Request, response: Response) {
    const data = request.body as RequestRegister;
    const errors: string[] = [];

    if (data !== undefined) {
      if (data.serviceName === undefined) {
        errors.push("No servicename defined");
      }

      if (data.version === undefined) {
        errors.push("No version defined");
      }

      if (data.ip === undefined) {
        errors.push("No ip defined");
      }

      if (data.port === undefined) {
        errors.push("No port defined");
      }

      if (data.url === undefined) {
        errors.push("No url defined");
      }
      if (data.messageType === undefined) {
        errors.push("No message type defined");
      }
    } else {
      errors.push("Problem with request : no body");
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
          uuid: data.uuid,
          version: global.version,
        });
      } else {
        data.uuid = uuidv4();
        if (Services.add(data)) {
          response.status(201);
          response.json({
            messageType: "service.added",
            serviceName: global.serviceName,
            uuid: data.uuid,
            version: global.version,
          });
        }  else {
          const uuid = Services.getServiceUUIDByIpAndPort(data.ip, data.port);
          errors.push("This instance already registered by this UUID : " + uuid);
          response.status(422);
          response.json(errors);
        }
      }
    }
  }

  /**
   * Delete a service registration
   *
   * @param request The request
   * @param response The response
   */
  public unregister(request: Request, response: Response) {
    const uuid = request.params.uuid as string;
    const errors: string[] = [];

    const isDeleted = Services.delete(uuid);
    if (isDeleted) {
      response.status(201);
      response.json({
        messageType: "service.deleted",
        serviceName: global.serviceName,
        uuid,
        version: global.version,
      });
    } else {
      errors.push("Problem when deleting service, maybe he is already deleted");
      response.status(422);
      response.json(errors);
    }
  }
}
