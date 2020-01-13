import { expect } from "chai";
import { Service } from "../../src/models/Service"
import uuidv4 from "uuid/v4";
import path from 'path';

const p = path.resolve(process.cwd(), '.env.test');
require('dotenv').config({path: p});
import db from "../../src/utils/db";

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
  
  beforeEach(() => {
    return db.sequelize.drop({cascade: true}).then(function() {
        return db.sequelize.sync();
    });
  });
  
  it('should load', (done) => {
    Service.create(data).then((service) => {
      expect(service.name).to.be.equal(data.name);
      done();
    })
  })
})