const dbConfig = require("../../config/db");
const mysql = require("mysql");
const util = require("util");

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
