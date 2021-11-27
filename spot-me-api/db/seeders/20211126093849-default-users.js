'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', [
            {firstName: 'Grimy', lastName: 'Grim', username: 'grimeboi', email: 'grimetastic@gmail.com', hashedPassword: await bcrypt.hash('password', 10), imgUrl: 'testImgUrl', balance: 9.99}
        ], {})
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
    }
};
