require('dotenv').config();

const mysql = require('mysql2/promise');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB } = process.env;

let pool;

const getConnection = async () => {
  try {
    if(!pool) {
      pool = mysql.createPool({
        connectionLimit: 10,
        host:MYSQL_HOST,
        user:MYSQL_USER,
        password:MYSQL_PASSWORD,
        database:MYSQL_DB,
        timezone: 'Z'
      });
    }
    return await pool.getConnection();
  } catch (error) {
    throw new Error(
      'Error creating connection or database not found'
    );
  }
};

module.exports = {
  getConnection,
}