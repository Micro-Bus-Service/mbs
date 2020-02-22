export interface RequestRegister {
  serviceName: string;
  version: string;
  ip: string;
  port: number;
  url: string;
  messageType: string[];
  uuid: string;
}

export interface RequestDelete {
  uuid: string;
}

export interface RequestMessage {
  uuid: string;
  message: string | object;
}
