const db_service = require("../../../../utils/db/service");
const { parse_response } = require("../../../../utils/helper");
const { logger } = require("../../../../utils/logger");
const {
  success,
  failure,
  validation_faliure,
} = require("../../../../utils/response");
const {
  create_id_validator,
} = require("../../../../validators/shop/employees/create_id/create_id_validator");
const {
  check_shop_id,
  check_employee_id_against_shop,
  insert_employee_id,
} = require("./queries");

module.exports.create_id = async (req, res) => {
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
    const errors = await create_id_validator(inputs);
    if (Object.keys(errors).length > 0 && errors.constructor === Object) {
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

    // if employee id exist
    if (result.exist == 1) {
      return failure(
        400,
        "Invalid, employee_id already exist against the shop.",
        res
      );
    }

    // insert employee id in table
    await db_service.excute_statement(
      insert_employee_id(
        inputs.employee_id,
        inputs.password,
        inputs.shop_id,
        inputs.type
      )
    );

    // return success
    return success(200, "Employee id created successfully.", res);
  } catch (e) {
    logger.error("Error in shop employee create id ::: ", e);
    return failure(400, "Internal server error.", res);
  }
};
