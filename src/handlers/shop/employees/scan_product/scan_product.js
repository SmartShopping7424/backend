const db_service = require("../../../../utils/db/service");
const { parse_response } = require("../../../../utils/helper");
const { logger } = require("../../../../utils/logger");
const {
  success,
  failure,
  validation_faliure,
} = require("../../../../utils/response");
const {
  scan_product_validator,
} = require("../../../../validators/shop/employees/scan_product/scan_product_validator");
const {
  check_shop_id,
  check_employee_id_against_shop,
  fetch_scanned_product,
  fetch_product_from_products,
} = require("./queries");

module.exports.scan_product = async (req, res) => {
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
    const errors = await scan_product_validator(inputs);
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

    // fetch product from products
    result = parse_response(
      await db_service.excute_statement(
        fetch_product_from_products(inputs.barcode)
      )
    );

    // if result not found
    if (!result) {
      return failure(500, "Something went wrong, Please try again later.", res);
    }

    // define product
    var product = {};

    // if product found in the products
    if (Object.keys(result).length != 0) {
      product = result;
    }

    // fetch product
    result = parse_response(
      await db_service.excute_statement(
        fetch_scanned_product(inputs.shop_id, inputs.barcode)
      )
    );

    // if result not found
    if (!result) {
      return failure(500, "Something went wrong, Please try again later.", res);
    }

    // define res data
    var res_data = {};

    // if product found in the shop
    if (Object.keys(result).length != 0) {
      res_data = result;
    }

    // if product not found in the shop
    else {
      res_data = product;
    }

    // return success
    return success(200, res_data, res);
  } catch (e) {
    logger.error("Error in shop employee scan product ::: ", e);
    return failure(400, "Internal server error.", res);
  }
};
