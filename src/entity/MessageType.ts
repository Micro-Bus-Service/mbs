import { Model, JSONSchema } from 'objection';
import Service from './Service';

export default class MessageType extends Model {
  static tableName = 'messageType';
  
  static relationMappings = {
    services: {
      relation: Model.ManyToManyRelation,
      modelClass: Service,
      join: {
        from: 'messageType.id',
        through: {
          from: 'messageType_service.messageTypeId',
          to: 'messageType_service.serviceId'
        },
        to: 'service.id'
      }
    }
  };

  static get jsonSchema(): JSONSchema {
    return {
      type: 'object',
      required: [
        'name'
      ],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 }
      }
    }
  }
}
