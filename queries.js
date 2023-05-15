const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'moviesDatabase',
    password: '123456',
    port: 5432
})

module.exports = pool;