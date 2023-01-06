const DBService = require("../../../utils/DB/service");
const { parseResponse } = require("../../../utils/helper");
const {
  success,
  failure,
  validation_faliure,
} = require("../../../utils/response");
const {
  get_location_validator,
} = require("../../../validators/customer/get_location/get_location_validator");
const {
  get_location_transformer,
} = require("../../../transformers/customer/get_location/get_location_transformer");
const { fetch_shop_with_nearest_lat_lng } = require("./queries");

module.exports.get_location = async (req, res) => {
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
  const errors = await get_location_validator(inputs);
  if (Object.keys(errors).length > 0 && errors.constructor === Object) {
    return validation_faliure(
      422,
      "The request should not contain invalid data.",
      errors,
      res
    );
  }

  // fetch shop with nearest lat and lng
  const result = parseResponse(
    await DBService.executeStatement(
      fetch_shop_with_nearest_lat_lng(inputs.latitude, inputs.longitude)
    )
  );

  // transform result
  const transformer = await get_location_transformer(result);

  // return success
  return success(
    200,
    transformer.length == undefined ? [transformer] : transformer,
    res
  );
};
