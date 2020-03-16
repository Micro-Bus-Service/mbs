import Services from "@/repositories/ServicesRepository";
import { RequestRegister } from "@/types/Request";
import { ResponseBus } from "@/types/Response";
import logger from "@/utils/logger";
import { Request, Response } from "express";
import uuidv4 from "uuid/v4";

export default class ServiceController {
  /**
   * Register Service Controller
   *
   * @param {Request} request The request
   * @param {Response} response The Response
   */
  public async register(request: Request, response: Response) {
    const data = request.body as RequestRegister;
    const errors: string[] = [];
    const body: ResponseBus = {
      messageType: "service.added",
      serviceName: global.serviceName,
      version: global.version,
    };

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
      } else {
        if (!(data.messageType instanceof Array)) {
          errors.push("messageType is not an array");
        } else {
          data.messageType.forEach((mt) => {
            if (!(mt instanceof String)) {
              errors.push("messageType is not an array of string");
            }
          });
        }
      }
    } else {
      errors.push("Problem with request : no body");
    }

    if (errors.length > 0) {
      logger.error({ data, errors });
      body.errors = errors;

      response.status(422);
      response.json(body);
    } else {
      data.uuid = uuidv4();
      body.uuid = data.uuid;
      if (await Services.add(data)) {
        logger.info("Add service : " + data.uuid);
        response.status(201);
        response.json(body);
      } else {
        const uuid = await Services.getServiceUUIDByIpAndPort(
          data.ip,
          data.port,
        );
        errors.push("This instance already registered by this UUID : " + uuid);
        logger.error({ data, errors });
        body.errors = errors;

        response.status(422);
        response.json(body);
      }
    }
  }

  /**
   * Delete a service registration
   *
   * @param request The request
   * @param response The response
   */
  public async unregister(request: Request, response: Response) {
    const uuid = request.params.uuid as string;
    const errors: string[] = [];
    const body: ResponseBus = {
      messageType: "service.deleted",
      serviceName: global.serviceName,
      uuid,
      version: global.version,
    };

    const isDeleted = await Services.delete(uuid);
    if (isDeleted) {
      response.status(201);
      response.json(body);
    } else {
      errors.push("Problem when deleting service, maybe he is already deleted");
      body.errors = errors;
      response.status(422);
      response.json(body);
    }
  }
}
