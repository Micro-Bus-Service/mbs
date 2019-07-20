import services from '../src/store/services'
import {expect} from 'chai';
const uuidv4 = require('uuid/v4');

describe('Service data', () => {
  it('should add a service in store', () => {
    const data: RequestRegister = {
      serviceName: "ServiceTest",
      version: "0.1",
      ip: "10.75.10.0",
      port: 8080,
      url: "/api",
      messageType: [
        "message.test",
        "message.test2"
      ],
      uuid: uuidv4()
    }

    const isAdded = services.add(data);

    expect(isAdded).to.be.true;
  });
  it('should add a service in store', () => {
    const data: RequestRegister = {
      serviceName: "ServiceTest",
      version: "0.1",
      ip: "10.75.10.0",
      port: 8080,
      url: "/api",
      messageType: [
        "message.test",
        "message.test2"
      ],
      uuid: uuidv4()
    }

    services.add(data);
    const isAdded = services.add(data);

    expect(isAdded).to.be.false;
  });
});