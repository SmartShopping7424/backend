const { success, failure } = require("../../utils/response");

module.exports.otp = async (req, res) => {
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

  // if mobile is not in payload
  if (!inputs.mobile) {
    return failure(400, "Mobile number is required in payload.", res);
  }

  // if mobile number is invalid
  if (inputs.mobile.length != 10) {
    return failure(400, "Invalid mobile number in payload.", res);
  }

  // if otp is invalid in payload
  if (!inputs.otp || inputs.otp == "") {
    return failure(400, "Invalid otp in payload.", res);
  }

  // return success if otp matched
  if (inputs.otp == "1234") {
    return success(200, "Login successfull.", res);
  }

  // return failure if otp is incorrect
  return failure(400, "Invalid otp.", res);
};
