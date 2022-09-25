const DBService = require("../../../../utils/DB/service");
const { parseResponse } = require("../../../../utils/helper");
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
} = require("./queries");

module.exports.scan_product = async (req, res) => {
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
  const errors = await scan_product_validator(inputs);
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

  // fetch product
  result = parseResponse(
    await DBService.executeStatement(
      fetch_scanned_product(inputs.shop_id, inputs.barcode)
    )
  );

  // if no result found
  if (!result) {
    return success(200, {}, res);
  }

  // return success
  return success(200, result, res);
};
