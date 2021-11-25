interface DatabaseConfig {
    username: string,
    password: string,
    database: string,
    host: string
}

interface JWTConfig {
    secret: string,
    expiresIn: string | number
}

interface Configuration {
    db: DatabaseConfig,
    jwtConfig: JWTConfig
}

const config: Configuration = require('./index');

const db: DatabaseConfig = config.db;
const username: string = db.username;
const password: string = db.password;
const database: string = db.database;
const host: string = db.host;

module.exports = {
    development: {
        username,
        password,
        database,
        host,
        dialect: 'postgres',
        seederStorage: 'sequelize',
    },
    production: {
        use_env_variable: 'DATABASE_URL',
        dialect: 'postgres',
        seederStorage: 'sequelize',
        dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
        },
    },
};
