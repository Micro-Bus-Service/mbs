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
  "messageType": [
    "mail.send",
    "mail.receive"
  ] 
}
`


| Parameter   |Mandatory|Data Type |Default|Description|
|-------------|---------|----------|-------|-----------|
| serviceName | Y       |  String  |       | Service Name, must comply with RFC 1123, only allowsthe ASCII letters 'a' through 'z' , the digits '0' through '9', and the minus sign ('-').|
| version     | Y       |  String  |       | Service Version |
| ip          | Y       |  String  |       | the ip of the service instance node, it could also be a hostname |
| port        | Y       |  String  |       | the port of the service instance node |
| ttl         | Y       |  String  |       | time to live, this parameter is reserved for later use |
| enable_ssl  | N       |  boolean | False | True if the registered service is based on https.False if the registered service is based on http. |
| messageType | Y       | String[] |       | List of messageType subscribe |

### Response

`{
  "serviceName": "bus",
  "version": "v1",
  "UUID": "29a366cd-d01a-4cb6-86fd-91af5f44af0c",
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
