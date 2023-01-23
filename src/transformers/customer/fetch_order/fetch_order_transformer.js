const { get_formatted_date } = require("../../../utils/helper");

/**
 * @description method to transform the raw data into actual data
 * @param {*} raw_data
 * @returns actual data
 */
module.exports.fetch_order_transformer = async (raw_data) => {
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
    order_id: raw.hasOwnProperty("order_id") ? raw.order_id : null,
    total_item: raw.hasOwnProperty("total_item") ? raw.total_item : null,
    total_amount: raw.hasOwnProperty("total_amount") ? raw.total_amount : null,
    created_at: raw.hasOwnProperty("created_at")
      ? get_formatted_date(raw.created_at)
      : null,
  };
};
