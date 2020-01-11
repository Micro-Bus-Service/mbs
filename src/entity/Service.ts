import { Model } from 'sequelize';
import { HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin, Association, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin } from 'sequelize';
import MessageType from './MessageType';

export default class Service extends Model {
  /** @var {string} name The name; */
  public name!: string;
  /** @var {string} version The version */
  public version!: string;
  /** @var {string} ip The ip */
  public ip!: string;
  /** @var {number} port The port */
  public port!: number;
  /** @var {string[]} messageAccepted The list of messages types accepted */
  public messageAccepted!: string[];
  /** @var {string} url The url */
  public url!: string;
  /** @var uuid {string} The uuid */
  public uuid!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  
  public getMessageTypes!: HasManyGetAssociationsMixin<MessageType>; // Note the null assertions!
  public addMessageType!: HasManyAddAssociationMixin<MessageType, number>;
  public hasMessageType!: HasManyHasAssociationMixin<MessageType, number>;
  public countMessageTypes!: HasManyCountAssociationsMixin;
  public createMessageType!: HasManyCreateAssociationMixin<MessageType>;

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  public readonly MessageTypes?: MessageType[]; // Note this is optional since it's only populated when explicitly requested in code

  public static associations: {
    MessageTypes: Association<Service, MessageType>;
  };

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
