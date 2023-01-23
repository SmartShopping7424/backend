const db_service = require("../../../utils/db/service");
const { parse_response, generate_order_id } = require("../../../utils/helper");
const { logger } = require("../../../utils/logger");
const {
  success,
  failure,
  validation_faliure,
} = require("../../../utils/response");
const {
  create_order_validator,
} = require("../../../validators/customer/create_order/create_order_validator");
const {
  check_customer_exists,
  check_shop_id,
  clear_cart_data,
  insert_into_orders,
  insert_into_orders_details,
} = require("./queries");

module.exports.create_order = async (req, res) => {
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
    const errors = await create_order_validator(inputs);
    if (Object.keys(errors).length > 0 && errors.constructor === Object) {
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

    // if customer does not exist
    if (result.exist == 0) {
      return failure(400, "Invalid customer.", res);
    }

    // check shop id exists
    result = parse_response(
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

    // clear cart data of that shop
    await db_service.excute_statement(
      clear_cart_data(inputs.mobile, inputs.shop_id)
    );

    // generate order id
    var order_id = generate_order_id();

    // insert order into orders table
    await db_service.excute_statement(insert_into_orders(order_id, inputs));

    // insert order data into order details table
    for (let i = 0; i < inputs.orders.length; i++) {
      let e = inputs.orders[i];
      await db_service.excute_statement(
        insert_into_orders_details(
          order_id,
          e.product_barcode,
          e.product_quantity
        )
      );
    }

    // res data
    let res_data = {
      msg: "Order created successfully.",
      order_id: order_id,
    };

    // return success
    return success(200, res_data, res);
  } catch (e) {
    logger.error("Error in customer create order ::: ", e);
    return failure(400, "Internal server error.", res);
  }
};
