const db_service = require("../../../../utils/db/service");
const jwt = require("jsonwebtoken");
const config = require("../../../../config/settings");
const { parse_response } = require("../../../../utils/helper");
const { logger } = require("../../../../utils/logger");
const {
  success,
  failure,
  validation_faliure,
} = require("../../../../utils/response");
const {
  login_validator,
} = require("../../../../validators/shop/employees/login/login_validator");
const { check_shop_id, fetch_employee_data } = require("./queries");

module.exports.login = async (req, res) => {
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
    const errors = await login_validator(inputs);
    if (Object.keys(errors).length > 0 && errors.constructor == Object) {
      return validation_faliure(
        422,
        "The request should not contain invalid data.",
        errors,
        res
      );
    }

    // check shop id exists
    let result = parse_response(
      await db_service.excute_statement(check_shop_id(inputs.shop_id))
    );

    // if result not found
    if (!result) {
      return failure(500, "Something went wrong, Please try again later.", res);
    }

    // if shop id does not exist
    if (result.exist == 0) {
      return failure(400, "Invalid shop id.", res);
    }

    // fetch employee data against shop
    result = parse_response(
      await db_service.excute_statement(
        fetch_employee_data(inputs.employee_id, inputs.shop_id)
      )
    );

    // if employee id does not exist against shop
    if (!result) {
      return failure(
        400,
        "Invalid, employee_id does not exist against the shop.",
        res
      );
    }

    // if employee type not match
    if (result.type != inputs.type) {
      return failure(400, "Invalid type.", res);
    }

    // if employee password not match
    if (result.password != inputs.password) {
      return failure(400, "Invalid password.", res);
    }

    // if all matches then generate the jwt token
    jwt.sign(
      inputs,
      config.secret_key,
      { expiresIn: config.key_expiry },
      (err, token) => {
        if (err) {
          logger.error("Error while jwt sign in shop employee login ::: ", err);
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
    logger.error("Error in shop employee login ::: ", e);
    return failure(400, "Internal server error.", res);
  }
};
