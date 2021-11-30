'use strict';

import { Model, Optional } from 'sequelize';

interface FriendAttributes {
    id: number;
    senderId: number;
    recipientId: number;
    confirmed: boolean;
}

interface FriendCreationAttributes extends Optional<FriendAttributes, "id"> {}

module.exports = (sequelize: any, DataTypes: any) => {
    class Friend extends Model<FriendAttributes, FriendCreationAttributes> implements FriendAttributes {
        id!: number;
        senderId!: number;
        recipientId!: number;
        confirmed!: boolean;
        
        static associate(models: any) {
            Friend.belongsTo(models.User, {foreignKey: 'senderId', as: 'sender'});
            Friend.belongsTo(models.User, {foreignKey: 'recipientId', as: 'recipient'});
        }
    };
    Friend.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        senderId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        recipientId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        confirmed: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'Friend',
    });
    return Friend;
};
