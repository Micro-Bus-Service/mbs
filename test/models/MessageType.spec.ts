import { expect } from "chai";
import { Service } from "../../src/models/Service"
import uuidv4 from "uuid/v4";

const data = {
  ip: "10.75.10.0",
  messageType: [
    "message.test",
    "message.test2",
  ],
  port: 8080,
  name: "ServiceTest",
  url: "/api",
  uuid: uuidv4(),
  version: "0.1",
};

describe('MessageType', () => {
  it('should load', (done) => {
    Service.create(data).then((service) => {
      expect(service.name).to.be.equal(data.name);
      done();
    })
  })
})