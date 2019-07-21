import { Services } from '../src/store/services'
import {expect} from 'chai';
const uuidv4 = require('uuid/v4');

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

let sv: Services; 

describe('Service data', () => {
  beforeEach(() => {
    sv = new Services;
  });
  it('should add a service in store', () => {
    const isAdded = sv.add(data);

    expect(isAdded).to.be.true;
  });
  it('should got an error if add 2 services with same ip and port', () => {
    sv.add(data);
    const isAdded = sv.add(data);

    expect(isAdded).to.be.false;
  });
  it('should return a list of Service for message type given', () => {
    sv.add(data);
    const servicesList = sv.getByMessageType('message.test');

    expect(Object.keys(servicesList).length).to.be.equal(1);
  });
});