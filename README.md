# Bus

Bus is a bus for microservice's architecture write in Typescript.

## Register service to the Microservice Bus

### Request

url : /api/microservices/v1/services  
Verb: POST  
Body:   
`
{
  "serviceName": "aai",
  "version": "v8",
  "url": "/aai/v8",
  "protocol": "REST",
  "visualRange": "1",
  "path":"/aai/v8"
  "nodes": [
    {
      "ip": "10.74.56.36",
      "port": "8988",
      "ttl": 0
    }
  ]
}
`


|Parameter|Mandatory|Data Type|Default|Description
|---|---|---|---|---|
| serviceName | Y                                         | String  |       | Service Name, must comply with RFC 1123, only allowsthe ASCII letters 'a' through 'z' , the digits '0' through '9', and the minus sign ('-').                                                                                                                                                                                                      |
| version     | Y                                         | String  |       | Service Version                                                                                                                                                                                                                                                                                                                                    |
| url         | Y if protocol is 'REST' or 'UI' or 'HTTP' | String  |       | the actual URL of the service to be registered                                                                                                                                                                                                                                                                                                     |
| protocol    | Y                                         | String  |       | supported protocols: 'REST', 'UI', 'HTTP','TCP'                                                                                                                                                                                                                                                                                                    |
| visualRange | N                                         | String  | 1     | Visibility of the service. External(can be accessed by external systems):0 Internal(can only be accessed by ONAP microservices):1                                                                                                                                                                                                                  |
| path        | N                                         | String  |       | Thecustomizedpublish path of this service.If path parameter is specified when registering the service, the service will be published to apigateway under this path. Otherwise, the service will be published to apigateway using a fixed format: api/{serviceName}/{version}.The customized publish path should only be used for back-compatible.  |
| enable_ssl  | N                                         | boolean | False | True if the registered service is based on https.False if the registered service is based on http.                                                                                                                                                                                                                                                 |
| nodes       | Y                                         | List    |       | ip: the ipoftheservice instance node, it could also be a hostname like catalog.onap.orgport: the port of the service instance nodettl: time to live, this parameter is reserved for later use                                                                                                                                                      |
### Response

`{
  "serviceName": "catalog",
  "version": "v1",
  "url": "/api/catalog/v1",
  "protocol": "REST",
  "visualRange": "1",
 "lb_policy":"ip_hash",
  "nodes": [
    {
      "ip": "10.74.55.66",
      "port": "6666",
      "ttl": 0
    },
    {
      "ip": "10.74.56.37",
      "port": "8989",
      "ttl": 0  
    },
    {
      "ip": "10.74.56.36",
      "port": "8988",
      "ttl": 0
    }
  ]
}`

| Parameter | Description                                                             |
|-------------|--------------------------------------------------------------------------|
| serviceName | service name                                                             |
| version     | version                                                                  |
| url         | url of the created service instance                                      |
| protocol    | supported protocols: 'REST'                                              |
| nodes       | the service instance nodes list to register                              |
| lb_policy   | Load balancing method, Currently only round-robin methods are supported. |
| ip          | the ip of the service instance node, it could also be a hostname         |
| port        | the port of the service instance node                                    |
| ttl         | time to live, this parameter is reserved for later use                   |

### Success Code
201

### Error Code
422 Invalid Parameters  
500 Internal Server Error