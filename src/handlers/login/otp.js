const {
  success,
  failure,
  validation_faliure,
} = require("../../utils/response");
const { otp_validator } = require("../../validators/login/otp_validator");

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

  // return failure if otp is incorrect
  if (inputs.otp != "1234") {
    return failure(400, "Invalid otp.", res);
  }

  // return success if otp matched
  return success(200, "Login successful.", res);
};
