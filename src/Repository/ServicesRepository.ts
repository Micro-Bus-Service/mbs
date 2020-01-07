import { RequestRegister } from "@/types/Request";
import { ServicesByNameInterface, ServicesInterface } from "@/types/Service";

import Service from "../entity/Service";
import MessageType from "@/entity/MessageType";

export class Services {
  /**
   * List of service registered
   */
  private services: ServicesInterface = {};

  /**
   * Get uuid of the service used thisip and port
   *
   * @param {string} ip The ip
   * @param {number} port The port
   */
  public async getServiceUUIDByIpAndPort(ip: string, port: number): Promise<string|undefined> {
    const service = await Service.query().findOne({
      ip,
      port
    });
    
    return service.uuid;
  }

  /**
   * Check if uuid is registered
   *
   * @param {string} uuid The uuid to search
   */
  public async haveUUID(uuid: string): Promise<boolean> {
    const service = await Service.query().findOne({uuid});

    return service !== undefined;
  }

  /**
   * Check if a service listen this message's type
   * @param {string} messageType The message's type
   */
  public async isListened(messageType: string): Promise<boolean> {
    const mt = await MessageType.query().findOne({name: messageType});
    const services = await mt.$relatedQuery('services') as Service[];

    return services.length > 0;
  }

  /**
   * add a new Service
   * @param {RequestRegister} data
   *
   * @return {boolean} true if ok, false if already exist
   */
  public async add(data: RequestRegister): Promise<boolean> {
    const service = await Service.query().findOne(data)

    if (service) {
      return false;
    }

    await Service.query().insert(data);

    return true;
  }

  /**
   * Return the list of service listening a message type
   *
   * @param {string} messageType The message type
   * @return ServicesInterface
   */
  public async getByMessageType(messageType: string): Promise<ServicesByNameInterface> {
    const returned: ServicesByNameInterface = {};
    const mt = await MessageType.query().findOne({name: messageType});
    const services = await mt.$relatedQuery('services') as Service[];

    for (const service of services) {
      if (service.name !== undefined && service.uuid !== undefined) {
        returned[service.name][service.uuid] = service;
      }
    }

    return returned;
  }

  /**
   * Delete a service by this uuid
   * @param uuid The uuid
   */
  public delete(uuid: string): boolean {
    if (this.services[uuid] !== undefined) {
      delete this.services[uuid];
      return true;
    }

    return false;
  }
}

export default new Services();
