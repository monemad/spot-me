'use strict';

import { Model, Optional } from 'sequelize';

interface PaymentAttributes {
    id: number;
    senderId: number;
    recipientId: number;
    amount: number;
    memo: string;
    fulfilled: boolean;
}

interface PaymentCreationAttributes extends Optional<PaymentAttributes, "id"> {}

module.exports = (sequelize: any, DataTypes: any) => {

    class Payment extends Model<PaymentAttributes, PaymentCreationAttributes> implements PaymentAttributes {
        id!: number;
        senderId!: number;
        recipientId!: number;
        amount!: number;
        memo!: string;
        fulfilled!: boolean;

        static associate(models: any) {
            Payment.belongsTo(models.User, {foreignKey: 'senderId'});
            Payment.belongsTo(models.User, {foreignKey: 'recipientId'});
        }
    };
    Payment.init({
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
        amount: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        memo: {
            type: DataTypes.STRING(256),
            allowNull: false
        },
        fulfilled: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Payment',
    });
    return Payment;
};
