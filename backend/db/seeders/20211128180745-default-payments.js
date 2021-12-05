'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Payments', [
            {senderId: 1, recipientId: 2, amount: 20.00, memo: "Dinner last night", fulfilled: true},
            {senderId: 1, recipientId: 7, amount: 20.00, memo: "gamezz", fulfilled: true},
            {senderId: 1, recipientId: 8, amount: 560.00, memo: "rent money", fulfilled: true},
            {senderId: 1, recipientId: 4, amount: 40.00, memo: "happy hour", fulfilled: true},
            {senderId: 1, recipientId: 4, amount: 7.00, memo: "for fun", fulfilled: false},
            {senderId: 2, recipientId: 1, amount: 10.00, memo: "Gas money", fulfilled: false},
            {senderId: 2, recipientId: 1, amount: 5.00, memo: "toilet paper", fulfilled: true},
        ], {})
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Payments', null, {});
    }
};
