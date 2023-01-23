const db_service = require("../../../utils/db/service");
const { generate_number, parse_response } = require("../../../utils/helper");
const { logger } = require("../../../utils/logger");
const {
  success,
  failure,
  validation_faliure,
} = require("../../../utils/response");
const {
  mobile_validator,
} = require("../../../validators/login/mobile/mobile_validator");
const { insert_otp, check_mobile_in_shop } = require("./queries");

module.exports.mobile = async (req, res) => {
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
    const errors = await mobile_validator(inputs);
    if (Object.keys(errors).length > 0 && errors.constructor === Object) {
      return validation_faliure(
        422,
        "The request should not contain invalid data.",
        errors,
        res
      );
    }

    // if mode is shop then check mobile number is new
    if (inputs.mode == "shop") {
      const result = parse_response(
        await db_service.excute_statement(check_mobile_in_shop(inputs.mobile))
      );

      // if result not found
      if (!result) {
        return failure(
          500,
          "Something went wrong, Please try again later.",
          res
        );
      }

      // if mobile number is new
      if (result.exist == 0) {
        return failure(
          400,
          "You are a new user. Please contact through administrator.",
          res
        );
      }
    }

    // generate otp
    const otp = "1234";
    // const otp = generate_number(4);

    // insert otp in table
    await db_service.excute_statement(insert_otp(inputs.mobile, otp));

    // return success
    return success(200, "OTP has been sent successfully.", res);
  } catch (e) {
    logger.error("Error in mobile ::: ", e);
    return failure(400, "Internal server error.", res);
  }
};
