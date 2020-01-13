import {RequestRegister} from "../../src/types/Request";

import { expect } from "chai";
import uuidv4 from "uuid/v4";

require('dotenv').config();
require('../../src/utils/db');

import { Services } from "../../src/repository/ServicesRepository";
import db from "../../src/utils/db";

const data: RequestRegister = {
  ip: "10.75.10.0",
  messageType: [
    "message.test",
    "message.test2",
  ],
  port: 8080,
  serviceName: "ServiceTest",
  url: "/api",
  uuid: uuidv4(),
  version: "0.1",
};

const sv = new Services();

describe("Service repository", () => {
  
  beforeEach(() => {
    return db.sequelize.drop({cascade: true}).then(function() {
        return db.sequelize.sync();
    });
  });

  describe("add", () => {
    it("should add a service", async () => {
      const isAdded = await sv.add(data);

      expect(isAdded).to.equal(true);
    });

    it("should got an error if add 2 services with same ip and port", async () => {
      await sv.add(data);
      const isAdded = await sv.add(data);

      expect(isAdded).to.equal(false);
    });
  });

  describe("getByMessageType", () => {
    it("should return a list of Service for message type given", async () => {
      await sv.add(data);
      const servicesList = await sv.getByMessageType("message.test");

      expect(Object.keys(servicesList).length).to.be.equal(1);
    });

    it("should return an empty list of Service for message type given", async () => {
      await sv.add(data);
      const servicesList = await sv.getByMessageType("message.test3");

      expect(Object.keys(servicesList).length).to.be.equal(0);
    });
  });

  describe("delete", () => {
    it("should remove a service", async () => {
      await sv.add(data);
      let serviceExist = await sv.haveUUID(data.uuid);

      expect(serviceExist).to.be.equal(true);
      const isDeleted = await sv.delete(data.uuid);
      serviceExist = await sv.haveUUID(data.uuid);
      expect(isDeleted).to.equal(true);

      expect(serviceExist).to.be.equal(false);
    });

    it("should return false if service already remove", async () => {
      await sv.add(data);
      await sv.delete(data.uuid);
      const isDeleted = await sv.delete(data.uuid);
      const serviceExist = await sv.haveUUID(data.uuid);

      expect(serviceExist).to.equal(false);
      expect(isDeleted).to.equal(false);
    });
  });

  describe("isListened", () => {
    it("should return true if messageType is listened", async () => {
      await sv.add(data);
      expect(await sv.isListened("message.test")).to.be.equal(true);
    });

    it("should return false if messageType isn't listened", async() => {
      expect(await sv.isListened("message.test")).to.be.equal(false);
    });
  });

  describe("haveUUID", () => {
    it("should return true if uuid exist", async () => {
      await sv.add(data);
      expect(await sv.haveUUID(data.uuid)).to.be.equal(true);
    });

    it("should return false if uuid don't exist", async () => {
      expect(await sv.haveUUID(data.uuid)).to.be.equal(false);
    });
  });

  describe("getServiceUUIDByIpAndPort", () => {
    it("should return the uuid if service already exist", async() => {
      await sv.add(data);
      expect(await sv.getServiceUUIDByIpAndPort(data.ip, data.port)).to.be.equal(data.uuid);
    });

    it("should return undefined if the service don't exist", async () => {
      expect(await sv.getServiceUUIDByIpAndPort(data.ip, data.port)).to.be.equal(undefined);
    });
  });
});
