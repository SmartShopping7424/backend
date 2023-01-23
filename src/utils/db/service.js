const db_config = require("../../config/db");
const mysql = require("mysql");
const util = require("util");
const { logger } = require("../logger");

module.exports = {
  // execute mysql query
  async excute_statement(query_string) {
    const connection = mysql.createConnection(db_config);
    const query = util.promisify(connection.query).bind(connection);
    try {
      return await query(query_string);
    } catch (e) {
      logger.error("sql error ::: ", e);
      return null;
    } finally {
      connection.end();
    }
  },
};
