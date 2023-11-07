module.exports = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: '5432',
        user: 'postgres',
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE
    }
})