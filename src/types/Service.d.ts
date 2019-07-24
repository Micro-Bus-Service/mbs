declare interface Service {
  "name":string,
  "version":string,
  "ip": string,
  "port":number,
  "url":string,
  "messageAccepted": string[]
}

declare interface ServicesInterface {
  [id: string]: Service
}