import { expect } from "chai";
import Service from "../../src/entity/Service";
import { ServiceInterface } from "../../src/types/Service";

describe("Service entity", () => {
  let service: Service;
  const baseService: ServiceInterface = {
    ip: "127.0.0.1",
    messageAccepted: ["user.profil.get"],
    name: "testService",
    port: 80,
    url: "",
    uuid: "",
    version:  "0.1.2",
  };

  beforeEach(() => {
    service = new Service(baseService);
  });

  describe("ip", () => {
    it("get ip", () => {
      expect(service.getIp()).to.be.equal(baseService.ip);
    });

    it("set ip", () => {
      const ip = "192.168.0.1";
      service.setIp(ip);
      expect(service.getIp()).to.be.equal(ip);
    });

    it("error when ip is empty", () => {
      const ip = "";
      expect(() => service.setIp(ip)).to.throw(TypeError, "Ip is empty");
    });

    it("error when ip isn't valid", () => {
      const ip = "test";
      expect(() => service.setIp(ip)).to.throw(TypeError, "Invalid Ip");
    });

    it("error when ip isn't valid", () => {
      const ip = "162.168.01";
      expect(() => service.setIp(ip)).to.throw(TypeError, "Invalid Ip");
    });
  });

  describe("messageAccepted", () => {
    it("get message accepted", () => {
      expect(service.getMessageAccepted()).to.be.equal(baseService.messageAccepted);
    });

    it("set messages accepted", () => {
      const messagesAccepted = ["Messages Changed"];
      service.setMessageAccepted(messagesAccepted);
      expect(service.getMessageAccepted()).to.be.equal(messagesAccepted);
    });
  });

  describe("name", () => {
    it("get name", () => {
      expect(service.getName()).to.be.equal(baseService.name);
    });

    it("set name", () => {
      const name = "Name Changed";
      service.setName(name);
      expect(service.getName()).to.be.equal(name);
    });

    it("error when name is empty", () => {
      const name = "";
      expect(() => service.setName(name)).to.throw(TypeError, "Name is empty");
    });
  });

  describe("port", () => {
    it("get port", () => {
      expect(service.getPort()).to.be.equal(baseService.port);
    });

    it("set port", () => {
      const port = 8080;
      service.setPort(port);
      expect(service.getPort()).to.be.equal(port);
    });
  });

  describe("url", () => {
    it("get url", () => {
      expect(service.getUrl()).to.be.equal(baseService.url);
    });

    it("set url", () => {
      const url = "Url Changed";
      service.setUrl(url);
      expect(service.getUrl()).to.be.equal(url);
    });

    it("error when name is empty", () => {
      const url = "";
      expect(() => service.setUrl(url)).to.throw(TypeError, "Url is empty");
    });
  });

  describe("uuid", () => {
    it("get uuid", () => {
      expect(service.getUuid()).to.be.equal(baseService.uuid);
    });

    it("set uuid", () => {
      const uuid = "UUID Changed";
      service.setUuid(uuid);
      expect(service.getUuid()).to.be.equal(uuid);
    });

    it("error when uuid is empty", () => {
      const uuid = "";
      expect(() => service.setUuid(uuid)).to.throw(TypeError, "UUID is empty");
    });
  });

  describe("version", () => {
    it("get version", () => {
      expect(service.getVersion()).to.be.equal(baseService.version);
    });

    it("set version", () => {
      const version = "0.1.3";
      service.setVersion(version);
      expect(service.getVersion()).to.be.equal(version);
    });

    it("error when version is empty", () => {
      const version = "";
      expect(() => service.setVersion(version)).to.throw(TypeError, "Version is empty");
    });
  });
});
