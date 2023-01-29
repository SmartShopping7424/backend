const db_service = require("../../../utils/db/service");
const { parse_response } = require("../../../utils/helper");
const { logger } = require("../../../utils/logger");
const {
  success,
  failure,
  validation_faliure,
} = require("../../../utils/response");
const {
  fetch_cart_validator,
} = require("../../../validators/customer/fetch_cart/fetch_cart_validator");
const {
  fetch_cart_transformer,
} = require("../../../transformers/customer/fetch_cart/fetch_cart_transformer");
const {
  check_customer_exists,
  check_shops_exists,
  fetch_customer_cart_data,
  delete_cart_data,
} = require("./queries");

module.exports.fetch_cart = async (req, res) => {
  try {
    // assign inputs
    const inputs = req.query;

    // if no attribute found
    if (Object.keys(inputs).length == 0) {
      return failure(
        400,
        "Invalid, Request should contain atleast one query params.",
        res
      );
    }

    // validate payload
    const errors = await fetch_cart_validator(inputs);
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

    // if customer not exist
    if (result.exist == 0) {
      return failure(400, "Invalid customer.", res);
    }

    //  if shop id not available
    if (inputs.shop_id == "") {
      // delete cart data against mobile
      await db_service.excute_statement(delete_cart_data(inputs.mobile));

      // update result
      result = {};
    }

    // if shop id available
    else {
      // check if shop exists
      result = parse_response(
        await db_service.excute_statement(check_shops_exists(inputs.shop_id))
      );

      // if result not found
      if (!result) {
        return failure(
          500,
          "Something went wrong, Please try again later.",
          res
        );
      }

      // if shop not exist
      if (result.exist == 0) {
        return failure(400, "Invalid shop id.", res);
      }

      // delete cart data against mobile and another shop
      await db_service.excute_statement(
        delete_cart_data(inputs.mobile, inputs.shop_id)
      );

      // fetch customer cart data
      result = parse_response(
        await db_service.excute_statement(fetch_customer_cart_data(inputs))
      );

      // if result not found
      if (!result) {
        return failure(
          500,
          "Something went wrong, Please try again later.",
          res
        );
      }
    }

    // transform the cart data
    const transformer = await fetch_cart_transformer(
      Object.keys(result).length == 0 ? [] : result
    );

    // return success
    return success(
      200,
      transformer.length == undefined ? [transformer] : transformer,
      res
    );
  } catch (e) {
    logger.error("Error in customer fetch cart ::: ", e);
    return failure(400, "Internal server error.", res);
  }
};
