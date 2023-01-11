const DBService = require("../../../../utils/DB/service");
const { parseResponse } = require("../../../../utils/helper");
const { logger } = require("../../../../utils/logger");
const {
  success,
  failure,
  validation_faliure,
} = require("../../../../utils/response");
const {
  add_product_validator,
} = require("../../../../validators/shop/employees/add_product/add_product_validator");
const {
  check_shop_id,
  check_employee_id_against_shop,
  insert_product_in_shop,
} = require("./queries");

module.exports.add_product = async (req, res) => {
  try {
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
    const errors = await add_product_validator(inputs);
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

    // if employee id does not exist
    if (result.exist == 0) {
      return failure(400, "Invalid employee id.", res);
    }

    // insert product into table
    await DBService.executeStatement(insert_product_in_shop(inputs));

    // return success
    return success(200, "Product added successfully.", res);
  } catch (e) {
    logger.error("Error in shop employee add product ::: ", e);
    return failure(400, "Internal server error.", res);
  }
};
