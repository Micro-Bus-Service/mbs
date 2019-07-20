/// <reference types="../types/Request" />
/// <reference types="../types/Service" />

class Services {
  /**
   * Liste of service registered
   */
  private services: {[id: string]: Service} = {};

  /**
   * add
   */
  public add(data: RequestRegister): boolean {
    if (this.services[data.uuid] !== undefined) {
      return false;
    }

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
}

export default new Services();