# Bus

Bus is a bus for microservice's architecture write in Typescript.

## Register service to the Microservice Bus

### Request

url : /services  
Verb: POST  
Body:   
`
{
  "serviceName": "aai",
  "version": "v8",
  "ip": "10.74.56.36",
  "port": "8988",
  "url": "/aai/v8",
  "ttl": 0
}
`


| Parameter   |Mandatory|Data Type|Default|Description|
|-------------|---------|---------|-------|-----------|
| serviceName | Y       | String  |       | Service Name, must comply with RFC 1123, only allowsthe ASCII letters 'a' through 'z' , the digits '0' through '9', and the minus sign ('-').|
| version     | Y       | String  |       | Service Version |
| ip          | Y       | String  |       | the ip of the service instance node, it could also be a hostname |
| port        | Y       | String  |       | the port of the service instance node |
| ttl         | Y       | String  |       | time to live, this parameter is reserved for later use |
| url         | Y       | String  |       | the actual URL of the service to be registered |
| enable_ssl  | N       | boolean | False | True if the registered service is based on https.False if the registered service is based on http. |

### Response

`{
  "serviceName": "bus",
  "version": "v1",
  "UUID": "ae46ab1f",
  "messageType": [
    "mail.send"
  ]
}`

| Parameter   | Description |
|-------------|-------------|
| serviceName | service name |
| version     | version |
| UUID        | Universal Unique Identifier |
| messageType | List of messageType subscribe |

### Success Code
201

### Error Code
422 Invalid Parameters  
500 Internal Server Error
