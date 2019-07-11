declare interface nodes {
  ip:string,
  port:string,
  ttl:number
}

declare interface RequestRegister {
  "serviceName":string,
  "version":string,
  "url":string,
  "protocol":string,
  "path":string
  "nodes": nodes[]
}