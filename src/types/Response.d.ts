export interface ResponseBus {
  messageType: string;
  serviceName: string;
  version: string;
  errors?: string[];
  uuid?: string;
}
