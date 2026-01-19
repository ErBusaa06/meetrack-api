require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost', user: 'root', password: '', database: 'meettrack'
});
module.exports = pool;