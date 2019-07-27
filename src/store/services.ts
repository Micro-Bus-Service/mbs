/// <reference types="../types/Request" />
/// <reference types="../types/Service" />

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
   * Check if uuid is registered
   *
   * @param {string} uuid The uuid to search
   */
  public haveUUID(uuid: string): boolean {
    return this.services[uuid] !== undefined;
  }

  /**
   * Check if a service listen this message's type
   * @param {string} messageType The message's type
   */
  public isListened(messageType: string): boolean {
    for (const id in this.services) {
      if (this.services.hasOwnProperty(id)) {
        const service = this.services[id];
        if (service.messageAccepted.indexOf(messageType) >= 0) {
          return true;
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
      ip: data.ip,
      messageAccepted: data.messageType,
      name: data.serviceName,
      port: data.port,
      url: data.url,
      version: data.version,
    };

    return true;
  }

  /**
   * Return the list of service listening a message type
   *
   * @param {string} messageType The message type
   * @return ServicesInterface
   */
  public getByMessageType(messageType: string): ServicesInterface {
    const returned: ServicesInterface = {};

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

  public delete(uuid: string): boolean {
    if (this.services[uuid] !== undefined) {
      delete this.services[uuid];
      return true;
    }

    return false;
  }
}

export default new Services();
