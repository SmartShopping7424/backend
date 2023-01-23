const db_service = require("../../../utils/db/service");
const jwt = require("jsonwebtoken");
const config = require("../../../config/settings");
const { parse_response } = require("../../../utils/helper");
const { logger } = require("../../../utils/logger");
const {
  success,
  failure,
  validation_faliure,
} = require("../../../utils/response");
const {
  otp_validator,
} = require("../../../validators/login/otp/otp_validator");
const { fetch_otp, insert_user_in_customer } = require("./queries");

module.exports.otp = async (req, res) => {
  try {
    // assign inputs
    const inputs = req.body;

    // if no attribute found
    if (Object.keys(inputs).length == 0) {
      return failure(
        400,
        "Invalid payload, Request should contain atleast one attribute.",
        res
      );
    }

    // validate payload
    const errors = await otp_validator(inputs);
    if (Object.keys(errors).length > 0 && errors.constructor === Object) {
      return validation_faliure(
        422,
        "The request should not contain invalid data.",
        errors,
        res
      );
    }

    // fetch otp from database
    const result = parse_response(
      await db_service.excute_statement(fetch_otp(inputs.mobile))
    );

    // if no result found return faliure
    if (!result) {
      return failure(400, "Invalid request.", res);
    }

    // if otp does not match return faliure
    if (result.otp != inputs.otp) {
      return failure(400, "Invalid otp.", res);
    }

    // if mode is customer then insert user in customer
    if (inputs.mode == "customer") {
      await db_service.excute_statement(insert_user_in_customer(inputs.mobile));
    }

    // if otp matches then generate the jwt token
    jwt.sign(
      inputs,
      config.secret_key,
      { expiresIn: config.key_expiry },
      (err, token) => {
        if (err) {
          logger.error("Error while jwt sign in otp ::: ", err);
          return failure(400, "Internal server error, Try again later.", res);
        } else {
          const response = {
            message: "Login successful.",
            token: token,
          };
          return success(200, response, res);
        }
      }
    );
  } catch (e) {
    logger.error("Error in otp ::: ", e);
    return failure(400, "Internal server error.", res);
  }
};
