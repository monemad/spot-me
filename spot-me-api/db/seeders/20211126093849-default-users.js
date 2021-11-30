'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', [
            { firstName: 'Demo', lastName: 'User', username: 'demouser', email: 'demo@gmail.com', hashedPassword: await bcrypt.hash('password', 10), imgUrl: 'testImgUrl', balance: 200.00 },
            { firstName: 'John', lastName: 'Doe', username: 'jdoe', email: 'jdoe@gmail.com', hashedPassword: await bcrypt.hash('password', 10), imgUrl: 'testImgUrl', balance: 150.00 },
            { firstName: 'Khalil', lastName: 'Gibran', username: 'kgibran', email: 'k.gibran@gmail.com', hashedPassword: await bcrypt.hash('password', 10), imgUrl: 'testImgUrl', balance: 9500.69 },
        ], {})
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
    }
};
