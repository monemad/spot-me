'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', [
            { firstName: 'Demo', lastName: 'User', username: 'demouser', email: 'demo@gmail.com', hashedPassword: await bcrypt.hash('password', 10), imgUrl: 'images/default-profile-pic.png', balance: 200.00 },
            { firstName: 'John', lastName: 'Doe', username: 'jdoe', email: 'jdoe@gmail.com', hashedPassword: await bcrypt.hash('password', 10), imgUrl: 'images/default-profile-pic.png', balance: 150.00 },
            { firstName: 'Gary', lastName: 'Sue', username: 'gsue', email: 'gsue@gmail.com', hashedPassword: await bcrypt.hash('password', 10), imgUrl: 'images/default-profile-pic.png', balance: 150.00 },
            { firstName: 'Rebecca', lastName: 'Flowers', username: 'rflowers', email: 'rflowers@gmail.com', hashedPassword: await bcrypt.hash('password', 10), imgUrl: 'images/default-profile-pic.png', balance: 560.00 },
            { firstName: 'Inayat', lastName: 'Ahmad', username: 'iahmad', email: 'iahmad@gmail.com', hashedPassword: await bcrypt.hash('password', 10), imgUrl: 'images/default-profile-pic.png', balance: 234.00 },
            { firstName: 'Christian', lastName: 'Zhang', username: 'czhang', email: 'czhang@gmail.com', hashedPassword: await bcrypt.hash('password', 10), imgUrl: 'images/default-profile-pic.png', balance: 234.00 },
            { firstName: 'Riley', lastName: 'Adams', username: 'radams', email: 'radams@gmail.com', hashedPassword: await bcrypt.hash('password', 10), imgUrl: 'images/default-profile-pic.png', balance: 15044.00 },
            { firstName: 'Moiz', lastName: 'Ahmad', username: 'wizkika', email: 'therealwizkika@gmail.com', hashedPassword: await bcrypt.hash('password', 10), imgUrl: 'images/default-profile-pic.png', balance: 150345.00 },
            { firstName: 'Mayer', lastName: 'Hawthonre', username: 'mhawthorne', email: 'mhawthorne@gmail.com', hashedPassword: await bcrypt.hash('password', 10), imgUrl: 'images/default-profile-pic.png', balance: 1504432.00 },
            { firstName: 'Khalil', lastName: 'Gibran', username: 'kgibran', email: 'k.gibran@gmail.com', hashedPassword: await bcrypt.hash('password', 10), imgUrl: 'images/default-profile-pic.png', balance: 9500.69 },
        ], {})
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
    }
};
