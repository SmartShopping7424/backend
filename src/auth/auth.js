const jwt = require("jsonwebtoken");
const config = require("../config/settings");
const { failure } = require("../utils/response");

/**
 * @description method to verify the jwt token
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns success or faliure
 */
module.exports.verifyToken = (req, res, next) => {
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
    return failure(401, "Invalid token.", res);
  }
  return next();
};
