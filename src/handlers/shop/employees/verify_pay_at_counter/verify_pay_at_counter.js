const db_service = require("../../../../utils/db/service");
const { parse_response } = require("../../../../utils/helper");
const { logger } = require("../../../../utils/logger");
const {
  success,
  failure,
  validation_faliure,
} = require("../../../../utils/response");
const {
  verify_pay_at_counter_validator,
} = require("../../../../validators/shop/employees/verify_pay_at_counter.js/verify_pay_at_counter_validator");
const {
  check_shop_id,
  check_employee_id_against_shop,
  verify_pay_at_counter_from_table,
} = require("./queries");

module.exports.verify_pay_at_counter = async (req, res) => {
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
    const errors = await verify_pay_at_counter_validator(inputs);
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

    // check if employee id already exist against shop
    result = parse_response(
      await db_service.excute_statement(
        check_employee_id_against_shop(inputs.employee_id, inputs.shop_id)
      )
    );

    // if result not found
    if (!result) {
      return failure(500, "Something went wrong, Please try again later.", res);
    }

    // if employee id does not exist
    if (result.exist == 0) {
      return failure(400, "Invalid employee id.", res);
    }

    // verify pay at counter status
    await db_service.excute_statement(
      verify_pay_at_counter_from_table(
        inputs.employee_id,
        inputs.shop_id,
        inputs.payment_id
      )
    );

    // return success
    return success(200, "Payment successfully updated.", res);
  } catch (e) {
    logger.error("Error in shop employee verify pay at counter ::: ", e);
    return failure(400, "Internal server error.", res);
  }
};
