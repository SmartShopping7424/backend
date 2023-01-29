const db_service = require("../../../utils/db/service");
const { parse_response } = require("../../../utils/helper");
const { logger } = require("../../../utils/logger");
const {
  success,
  failure,
  validation_faliure,
} = require("../../../utils/response");
const {
  scan_item_validator,
} = require("../../../validators/customer/scan_item/scan_item_validator");
const {
  scan_item_transformer,
} = require("../../../transformers/customer/scan_item/scan_item_transformer");
const {
  check_shop_id_exist,
  get_shop_product_using_barcode,
} = require("./queries");

module.exports.scan_item = async (req, res) => {
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
    const errors = await scan_item_validator(inputs);
    if (Object.keys(errors).length > 0 && errors.constructor == Object) {
      return validation_faliure(
        422,
        "The request should not contain invalid data.",
        errors,
        res
      );
    }

    let result;

    // check if shop id exist
    result = parse_response(
      await db_service.excute_statement(check_shop_id_exist(inputs.shop_id))
    );

    // if result not found
    if (!result) {
      return failure(500, "Something went wrong, Please try again later.", res);
    }

    // if not exist
    if (result.exist == 0) {
      return failure(400, "Invalid shop id", res);
    }

    // get product using barcode
    result = parse_response(
      await db_service.excute_statement(
        get_shop_product_using_barcode(inputs.shop_id, inputs.product_barcode)
      )
    );

    // if result not found
    if (!result) {
      return failure(500, "Something went wrong, Please try again later.", res);
    }

    // if no data found
    if (Object.keys(result).length == 0) {
      return failure(400, "Invalid product barcode, No data found.", res);
    }

    // transform result
    const transformer = await scan_item_transformer(result);

    // return success
    return success(200, transformer, res);
  } catch (e) {
    logger.error("Error in customer scan item ::: ", e);
    return failure(400, "Internal server error.", res);
  }
};
