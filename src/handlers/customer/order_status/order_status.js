const db_service = require("../../../utils/db/service");
const { parse_response } = require("../../../utils/helper");
const { logger } = require("../../../utils/logger");
const {
  order_status_validator,
} = require("../../../validators/customer/order_status/order_status_validator");
const { check_order_status } = require("./queries");

module.exports.order_status = async (req, res) => {
  try {
    // set response
    res.set({
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    // assign veified and inputs
    let verified = 0;
    const inputs = req.query;

    // if no attribute found
    if (Object.keys(inputs).length == 0) {
      verified = 2;
      res.write(JSON.stringify({ verified: verified }));
    }

    // validate payload
    const errors = await order_status_validator(inputs);
    if (Object.keys(errors).length > 0 && errors.constructor == Object) {
      verified = 2;
      res.write(JSON.stringify({ verified: verified }));
    }

    // send initial data
    res.write(JSON.stringify({ verified: verified }));

    // send updates every 3 seconds
    const interval_id = setInterval(async () => {
      // fetch order status
      const result = parse_response(
        await db_service.excute_statement(check_order_status(inputs.order_id))
      );

      // if result not found
      if (!result) {
        verified = 2;
        res.write(JSON.stringify({ verified: verified }));
      }

      // if order not exist
      if (Object.keys(result).length == 0) {
        verified = 2;
        res.write(JSON.stringify({ verified: verified }));
      }

      // if order has been verified
      if (result.verified == 1) {
        verified = 1;
      }

      res.write(JSON.stringify({ verified: verified }));
    }, 3000);

    // close the connection
    req.on("close", () => {
      clearInterval(interval_id);
    });
  } catch (e) {
    logger.error("Error in customer order status ::: ", e);
    verified = 2;
    res.write(JSON.stringify({ verified: verified }));
  }
};
