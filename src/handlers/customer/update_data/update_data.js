const db_service = require("../../../utils/db/service");
const { logger } = require("../../../utils/logger");
const {
  success,
  failure,
  validation_faliure,
} = require("../../../utils/response");
const {
  update_data_validator,
} = require("../../../validators/customer/update_data/update_data_validator");
const { update_customer_data_in_table } = require("./queries");

module.exports.update_data = async (req, res) => {
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
    const errors = await update_data_validator(inputs);
    if (Object.keys(errors).length > 0 && errors.constructor == Object) {
      return validation_faliure(
        422,
        "The request should not contain invalid data.",
        errors,
        res
      );
    }

    // update customer details in customer table
    await db_service.excute_statement(update_customer_data_in_table(inputs));

    // initilize response data
    const response = {
      name: inputs.name,
      email: inputs.email,
      gender: inputs.gender,
    };

    // return success
    return success(200, response, res);
  } catch (e) {
    logger.error("Error in customer update data ::: ", e);
    return failure(400, "Internal server error.", res);
  }
};
