'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Transfers', [
            {userId: 1, amount: 215.00, deposit: true, stripeConf: 'ch_3K2HsqETIRayISNA0QtfeduE: Deposit to account #1'},
            {userId: 2, amount: 135.00, deposit: true, stripeConf: 'ch_3K2HjhETIRayISNA1MEUE4Pc: Deposit to account #2'},
        ], {})
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Transfers', null, {});
    }
};
