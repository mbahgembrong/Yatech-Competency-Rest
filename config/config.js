module.exports = {
    development: {
        username: 'postgres',
        password: null,
        database: 'db_yatech_inventory',
        host: '127.0.0.1',
        dialect: 'postgres',
    },
    production: {
        use_env_variable: 'DATABASE_URL',
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: { 
                require: true,
                rejectUnauthorized: false,
            },
        },
    },
};