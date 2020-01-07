import { Model, JSONSchema } from 'objection';
import MessageType from './MessageType';

export default class Service extends Model {
  /** @var {string} name The name; */
  public name?: string;
  /** @var {string} version The version */
  public version?: string;
  /** @var {string} ip The ip */
  public ip?: string;
  /** @var {number} port The port */
  public port?: number;
  /** @var {string[]} messageAccepted The list of messages types accepted */
  public messageAccepted?: string[];
  /** @var {string} url The url */
  public url?: string;
  /** @var uuid {string} The uuid */
  public uuid?: string;

  static tableName = 'service';
  
  static relationMappings = {
    messageAccepted: {
      relation: Model.ManyToManyRelation,
      modelClass: MessageType,
      join: {
        from: 'service.id',
        through: {
          from: 'messageType_service.serviceId',
          to: 'messageType_service.messageTypeId'
        },
        to: 'messageType.id'
      }
    }
  };

  static get jsonSchema(): JSONSchema {
    return {
      type: 'object',
      required: [
        'name',
        'version',
        'ip',
        'port',
        'messageAccepted',
        'url',
        'uuid'
      ],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        version: { type: 'string', minLength: 1, maxLength: 10 },
        ip: { type: 'string', minLength: 8, maxLength: 16 },
        port: { type: 'number' },
        url: { type: 'string', minLength: 1, maxLength: 255 },
        uuid: { type: 'string', minLength: 1, maxLength: 255 }
      }
    };
  }

  /**
   * Send a message to this service
   * @todo Use axios
   *
   * @param message The message to send
   */
  public sendMessage(message: string|object) {
      const url = "http://" + this.ip + ":" + this.port + "/" + this.url;
      return fetch(url, {
          body: JSON.stringify(message),
          headers: {
              "Content-Type": "application/json",
          },
          method: "POST",
      }).then((response) => response.json());
  }
}
