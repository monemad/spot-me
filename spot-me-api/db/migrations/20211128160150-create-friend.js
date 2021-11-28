'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Friends', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            senderId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'Users'
                    },
                    key: 'id'
                }
            },
            recipientId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'Users'
                    },
                    key: 'id'
                }
            },
            confirmed: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('now')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('now')
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Friends');
    }
};
