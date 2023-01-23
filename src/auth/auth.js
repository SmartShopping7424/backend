const jwt = require("jsonwebtoken");
const config = require("../config/settings");
const { failure } = require("../utils/response");
const { logger } = require("../utils/logger");

/**
 * @description method to verify the jwt token
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns success or faliure
 */
module.exports.verify_token = (req, res, next) => {
  try {
    // get the bearer token
    const bearer_token = req.headers["authorization"];

    // if bearer token not found
    if (typeof bearer_token == undefined) {
      return failure(403, "A token is required for authentication.", res);
    }

    // verify the bearer token
    try {
      const token = bearer_token.split(" ")[1];
      const decoded = jwt.verify(token, config.secret_key);
      req.user = decoded;
    } catch (err) {
      logger.error("Error in checking token validation ::: ", err);
      return failure(401, "Invalid token.", res);
    }
    return next();
  } catch (e) {
    logger.error("Error in verifying token ::: ", e);
    return failure(400, "Internal server error.", res);
  }
};
