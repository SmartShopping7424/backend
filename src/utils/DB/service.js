const mysql = require("mysql");
const util = require("util");

// database credentials
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  port: process.env.DB_PORT,
};

module.exports = {
  // execute mysql query
  async executeStatement(query_string) {
    const connection = mysql.createConnection(dbConfig);
    const query = util.promisify(connection.query).bind(connection);
    try {
      return await query(query_string);
    } catch (e) {
      console.log("SQL Error ====> ", e);
    } finally {
      connection.end();
    }
  },
};
