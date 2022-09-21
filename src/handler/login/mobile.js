const DBService = require("../../utils/DB/service");
const { parseResponse } = require("../../utils/helper");
const { success, failure } = require("../../utils/response");
const { check_mobile_in_shop, check_mobile_in_customer } = require("./queries");

module.exports.mobile = async (req, res) => {
  // assign inputs
  const inputs = req.body;

  // if no attribute found
  if (Object.getOwnPropertyNames(inputs).length == 0) {
    return failure(
      400,
      "Invalid payload, Request should contain atleaast one attribute.",
      res
    );
  }

  // if mode is invalid in payload
  if (!inputs.mode || !(inputs.mode == "shop" || inputs.mode == "customer")) {
    return failure(400, "Invalid mode in payload.", res);
  }

  // if mobile is invalid in payload
  if (inputs.mobile.length != 10) {
    return failure(400, "Invalid mobile number in payload.", res);
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
