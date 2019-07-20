/// <reference types="../types/Request" />
/// <reference types="../types/Service" />

class Services {
  /**
   * List of service registered
   */
  private services: {[id: string]: Service} = {};

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
}

export default new Services();