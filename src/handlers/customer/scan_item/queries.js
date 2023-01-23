module.exports = {
  // check if shop id exists
  check_shop_id_exist(shop_id) {
    return `SELECT EXISTS (SELECT * FROM shops WHERE shop_id='${shop_id}') as exist;`;
  },

  // get shop product using barcode
  get_shop_product_using_barcode(shop_id, product_barcode) {
    return `SELECT * FROM ${shop_id} WHERE product_barcode='${product_barcode}';`;
  },
};
