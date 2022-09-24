const DBService = require("../../../../utils/DB/service");
const { parseResponse } = require("../../../../utils/helper");
const {
  success,
  failure,
  validation_faliure,
} = require("../../../../utils/response");
const {
  login_validator,
} = require("../../../../validators/shop/employees/login/login_validator");
const {
  check_shop_id,
  check_employee_id_against_shop,
  check_password_match,
} = require("./queries");

module.exports.login = async (req, res) => {
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
  const errors = await login_validator(inputs);
  if (Object.keys(errors).length > 0 && errors.constructor === Object) {
    return validation_faliure(
      422,
      "The request should not contain invalid data.",
      errors,
      res
    );
  }

  // check shop id exists
  let result = parseResponse(
    await DBService.executeStatement(check_shop_id(inputs.shop_id))
  );

  // if shop id does not exist
  if (result.exist == 0) {
    return failure(400, "Invalid shop id.", res);
  }

  // check if employee id already exist against shop
  result = parseResponse(
    await DBService.executeStatement(
      check_employee_id_against_shop(inputs.employee_id, inputs.shop_id)
    )
  );

  // if employee id does not exist against shop
  if (result.exist == 0) {
    return failure(
      400,
      "Invalid, employee_id does not exist against the shop.",
      res
    );
  }

  // check if password and type matches
  result = parseResponse(
    await DBService.executeStatement(
      check_password_match(
        inputs.employee_id,
        inputs.password,
        inputs.shop_id,
        inputs.type
      )
    )
  );

  // if password does not match
  if (result.exist == 0) {
    return failure(400, "Invalid password.", res);
  }

  // return success
  return success(200, "Login successful.", res);
};
