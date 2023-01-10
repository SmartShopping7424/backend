const DBService = require("../../../utils/DB/service");
const jwt = require("jsonwebtoken");
const config = require("../../../config/settings");
const { parseResponse, storeLogs } = require("../../../utils/helper");
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
  // assign inputs
  const inputs = req.body;

  // if no attribute found
  if (Object.getOwnPropertyNames(inputs).length == 0) {
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
  const result = parseResponse(
    await DBService.executeStatement(fetch_otp(inputs.mobile))
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
    await DBService.executeStatement(insert_user_in_customer(inputs.mobile));
  }

  // if otp matches then generate the jwt token
  jwt.sign(
    inputs,
    config.secret_key,
    { expiresIn: config.key_expiry },
    (err, token) => {
      if (err) {
        storeLogs(0, `Error while jwt sign ::: ${err}`);
        return failure(400, "Internal server error, Try again later.", res);
      } else {
        storeLogs(1, "Successful Login.");
        const response = {
          message: "Login successful.",
          token: token,
        };
        return success(200, response, res);
      }
    }
  );
};
