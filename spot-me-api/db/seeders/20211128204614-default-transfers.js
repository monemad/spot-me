'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Transfers', [
            {userId: 1, amount: 215.00, deposit: true},
            {userId: 2, amount: 135.00, deposit: true},
        ], {})
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Transfers', null, {});
    }
};
