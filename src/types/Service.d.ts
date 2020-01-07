import Service from "@/entity/Service";

export interface ServiceInterface {
  name: string;
  version: string;
  ip: string;
  port: number;
  url: string;
  messageAccepted: string[];
  uuid?: string;
}

export interface ServicesInterface {
  [uuid: string]: Service;
}

export interface ServicesByNameInterface {
  [serviceName: string]: {
    [uuid: string]: Service;
  };
}
