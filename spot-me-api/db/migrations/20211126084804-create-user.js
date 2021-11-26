'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            firstName: {
                allowNull: false,
                type: Sequelize.STRING(50)
            },
            lastName: {
                allowNull: false,
                type: Sequelize.STRING(50)
            },
            username: {
                allowNull: false,
                type: Sequelize.STRING(25),
                unique: true
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING(100),
                unique: true
            },
            hashedPassword: {
                allowNull: false,
                type: Sequelize.STRING
            },
            imgUrl: {
                allowNull: false,
                type: Sequelize.STRING
            },
            balance: {
                allowNull: false,
                type: Sequelize.DECIMAL(10,2)
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
        await queryInterface.dropTable('Users');
    }
};
