Unregister service
==================

Request
-------

Url
  "/services/:uuid"

Verb
  "delete"

Response
--------

Success Code
  201
    Valid Request

Error Code
  422
    Invalid Parameters
  500
    Internal Server Error

Body
  .. code:: js

    {
      "serviceName": string,
      "version": string,
      "uuid": string,
      "errors"?: string[]
    }

+-------------+-----------------------------------------------------+
|  Parameter  | Description                                         |
+-------------+-----------------------------------------------------+
| serviceName | The service name of the microservice bus            |
+-------------+-----------------------------------------------------+
|   version   | The version of the microservice bus                 |
+-------------+-----------------------------------------------------+
|     uuid    | The Universal Unique Identifier used by the service |
+-------------+-----------------------------------------------------+
|    errors   | The list of errors found                            |
+-------------+-----------------------------------------------------+
