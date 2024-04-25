import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import { sequelize } from '../db';

class ForwardedMessage extends Model<
  InferAttributes<ForwardedMessage>,
  InferCreationAttributes<ForwardedMessage>
> {
  declare id: number;

  declare senderChatId: number;

  declare receiverChatId: number;
}

ForwardedMessage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    senderChatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiverChatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'forwardedMessage',
    tableName: 'forwardedMessages',
  },
);

export default ForwardedMessage;
