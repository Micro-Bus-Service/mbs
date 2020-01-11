import { RequestRegister } from "@/types/Request";
import { ServicesByNameInterface, ServicesInterface } from "@/types/Service";

import Service from "../entity/Service";
import MessageType from "../entity/MessageType";

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
    const service = await Service.findOne({
      where: {
        ip,
        port
      }
    });
    
    return service ? service.uuid : undefined;
  }

  /**
   * Check if uuid is registered
   *
   * @param {string} uuid The uuid to search
   */
  public async haveUUID(uuid: string): Promise<boolean> {
    const service = await Service.findOne({where:{uuid}});

    return service !== undefined;
  }

  /**
   * Check if a service listen this message's type
   * @param {string} messageType The message's type
   */
  public async isListened(messageType: string): Promise<boolean> {
    const mt = await MessageType.findOne({where:{name: messageType}});
    const services = await mt?.getServices();
    
    return services !== undefined && services.length > 0;
  }

  /**
   * add a new Service
   * @param {RequestRegister} data
   *
   * @return {boolean} true if ok, false if already exist
   */
  public async add(data: RequestRegister): Promise<boolean> {
    const messagesTypes: MessageType[] = [];

    data.messageType.map(async (messageType) => {
      const mt = await MessageType.findOrCreate({
        where: {
          name: messageType
        }
      })

      if (mt instanceof MessageType) {
        messagesTypes.push(mt);
      }
    })

    await Service.findOrCreate({
      where: {
        serviceName: data.serviceName,
        version: data.version,
        ip: data.ip,
        port: data.port,
        url: data.url,
        uuid: data.uuid
      }
    })
    .then((service) => {
      messagesTypes.map((messageType) => {
        if (service instanceof Service) {
          messageType.addService(service);
        }
      })
    });

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
    const mt = await MessageType.findOne({where: {name: messageType}});
    const services = await mt?.getServices();

    if (services) {
      services.map((service) => {
        if (service.name !== undefined && service.uuid !== undefined) {
          returned[service.name][service.uuid] = service;
        }
      })
    }

    return returned;
  }

  /**
   * Delete a service by this uuid
   * @param uuid The uuid
   */
  public async delete(uuid: string): Promise<boolean> {
    const nbLineDelete = await Service.destroy({
      where: {uuid}
    })

    if (nbLineDelete === 1) {
      return true;
    }

    return false;
  }
}

export default new Services();
