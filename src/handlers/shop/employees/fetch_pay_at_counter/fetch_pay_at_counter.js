const db_service = require("../../../../utils/db/service");
const { parse_response } = require("../../../../utils/helper");
const { logger } = require("../../../../utils/logger");
const {
  success,
  failure,
  validation_faliure,
} = require("../../../../utils/response");
const {
  fetch_pay_at_counter_validator,
} = require("../../../../validators/shop/employees/fetch_pay_at_counter/fetch_pay_at_counter_validator");
const {
  check_shop_id,
  check_employee_id_against_shop,
  fetch_pay_at_counter_from_table,
} = require("./queries");
const config = require("../../../../config/settings");
const {
  fetch_pay_at_counter_transformer,
} = require("../../../../transformers/shop/fetch_pay_at_counter/fetch_pay_at_counter_transformer");

module.exports.fetch_pay_at_counter = async (req, res) => {
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
    const errors = await fetch_pay_at_counter_validator(inputs);
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

    // fetch product
    result = parse_response(
      await db_service.excute_statement(
        fetch_pay_at_counter_from_table(inputs.shop_id, limit, offset)
      )
    );

    // if result not found
    if (!result) {
      return failure(500, "Something went wrong, Please try again later.", res);
    }

    // transform the product data
    const transformer = await fetch_pay_at_counter_transformer(
      Object.keys(result).length == 0 ? [] : result
    );

    // pagination data
    const meta = {
      pagination: {
        current_page: parseInt(page),
        count: transformer.length,
        starts_from: initial_page,
        per_page: parseInt(limit),
      },
    };

    // return success
    return success(
      200,
      transformer.length == undefined ? [transformer] : transformer,
      res,
      meta
    );
  } catch (e) {
    logger.error("Error in shop employee fetch pay at counter ::: ", e);
    return failure(400, "Internal server error.", res);
  }
};
