const { get_formatted_date } = require("../../../utils/helper");

/**
 * @description method to transform the raw data into actual data
 * @param {*} raw_data
 * @returns actual data
 */
module.exports.fetch_pay_at_counter_transformer = async (raw_data) => {
  // if raw data is array
  if (Array.isArray(raw_data)) {
    let res = [];
    raw_data.map((data) => {
      let obj = transform_data(data);
      res.push(obj);
    });
    return res;
  }
  // if raw data is not array
  else {
    let obj = transform_data(raw_data);
    return obj;
  }
};

// transform the raw data
const transform_data = (raw) => {
  return {
    id: raw.hasOwnProperty("id") ? raw.id : null,
    payment_id: raw.hasOwnProperty("payment_id") ? raw.payment_id : null,
    shop_id: raw.hasOwnProperty("shop_id") ? raw.shop_id : null,
    customer_mobile: raw.hasOwnProperty("customer_mobile")
      ? raw.customer_mobile
      : null,
    customer_name: raw.hasOwnProperty("customer_name")
      ? raw.customer_name
      : null,
    amount: raw.hasOwnProperty("amount") ? raw.amount : null,
    created_at: raw.hasOwnProperty("created_at")
      ? get_formatted_date(raw.created_at, true)
      : null,
  };
};
