'use strict';

import { Model, Optional } from 'sequelize';

interface UserAttributes {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    hashedPassword: string;
    imgUrl: string;
    balance: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

module.exports = (sequelize: any, DataTypes: any) => {
    class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
        id!: number;
        firstName!: string;
        lastName!: string;
        username!: string;
        email!: string;
        hashedPassword!: string;
        imgUrl!: string;
        balance!: number;
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models: any) {
        // define association here
        }
    };
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(25),
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        hashedPassword: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imgUrl: {
            type: DataTypes.STRING,
            allowNull: false
        },
        balance: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        }
    }, {
        defaultScope: {
            attributes: {
                exclude: ['hashedPassword', 'email', 'balance', 'createdAt', 'updatedAt']
            }
        },
        scopes: {
            currentUser: {
                attributes: {
                    exclude: ['hashedPassword'] 
                }
            },
            loginUser: {
                attributes: {
                    exclude: []
                }
            }
        },
        sequelize,
        modelName: 'User',
    });
    return User;
};
