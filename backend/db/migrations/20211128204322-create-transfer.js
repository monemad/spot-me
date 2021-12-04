'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Transfers', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        userId: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
                model: {
                    tableName: 'Users'
                },
                key: 'id'
            }
        },
        amount: {
            allowNull: false,
            type: Sequelize.DECIMAL(10,2)
        },
        deposit: {
            allowNull: false,
            type: Sequelize.BOOLEAN
        },
        stripeConf: {
            allowNull: false,
            type: Sequelize.STRING
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
        await queryInterface.dropTable('Transfers');
    }
};
