const db_service = require("../../../utils/db/service");
const { parse_response } = require("../../../utils/helper");
const { logger } = require("../../../utils/logger");
const {
  success,
  failure,
  validation_faliure,
} = require("../../../utils/response");
const {
  fetch_data_validator,
} = require("../../../validators/customer/fetch_data/fetch_data_validator");
const {
  fetch_data_transformer,
} = require("../../../transformers/customer/fetch_data/fetch_data_transformer");
const { fetch_customer_data_from_table } = require("./queries");

module.exports.fetch_data = async (req, res) => {
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
    const errors = await fetch_data_validator(inputs);
    if (Object.keys(errors).length > 0 && errors.constructor === Object) {
      return validation_faliure(
        422,
        "The request should not contain invalid data.",
        errors,
        res
      );
    }

    // fetch customer details from customer table
    const result = parse_response(
      await db_service.excute_statement(
        fetch_customer_data_from_table(inputs.mobile)
      )
    );

    // if result not found
    if (!result) {
      return failure(500, "Something went wrong, Please try again later.", res);
    }

    // if no data found
    if (Object.keys(result).length == 0) {
      return failure(400, "Invalid mobile.", res);
    }

    // transform result
    const transformer = await fetch_data_transformer(result);

    // return success
    return success(200, transformer, res);
  } catch (e) {
    logger.error("Error in customer fetch data ::: ", e);
    return failure(400, "Internal server error.", res);
  }
};
