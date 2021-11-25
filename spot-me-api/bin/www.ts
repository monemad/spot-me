#!/usr/bin/env node
const { port } = require('../config');
// import { port } from '../config'

// const app = require('../app');
import app from '../app';
// const db = require('../db/models');
import db from '../db/models';

// Check the database connection before starting the app
db.sequelize
    .authenticate()
    .then(() => {
    console.log('Database connection success! Sequelize is ready to use...');

    // Start listening for connections
    app.listen(port, () => console.log(`Listening on port ${port}...`));
    })
    .catch((err) => {
    console.log('Database connection failure.');
    console.error(err);
    });
