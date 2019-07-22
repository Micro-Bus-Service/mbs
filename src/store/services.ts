/// <reference types="../types/Request" />
/// <reference types="../types/Service" />

export class Services {
  /**
   * List of service registered
   */
  private services: ServicesInterface = {};

  public getServices(): ServicesInterface {
    return this.services;
  }

  public getServiceUUIDByIpAndPort(ip: string, port: number): string|false {
    for (const uuid in this.services) {
      if (this.services.hasOwnProperty(uuid)) {
        const service = this.services[uuid];
        if (service.ip === ip && service.port === port) {
          return uuid;
        }
      }
    }
    return false;
  }

  /**
   * add a new Service
   * @param {RequestRegister} data
   * 
   * @return {boolean} true if ok, false if already exist
   */
  public add(data: RequestRegister): boolean {
    for (const id in this.services) {
      if (this.services.hasOwnProperty(id)) {
        const service = this.services[id];
        if (service.ip === data.ip && service.port === data.port) {
          return false;
        }
      }
    }

    this.services[data.uuid] = {
      name: data.serviceName,
      version: data.version,
      ip: data.ip,
      port: data.port,
      url: data.url,
      messageAccepted: data.messageType
    }

    return true;
  }

  /**
   * Return the list of service listening a message type
   * 
   * @param {string} messageType The message type
   * @return ServiceInterface
   */
  public getByMessageType (messageType: string): ServiceInterface {
    let returned: ServiceInterface = {};

    for (const uuid in this.services) {
      if (this.services.hasOwnProperty(uuid)) {
        const service = this.services[uuid];
        if (service.messageAccepted.indexOf(messageType) >= 0) {
          returned[uuid] = service;
        }
      }
    }

    return returned;
  }
}

export default new Services();