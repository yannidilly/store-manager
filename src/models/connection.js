const mysql = require('mysql2/promise');

const connection = mysql.createPoll({
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 3060,
  user: 'root',
  password: 'password',
  database: 'store_manager_db',
});

module.exports = connection;