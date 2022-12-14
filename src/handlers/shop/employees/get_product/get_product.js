const DBService = require("../../../../utils/DB/service");
const { parseResponse } = require("../../../../utils/helper");
const { logger } = require("../../../../utils/logger");
const {
  success,
  failure,
  validation_faliure,
} = require("../../../../utils/response");
const {
  get_product_validator,
} = require("../../../../validators/shop/employees/get_product/get_product_validator");
const {
  check_shop_id,
  check_employee_id_against_shop,
  fetch_product,
} = require("./queries");
const config = require("../../../../config/settings");

module.exports.get_product = async (req, res) => {
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
    const errors = await get_product_validator(inputs);
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
    result = parseResponse(
      await DBService.executeStatement(
        fetch_product(inputs.shop_id, limit, offset)
      )
    );

    // pagination data
    const meta = {
      pagination: {
        current_page: parseInt(page),
        count: result.length
          ? result.length
          : Object.getOwnPropertyNames(result).length == 0
          ? 0
          : 1,
        starts_from: initial_page,
        per_page: parseInt(limit),
      },
    };

    // return success
    return success(200, result, res, meta);
  } catch (e) {
    logger.error("Error in shop employee get product ::: ", e);
    return failure(400, "Internal server error.", res);
  }
};
