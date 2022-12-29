const DBService = require("../../../utils/DB/service");
const {
  success,
  failure,
  validation_faliure,
} = require("../../../utils/response");
const {
  update_data_validator,
} = require("../../../validators/customer/update_data/update_data_validator");
const { update_customer_data_in_table } = require("./queries");

module.exports.update_data = async (req, res) => {
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
  const errors = await update_data_validator(inputs);
  if (Object.keys(errors).length > 0 && errors.constructor === Object) {
    return validation_faliure(
      422,
      "The request should not contain invalid data.",
      errors,
      res
    );
  }

  // update customer details in customer table
  await DBService.executeStatement(update_customer_data_in_table(inputs));

  // return success
  return success(200, "Profile updated.", res);
};
