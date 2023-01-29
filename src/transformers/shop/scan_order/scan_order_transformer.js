/**
 * @description method to transform the raw data into actual data
 * @param {*} raw_data
 * @returns actual data
 */
module.exports.scan_order_transformer = async (raw_data) => {
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
    product_barcode: raw.hasOwnProperty("product_barcode")
      ? raw.product_barcode
      : null,
    product_name: raw.hasOwnProperty("product_name") ? raw.product_name : null,
    product_category: raw.hasOwnProperty("product_category")
      ? raw.product_category
      : null,
    product_sub_category: raw.hasOwnProperty("product_sub_category")
      ? raw.product_sub_category
      : null,
    product_mrp: raw.hasOwnProperty("product_mrp") ? raw.product_mrp : null,
    product_selling_price: raw.hasOwnProperty("product_selling_price")
      ? raw.product_selling_price
      : null,
    product_image: raw.hasOwnProperty("product_image")
      ? raw.product_image
      : null,
    product_offer: raw.hasOwnProperty("product_offer")
      ? raw.product_offer
      : null,
    product_offer_type: raw.hasOwnProperty("product_offer_type")
      ? raw.product_offer_type
      : null,
    product_discount: raw.hasOwnProperty("product_discount")
      ? raw.product_discount
      : null,
    product_pack_count: raw.hasOwnProperty("product_pack_count")
      ? raw.product_pack_count
      : null,
    product_pack_price: raw.hasOwnProperty("product_pack_price")
      ? raw.product_pack_price
      : null,
    product_quantity: raw.hasOwnProperty("product_quantity")
      ? raw.product_quantity
      : null,
  };
};
