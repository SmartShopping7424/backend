const DBService = require("../../../utils/DB/service");
const { parseResponse } = require("../../../utils/helper");
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
  const errors = await scan_item_validator(inputs);
  if (Object.keys(errors).length > 0 && errors.constructor === Object) {
    return validation_faliure(
      422,
      "The request should not contain invalid data.",
      errors,
      res
    );
  }

  let result;

  // check if shop id exist
  result = parseResponse(
    await DBService.executeStatement(check_shop_id_exist(inputs.shop_id))
  );

  // if not exist
  if (result.exist == 0) {
    return failure(400, "Invalid shop id", res);
  }

  // get product using barcode
  result = parseResponse(
    await DBService.executeStatement(
      get_shop_product_using_barcode(inputs.shop_id, inputs.product_barcode)
    )
  );

  // if no data found
  if (Object.getOwnPropertyNames(result).length == 0) {
    return failure(400, "Invalid product barcode, No data found.", res);
  }

  // transform result
  const transformer = await scan_item_transformer(result);

  // return success
  return success(200, transformer, res);
};
