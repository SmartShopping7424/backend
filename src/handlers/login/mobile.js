const DBService = require("../../utils/DB/service");
const { parseResponse } = require("../../utils/helper");
const {
  success,
  failure,
  validation_faliure,
} = require("../../utils/response");
const { mobile_validator } = require("../../validators/login/mobile_validator");
const { check_mobile_in_shop, check_mobile_in_customer } = require("./queries");

module.exports.mobile = async (req, res) => {
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
  const errors = await mobile_validator(inputs);
  if (Object.keys(errors).length > 0 && errors.constructor === Object) {
    return validation_faliure(
      422,
      "The request should not contain invalid data.",
      errors,
      res
    );
  }

  // check number in database
  const result = parseResponse(
    await DBService.executeStatement(
      inputs.mode == "shop"
        ? check_mobile_in_shop(inputs.mobile)
        : check_mobile_in_customer(inputs.mobile)
    )
  );

  // if number does not exist
  if (result.exist == 0) {
    return failure(400, "Mobile number does not exist.", res);
  }

  // return success
  return success(200, "OTP has been sent successfully.", res);
};
