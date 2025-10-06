const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'sgcpd_db',
    password: 'postgres',
    port: 5435,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};