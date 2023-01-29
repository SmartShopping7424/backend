const db_service = require("../../../../utils/db/service");
const { parse_response } = require("../../../../utils/helper");
const { logger } = require("../../../../utils/logger");
const {
  success,
  failure,
  validation_faliure,
} = require("../../../../utils/response");
const {
  scan_order_validator,
} = require("../../../../validators/shop/employees/scan_order/scan_order_validator");
const {
  check_shop_id,
  check_employee_id_against_shop,
  fetch_order_data,
  fetch_order_details,
} = require("./queries");
const {
  scan_order_transformer,
} = require("../../../../transformers/shop/scan_order/scan_order_transformer");

module.exports.scan_order = async (req, res) => {
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
    const errors = await scan_order_validator(inputs);
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

    // fetch order from orders
    result = parse_response(
      await db_service.excute_statement(
        fetch_order_data(inputs.order_id, inputs.shop_id)
      )
    );

    // if result not found
    if (!result) {
      return failure(500, "Something went wrong, Please try again later.", res);
    }

    // if order not available
    if (Object.keys(result).length == 0) {
      return failure(
        400,
        "Either order has been verified or not available.",
        res
      );
    }

    // fetch order details
    result = parse_response(
      await db_service.excute_statement(
        fetch_order_details(inputs.order_id, inputs.shop_id)
      )
    );

    // transform the cart data
    const transformer = await scan_order_transformer(
      Object.keys(result).length == 0 ? [] : result
    );

    // return success
    return success(
      200,
      transformer.length == undefined ? [transformer] : transformer,
      res
    );
  } catch (e) {
    logger.error("Error in shop employee scan order ::: ", e);
    return failure(400, "Internal server error.", res);
  }
};
