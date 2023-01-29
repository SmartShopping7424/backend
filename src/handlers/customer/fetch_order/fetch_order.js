const db_service = require("../../../utils/db/service");
const { parse_response } = require("../../../utils/helper");
const { logger } = require("../../../utils/logger");
const {
  success,
  failure,
  validation_faliure,
} = require("../../../utils/response");
const {
  fetch_order_validator,
} = require("../../../validators/customer/fetch_order/fetch_order_validator");
const {
  fetch_order_transformer,
} = require("../../../transformers/customer/fetch_order/fetch_order_transformer");
const { check_customer_exists, fetch_customer_orders } = require("./queries");
const config = require("../../../config/settings");

module.exports.fetch_order = async (req, res) => {
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
    const errors = await fetch_order_validator(inputs);
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

    // intilize page and page size
    let initial_page = 1;
    let page_size = config.page_size;
    let page = initial_page;

    // fetch page from query parameter
    if (req.query) {
      if (req.query.page) {
        page = req.query.page;
      }
    }

    // calculate limit and offset for pagination
    const limit = page_size;
    const offset = page_size * page - page_size;

    // fetch customer order
    result = parse_response(
      await db_service.excute_statement(
        fetch_customer_orders(inputs.mobile, limit, offset)
      )
    );

    // transform the order data
    const transformer = await fetch_order_transformer(
      Object.keys(result).length == 0 ? [] : result
    );

    // return success
    return success(
      200,
      transformer.length == undefined ? [transformer] : transformer,
      res
    );
  } catch (e) {
    logger.error("Error in customer fetch order ::: ", e);
    return failure(400, "Internal server error.", res);
  }
};
