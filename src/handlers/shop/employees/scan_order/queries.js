module.exports = {
  // check shop id
  check_shop_id(shop_id) {
    return `SELECT EXISTS (SELECT * FROM shops WHERE shop_id="${shop_id}") as exist;`;
  },

  // check employee id against shop
  check_employee_id_against_shop(employee_id, shop_id) {
    return `SELECT EXISTS (SELECT * FROM shop_employees WHERE employee_id="${employee_id}" AND shop_id="${shop_id}" AND type=1) as exist;`;
  },

  // fetch order data
  fetch_order_data(order_id, shop_id) {
    return `SELECT * FROM orders WHERE order_id="${order_id}" AND shop_id="${shop_id}" AND verified=0 LIMIT 1;`;
  },

  // fetch order details
  fetch_order_details(order_id, shop_id) {
    return `SELECT * FROM order_details
                    INNER JOIN ${shop_id}
                        ON ${shop_id}.product_barcode=order_details.product_barcode
                    WHERE 
                        order_details.order_id="${order_id}";`;
  },
};
