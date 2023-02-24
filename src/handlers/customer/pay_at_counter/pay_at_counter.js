const db_service = require("../../../utils/db/service");
const {
  parse_response,
  generate_payment_id,
} = require("../../../utils/helper");
const { logger } = require("../../../utils/logger");
const {
  success,
  failure,
  validation_faliure,
} = require("../../../utils/response");
const {
  pay_at_counter_validator,
} = require("../../../validators/customer/pay_at_counter/pay_at_counter_validator");
const {
  check_shops_exists,
  check_customer_exists,
  insert_into_pay_at_counter,
} = require("./queries");

module.exports.pay_at_counter = async (req, res) => {
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
    const errors = await pay_at_counter_validator(inputs);
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
      await db_service.excute_statement(check_shops_exists(inputs.shop_id))
    );

    // if result not found
    if (!result) {
      return failure(500, "Something went wrong, Please try again later.", res);
    }

    // if not exist
    if (result.exist == 0) {
      return failure(400, "Invalid shop id", res);
    }

    // check if customer exist
    result = parse_response(
      await db_service.excute_statement(check_customer_exists(inputs.mobile))
    );

    // if result not found
    if (!result) {
      return failure(500, "Something went wrong, Please try again later.", res);
    }

    // if not exist
    if (result.exist == 0) {
      return failure(400, "Invalid mobile", res);
    }

    // generate payment id
    var payment_id = generate_payment_id();

    // insert into pay at counter
    await db_service.excute_statement(
      insert_into_pay_at_counter(payment_id, inputs)
    );

    // transform result
    const response = {
      payment_id: payment_id,
      msg: "Payment has been created successfully.",
    };

    // return success
    return success(200, response, res);
  } catch (e) {
    logger.error("Error in customer pay at counter ::: ", e);
    return failure(400, "Internal server error.", res);
  }
};
