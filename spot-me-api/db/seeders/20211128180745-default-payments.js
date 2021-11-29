'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Payments', [
            {senderId: 1, recipientId: 2, amount: 20.00, memo: "Dinner last night", fulfilled: true},
            {senderId: 2, recipientId: 1, amount: 10.00, memo: "Gas money", fulfilled: false},
            {senderId: 2, recipientId: 1, amount: 5.00, memo: "toilet paper", fulfilled: true},
        ], {})
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Payments', null, {});
    }
};
