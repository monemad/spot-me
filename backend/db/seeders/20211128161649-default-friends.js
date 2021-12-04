'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Friends', [
            {senderId: 1, recipientId: 2},
            {senderId: 3, recipientId: 1},
            {senderId: 2, recipientId: 3}
        ], {})
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Friends', null, {});
    }
};
