/**
 * @description method to transform the raw data into actual data
 * @param {*} raw_data
 * @returns actual data
 */
module.exports.get_location_transformer = async (raw_data) => {
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
    shop_id: raw.hasOwnProperty("shop_id") ? raw.shop_id : null,
    shop_name: raw.hasOwnProperty("shop_name") ? raw.shop_name : null,
    shop_latitude: raw.hasOwnProperty("shop_latitude")
      ? raw.shop_latitude
      : null,
    shop_longitude: raw.hasOwnProperty("shop_longitude")
      ? raw.shop_longitude
      : null,
    distance: raw.hasOwnProperty("distance") ? raw.distance : null,
  };
};
