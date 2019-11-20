import {RequestRegister} from "../src/types/Request";

import { expect } from "chai";
import uuidv4 from "uuid/v4";
import { Services } from "../src/store/Services";

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

let sv: Services;

describe("Service store", () => {
  beforeEach(() => {
    sv = new Services();
  });

  describe("add", () => {
    it("should add a service in store", () => {
      const isAdded = sv.add(data);

      expect(isAdded).to.equal(true);
    });

    it("should got an error if add 2 services with same ip and port", () => {
      sv.add(data);
      const isAdded = sv.add(data);

      expect(isAdded).to.equal(false);
    });
  });

  describe("getByMessageType", () => {
    it("should return a list of Service for message type given", () => {
      sv.add(data);
      const servicesList = sv.getByMessageType("message.test");

      expect(Object.keys(servicesList).length).to.be.equal(1);
    });

    it("should return an empty list of Service for message type given", () => {
      sv.add(data);
      const servicesList = sv.getByMessageType("message.test3");

      expect(Object.keys(servicesList).length).to.be.equal(0);
    });
  });

  describe("delete", () => {
    it("should remove a service", () => {
      sv.add(data);
      let servicesList = sv.getByMessageType("message.test");

      expect(Object.keys(servicesList).length).to.be.equal(1);
      const isDeleted = sv.delete(data.uuid);
      servicesList = sv.getByMessageType("message.test");
      expect(isDeleted).to.equal(true);

      expect(Object.keys(servicesList).length).to.be.equal(0);
    });

    it("should return false if service already remove", () => {
      sv.add(data);
      sv.delete(data.uuid);
      const isDeleted = sv.delete(data.uuid);
      const servicesList = sv.getByMessageType("message.test");

      expect(Object.keys(servicesList).length).to.be.equal(0);
      expect(isDeleted).to.equal(false);
    });
  });

  describe("isListened", () => {
    it("should return true if messageType is listened", () => {
      sv.add(data);
      expect(sv.isListened("message.test")).to.be.equal(true);
    });

    it("should return false if messageType isn't listened", () => {
      expect(sv.isListened("message.test")).to.be.equal(false);
    });
  });

  describe("haveUUID", () => {
    it("should return true if uuid exist", () => {
      sv.add(data);
      expect(sv.haveUUID(data.uuid)).to.be.equal(true);
    });

    it("should return false if uuid don't exist", () => {
      expect(sv.haveUUID(data.uuid)).to.be.equal(false);
    });
  });

  describe("getServiceUUIDByIpAndPort", () => {
    it("should return the uuid if service already exist", () => {
      sv.add(data);
      expect(sv.getServiceUUIDByIpAndPort(data.ip, data.port)).to.be.equal(data.uuid);
    });

    it("should return false if the service don't exist", () => {
      expect(sv.getServiceUUIDByIpAndPort(data.ip, data.port)).to.be.equal(false);
    });
  });
});
