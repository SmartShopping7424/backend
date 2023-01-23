module.exports = {
  // check shop id
  check_shop_id(shop_id) {
    return `SELECT EXISTS (SELECT * FROM shops WHERE shop_id="${shop_id}") as exist;`;
  },

  // check employee id against shop
  check_employee_id_against_shop(employee_id, shop_id) {
    return `SELECT EXISTS (SELECT * FROM shop_employees WHERE employee_id="${employee_id}" AND shop_id="${shop_id}" AND type=0) as exist;`;
  },

  // fetch scanned product data
  fetch_scanned_product(shop_id, product_barcode) {
    return `SELECT * FROM ${shop_id} WHERE product_barcode="${product_barcode}" LIMIT 1;`;
  },

  // fetch product from products
  fetch_product_from_products(product_barcode) {
    return `SELECT * FROM products WHERE product_barcode="${product_barcode}" LIMIT 1;`;
  },
};
