module.exports = {
    development: {
        username: '<YOUR_USER_NAME>',
        password: null,
        database: '<YOUR_APP_NAME>_development',
        host: '127.0.0.1',
        dialect: 'postgres',
    },
    production: {
        use_env_variable: 'postgres://mlixedietgeimr:b72e05a0d875c8e1452010b7ed259e4019b0d82df9049c46f5880f39000649ba@ec2-54-87-179-4.compute-1.amazonaws.com:5432/dbh48enfqcc0b7',
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