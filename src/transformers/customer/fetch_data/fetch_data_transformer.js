/**
 * @description method to transform the raw data into actual data
 * @param {*} raw_data
 * @returns actual data
 */
module.exports.fetch_data_transformer = async (raw_data) => {
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
    mobile: raw.hasOwnProperty("mobile") ? raw.mobile : null,
    name: raw.hasOwnProperty("name") ? raw.name : null,
    email: raw.hasOwnProperty("email") ? raw.email : null,
    gender: raw.hasOwnProperty("gender") ? raw.gender : null,
  };
};
