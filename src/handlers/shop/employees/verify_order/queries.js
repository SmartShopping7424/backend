module.exports = {
  // check shop id
  check_shop_id(shop_id) {
    return `SELECT EXISTS (SELECT * FROM shops WHERE shop_id="${shop_id}") as exist;`;
  },

  // check employee id against shop
  check_employee_id_against_shop(employee_id, shop_id) {
    return `SELECT EXISTS (SELECT * FROM shop_employees WHERE employee_id="${employee_id}" AND shop_id="${shop_id}" AND type=1) as exist;`;
  },

  // verify order data
  verify_order_data(order_id, shop_id, employee_id) {
    return `UPDATE orders 
                SET
                    verified=1,
                    verified_by="${employee_id}"
                WHERE 
                    order_id="${order_id}" 
                AND 
                    shop_id="${shop_id}";`;
  },
};
