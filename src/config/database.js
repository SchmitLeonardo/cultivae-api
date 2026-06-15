require('./env');

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || process.env.MYSQLHOST || 'localhost',
    port: Number(process.env.DB_PORT || process.env.MYSQLPORT || 3306),
    user: process.env.DB_USER || process.env.MYSQLUSER || 'cultivae',
    password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || 'cultivae_password',
    database: process.env.DB_NAME || process.env.MYSQLDATABASE || 'cultivae_db',
    waitForConnections: true,
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
    queueLimit: 0,
});

module.exports = pool;
