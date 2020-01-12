import { Sequelize, DataTypes, Model, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin, HasManyCountAssociationsMixin, Association } from "sequelize";
import { Service } from "./Service";

export class MessageType extends Model {
  public id!: number;
  public name!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getServices!: HasManyGetAssociationsMixin<Service>;
  public addService!: HasManyAddAssociationMixin<Service, number>;
  public hasService!: HasManyHasAssociationMixin<Service, number>;
  public countServices!: HasManyCountAssociationsMixin;

  public static associations: {
    Services: Association<MessageType, Service>;
  };
}

export default (sequelize: Sequelize) => {
  MessageType.init(
  {
    name: DataTypes.STRING,
  },
  {
    sequelize
  }
  )
  
  return MessageType;
}