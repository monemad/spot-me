'use strict';

import { Model, Optional } from 'sequelize';

interface TransferAttributes {
    id: number;
    userId: number;
    amount: number;
    deposit: boolean;
    stripeConf: string;
}

interface TransferCreationAttributes extends Optional<TransferAttributes, "id"> {}

module.exports = (sequelize: any, DataTypes: any) => {
    class Transfer extends Model<TransferAttributes, TransferCreationAttributes> implements TransferAttributes {
        id!: number;
        userId!: number;
        amount!: number;
        deposit!: boolean;
        stripeConf!: string;

        static associate(models: any) {
            Transfer.belongsTo(models.User, { foreignKey: 'userId' });
        }
    };
    Transfer.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        amount: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        deposit: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        stripeConf: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Transfer',
    });
    return Transfer;
};
