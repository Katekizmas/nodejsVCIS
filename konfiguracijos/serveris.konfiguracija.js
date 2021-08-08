const { Pool } = require("pg");
require('dotenv/config');

const klientas = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    max: 20,
    connectionTimeoutMillis : 0,
    idleTimeoutMillis: 0
});

module.exports = klientas;