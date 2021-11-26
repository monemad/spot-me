'use strict';

import { Model, Optional } from 'sequelize';
import bcrypt from 'bcryptjs';
import { Settings } from 'http2';

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

interface LoginCredentials {
    credential: string;
    password: string;
}

interface SignupFormData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

interface SafeObject {
    id: number;
    username: string;
    email: string;
}

interface UserInstanceMethods {
    toSafeObject: () => SafeObject;
    validatePassword: (password: string) => boolean;
}

export interface DefScopeUser extends UserInstanceMethods {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    imgUrl: string;
}

export interface CurScopeUser extends DefScopeUser {
    email: string;
    balance: number;
    createdAt: string;
    updatedAt: string;
}

export interface LoginUser extends CurScopeUser {
    hashedPassword: string;
}

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

        static associate(models: any) {

        }

        toSafeObject = () => {
            const { id, username, email } = this;
            return { id, username, email };
        }

        validatePassword = (password: string) => {
            return bcrypt.compareSync(password, this.hashedPassword)
        }

        static async getCurrentUserById(id: number) {
            return await User.scope('currentUser').findByPk(id);
        }


        static async login({ credential, password }: LoginCredentials) {
            const { Op } = require('sequelize');
            const user = await User.scope('loginUser').findOne({
                where: {
                    [Op.or]: {
                        username: credential,
                        email: credential
                    }
                }
            })
            if (user && user.validatePassword(password)) {
                return await User.scope('currentUser').findByPk(user.id)
            }
        }

        static async signup({ firstName, lastName, username, email, password } : SignupFormData) {
            const hashedPassword = bcrypt.hashSync(password)
            const user = await User.create({
                firstName,
                lastName,
                username, 
                email,
                hashedPassword, 
                imgUrl: 'default.png',
                balance: 0
            })
            return await User.scope('currentUser').findByPk(user.id);
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
            allowNull: false,
            validate: {
                len: [2, 50]
            }
        },
        lastName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: [2, 50]
            }
        },
        username: {
            type: DataTypes.STRING(25),
            allowNull: false,
            unique: true,
            validate: {
                len: [2,25]
            }
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                len: [5, 100],
                isEmail: true
            }
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
            allowNull: false,
            validate: {
                min: 0
            }
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
