declare interface RequestRegister {
  "serviceName":string,
  "version":string,
  "ip": string,
  "port":number,
  "url":string,
  "messageType": string[],
  "uuid": string,
}

declare interface RequestDelete {
  "uuid": string,
}

declare interface RequestMessage {
  "uuid": string,
  "message": string|object,
}
