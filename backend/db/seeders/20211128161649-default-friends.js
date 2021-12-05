'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Friends', [
            {senderId: 1, recipientId: 2},
            {senderId: 1, recipientId: 4},
            {senderId: 1, recipientId: 5},
            {senderId: 1, recipientId: 6},
            {senderId: 1, recipientId: 10},
            {senderId: 3, recipientId: 1},
            {senderId: 7, recipientId: 1},
            {senderId: 8, recipientId: 1},
            {senderId: 9, recipientId: 1},
            {senderId: 2, recipientId: 3}
        ], {})
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Friends', null, {});
    }
};
