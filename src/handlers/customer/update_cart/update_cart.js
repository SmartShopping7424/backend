const db_service = require("../../../utils/db/service");
const { parse_response } = require("../../../utils/helper");
const { logger } = require("../../../utils/logger");
const {
  success,
  failure,
  validation_faliure,
} = require("../../../utils/response");
const {
  update_cart_validator,
} = require("../../../validators/customer/update_cart/update_cart_validator");
const {
  check_customer_exists,
  check_product_exists_in_shop,
  update_customer_cart_data,
} = require("./queries");

module.exports.update_cart = async (req, res) => {
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
    const errors = await update_cart_validator(inputs);
    if (Object.keys(errors).length > 0 && errors.constructor == Object) {
      return validation_faliure(
        422,
        "The request should not contain invalid data.",
        errors,
        res
      );
    }

    // check if customer exists
    let result = parse_response(
      await db_service.excute_statement(check_customer_exists(inputs.mobile))
    );

    // if result not found
    if (!result) {
      return failure(500, "Something went wrong, Please try again later.", res);
    }

    // if customer does not exist
    if (result.exist == 0) {
      return failure(400, "Invalid customer.", res);
    }

    // check if product exists in the shop
    result = parse_response(
      await db_service.excute_statement(
        check_product_exists_in_shop(inputs.shop_id, inputs.product_barcode)
      )
    );

    // if result not found
    if (!result) {
      return failure(500, "Something went wrong, Please try again later.", res);
    }

    // if product does not exist
    if (result.exist == 0) {
      return failure(400, "Invalid product barcode.", res);
    }

    // update cart data
    await db_service.excute_statement(update_customer_cart_data(inputs));

    // return success
    return success(200, "Cart updated.", res);
  } catch (e) {
    logger.error("Error in customer update cart ::: ", e);
    return failure(400, "Internal server error.", res);
  }
};
